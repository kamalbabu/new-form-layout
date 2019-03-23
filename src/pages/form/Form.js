import React, { Component } from 'react';
import './Form.css';
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import OmniInput from '../../components/omni-input/OmniInput';
import * as Constant from '../../common/constants';
import options from '../../mocks/optionMock';
import conversation from '../../mocks/conversationTree';

class Form extends Component {

    constructor(props) {
        super(props);
        this.state = {
            lastConversationIndex:0,
            conversationTree: conversation,
            conversationDOM: [],
            processedForm: {},
            currentOption: {},
            currentInputExpects: Constant.CONVERSATION_TYPE.OPTION,

        }
        this.conversationDomElm=[];
    }

    componentDidMount() {
        this.initBotConversation();
    }

    initBotConversation(){
       this.triggerConversation()
    }

    triggerConversation = async() =>{
        let conversationObject = this.state.conversationTree[this.state.lastConversationIndex];
        if(conversationObject!==undefined){
            console.log(conversationObject);
            while(conversationObject.type!=='CHOICE'){
                let conversationElm = <BotConversationElm item={conversationObject} type={Constant.CONVERSATION_TYPE.BOT} key={conversationObject.id}/>
                this.registerConversationElm(conversationElm);
                let nextConversationId =this.state.lastConversationIndex +1
                await this.setState({
                    lastConversationIndex: nextConversationId
                });
                conversationObject = this.state.conversationTree[nextConversationId];
            }
            //Encountered a choice decision
            if(conversationObject.type==='CHOICE'){
                let conversationElm = <BotConversationElm item={conversationObject} type={Constant.CONVERSATION_TYPE.BOT} key={conversationObject.id}/>   
                this.registerConversationElm(conversationElm);
                let currentOption = options.find(o=>o.id==conversationObject.option);  
                let nextConversationId =this.state.lastConversationIndex +1;
                await this.setState({
                    currentOption:currentOption,
                    lastConversationIndex: nextConversationId
                });            
                //this.forceUpdate()
            }
        }else{
            //End Conversation
        }
        
    }

    handleUserResponse(conversation) {
        this.setState({
            currentOption:{}
        })
        let conversationElm = <ConversationItem item={conversation} type={Constant.CONVERSATION_TYPE.TEXT} key={conversation.data.value.text}/>
        this.registerUserConversationElm(conversationElm);
        this.triggerConversation();
    }

    registerConversationElm=async (elm)=>{
        this.conversationDomElm.push(elm)
        await this.setState({
            conversationDOM: this.conversationDomElm
        });
    }

    registerUserConversationElm(elm){
        this.conversationDomElm.push(elm);
        this.setState({
            conversationDOM: this.conversationDomElm
        });
    }

    render() {
        return (
            <MDBContainer fluid className="form-full-height no-margin-side">
                <MDBRow className="height-full-10 light-border" >
                    hello
                </MDBRow>
                <MDBRow >
                    <MDBCol md="3" className="no-mobile height-full-80 light-border">

                    </MDBCol>
                    <MDBCol md="9" sm="12" className="height-80 light-border no-padding-side">
                        <MDBContainer className="height-full-80 no-padding-side">
                            <MDBRow className="height-80 width-full no-margin-side">
                            {this.state.conversationDOM}
                                {/* <ConversationItem type={Constant.ENTITY_TYPE.BOT}/>
                                <ConversationItem type={Constant.ENTITY_TYPE.USER}/>                                 */}
                            </MDBRow>
                            <MDBRow className="height-20 width-full no-margin-side">
                                <OmniInput options={this.state.currentOption} onUserResponse={this.handleUserResponse.bind(this)} />
                            </MDBRow>
                        </MDBContainer>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        )
    }
}

export default Form;


function BotConversationElm(props){
    return (
        <div className="conversation-container"> 
              <div className="conversation-avatar"></div>
              <div className="conversation-msg">{props.item.text}</div>
        </div> 
    )
}

function ConversationItem(props) {

    let containerClassName=props.type===Constant.ENTITY_TYPE.BOT?'':'';    
    return (
        <div className="conversation-container"> 
              <div className="conversation-avatar"></div>
              <div className="conversation-msg">{props.item.data.value.text}</div>
        </div> 
    )
}