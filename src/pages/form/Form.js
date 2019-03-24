import React, { Component } from 'react';
import './Form.css';
import { MDBContainer, MDBRow, MDBCol, MDBModal,MDBModalBody, MDBModalHeader, MDBModalFooter } from "mdbreact";
import OmniInput from '../../components/omni-input/OmniInput';
import * as Constant from '../../common/constants';
import options from '../../mocks/optionMock';
import conversation from '../../mocks/conversationTree';
import UploadFile from '../../components/upload/UploadFile';
import formInfo from '../../mocks/form';
class Form extends Component {

    constructor(props) {
        super(props);
        this.state = {
            formcategory:[],
            liveForm:{},
            selectedFormCategory:0,
            lastConversationIndex: 0,
            conversationTree: conversation,
            conversationDOM: [],
            processedForm: {},
            currentOption: {},
            currentInputExpects: Constant.CONVERSATION_TYPE.OPTION,
            modal:false

        }
        this.conversationDomElm = [];
        // THis is some comment
    }

    componentWillMount(){
        console.log(formInfo);
        this.setState({
            formcategory:formInfo.formCategory,
            liveForm:formInfo.formDetails
        })
    }

    toggleModal = async () => {
        await this.setState({
          modal: !this.state.modal
        });
      }
    scrollToBottom = () => {
        if (this.messagesEnd) {
            this.messagesEnd.scrollTop = this.messagesEnd.scrollHeight;
        }
    }
    onUploadFileComplete =(imageElm) =>{
        console.log('UPLOAD RETURN');
        this.registerUserConversationElm(imageElm);
        this.toggleModal();
        setTimeout(() => {
            this.triggerConversation();
        }, 2000);
       

    }
    componentDidMount() {
        this.initBotConversation();
        this.scrollToBottom();
    }

    componentDidUpdate() {
        this.scrollToBottom();
    }


    initBotConversation() {
        
        this.triggerConversation()
    }

    triggerConversation = async () => {
        let conversationObject = this.state.conversationTree[this.state.lastConversationIndex];
        //console.log(conversationObject);
        try{
            if (conversationObject !== undefined) {
                while (conversationObject.type !== 'CHOICE') {
                    let conversationElm = <BotConversationElm item={conversationObject} type={Constant.CONVERSATION_TYPE.BOT} key={conversationObject.id} />
                    this.registerConversationElm(conversationElm);
                    let nextConversationId = this.state.lastConversationIndex + 1
                    await this.setState({
                        lastConversationIndex: nextConversationId
                    });
                    conversationObject = this.state.conversationTree[nextConversationId];
                }
                //Encountered a choice decision
                if (conversationObject.type === 'CHOICE') {
                    let conversationElm = <BotConversationElm item={conversationObject} type={Constant.CONVERSATION_TYPE.BOT} key={conversationObject.id} />
                    this.registerConversationElm(conversationElm);
                    let currentOption = options.find(o => o.id == conversationObject.option);
                    let nextConversationId = this.state.lastConversationIndex + 1;
                    await this.setState({
                        currentOption: currentOption,
                        lastConversationIndex: nextConversationId
                    });
                    //this.forceUpdate()
                }
            } else {
                //End Conversation
            }
    
        }
        catch(e){

        }
       
    }

    handleUserResponse(conversation) {
        //console.log(conversation);
        this.setState({
            currentOption: {}
        })
        let conversationElm = <ConversationItem item={conversation} type={Constant.CONVERSATION_TYPE.TEXT} key={conversation.data.value.text} />
        this.registerUserConversationElm(conversationElm);
        if(conversation.data.value.value==='FLASH_FILL_UPLOAD'){
            this.toggleModal();
        }
        else{
            setTimeout(() => {
                this.triggerConversation();
            }, 2000);
        }

    }

    registerConversationElm = async (elm) => {
        this.conversationDomElm.push(elm)
        await this.setState({
            conversationDOM: this.conversationDomElm
        });
    }

    registerUserConversationElm(elm) {
        this.conversationDomElm.push(elm);
        this.setState({
            conversationDOM: this.conversationDomElm
        });
    }

    render() {
        let currentStateId = this.state.formcategory[this.state.selectedFormCategory].id;
        let currentFormItem = this.state.liveForm.filter(x=>x.cat===currentStateId);
        return (
            <MDBContainer fluid className="form-container">
                <MDBRow className="form-sections-container">
                    <FormSection item={this.state.formcategory}/>
                </MDBRow>
                <MDBRow className="form-conversation-container">
                    <MDBCol md="3" sm="12" xs="12" className="live-form-container">
                       <LiveFormContainer
                        item={currentFormItem}
                        />
                    </MDBCol>
                    <MDBCol md="9" sm="12" className="conversation-container no-margin">
                        <div className="conversation-area no-margin">
                            <div className="conversation-item-area"
                                ref={(el) => { this.messagesEnd = el; }}
                            >
                                {this.state.conversationDOM}
                            </div>
                        </div>
                        <div className="input-area no-margin">
                            <OmniInput options={this.state.currentOption} onUserResponse={this.handleUserResponse.bind(this)} />
                        </div>
                    </MDBCol>
                </MDBRow>
                <MDBModal isOpen={this.state.modal}
                          toggle={this.toggleModal} size="fluid" 
                          className="" >
                    <MDBModalBody>
                        <UploadFile onUpload={this.onUploadFileComplete.bind(this)}/>    
                    </MDBModalBody>
                </MDBModal>
                {/* <MDBRow className="height-full-10 light-border" >
                    hello
                </MDBRow> */}
                {/* <MDBRow > */}
                {/* <MDBCol md="3" className="no-mobile height-full-80 light-border">

                    </MDBCol> */}
                {/* <MDBCol md="9" sm="12" className="height-80 light-border no-padding-side"> */}
                {/* <MDBContainer className="height-full-80 no-padding-side"> */}
                {/* <MDBRow className="height-80 width-full no-margin-side"> */}
                {/* {this.state.conversationDOM} */}
                {/* <ConversationItem type={Constant.ENTITY_TYPE.BOT}/>
                                <ConversationItem type={Constant.ENTITY_TYPE.USER}/>                                 */}
                {/* </MDBRow> */}
                {/* <MDBRow className="height-20 width-full no-margin-side"> */}
                {/* <OmniInput options={this.state.currentOption} onUserResponse={this.handleUserResponse.bind(this)} /> */}
                {/* </MDBRow> */}
                {/* </MDBContainer> */}
                {/* </MDBCol> */}
                {/* </MDBRow> */}
            </MDBContainer>
        )
    }
}

export default Form;


function BotConversationElm(props) {
    return (
        <div className="conversation-container">
            <div className="conversation-avatar"></div>
            <div className="conversation-msg">{props.item.text}</div>
        </div>
    )
}

function ConversationItem(props) {

    let containerClassName = props.type === Constant.ENTITY_TYPE.BOT ? '' : '';
    return (
        <div className="conversation-item-container">
            <div className="conversation-avatar"></div>
            <div className="conversation-msg">{props.item.data.value.text}</div>
        </div>
    )
}


function FormSection(props){
    return(
        <div>
            {
                props.item.map(x=><FormSectionItem item={x}  key={x.id}/>)
            }
        </div>
    )
}

function FormSectionItem(props){
    return(
        <div className="section-item">
            {props.item.name}
        </div>
    )
}

function LiveFormContainer(props){
    return(
        <div>
            {
                props.item.map(x=><LiveFormItem item={x}  key={x.id}/>)
            }
        </div>
    )
}


function LiveFormItem(props){
    return (
        <div className="live-form-item">
            <div>{props.item.fieldName}</div>
            <div>{props.item.value}</div>
        </div>
    )
}