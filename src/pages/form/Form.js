import { MDBCol, MDBContainer, MDBModal, MDBModalBody, MDBRow, MDBBtn, MDBModalHeader } from "mdbreact";
import React, { Component, Fragment } from "react";
import * as Constant from "../../common/constants";
import OmniInput from "../../components/omni-input/OmniInput";
import TopNavigation from "../../components/top-nav/TopNav"
import conversation from "../../mocks/conversationTree";
import formInfo from "../../mocks/form";
import options from "../../mocks/optionMock";
import "./Form.css";
import { NONAME } from "dns";


class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formcategory: [],
            liveForm: {},
            selectedFormCategory: 0,
            lastConversationIndex: 0,
            conversationTree: conversation,
            conversationDOM: [],
            processedForm: {},
            currentOption: {},
            currentInputExpects: Constant.CONVERSATION_TYPE.OPTION,
            modal: false,
            aadharData: formInfo.aadharData,
            modal: false
        };
        //this.aadharData =formInfo.aadharData;
        this.conversationDomElm = [];

        this.prefillData = this.prefillData.bind(this);
        this.updateCategoryPercentage = this.updateCategoryPercentage.bind(this);
    }

    componentWillMount() {
        this.setState({
            formcategory: formInfo.formCategory,
            liveForm: formInfo.formDetails,
            aadharData: formInfo.flashFillPersonal
        });
    }
    componentDidMount() {
        this.initBotConversation();
        this.scrollToBottom();
    }

    componentDidUpdate() {
        this.scrollToBottom();
    }

    toggleModal = async () => {
        await this.setState({
            modal: !this.state.modal
        });
    };

    scrollToBottom = () => {
        
        // this.messagesEnd.scrollIkntoView({ behavior: "smooth" });
        // console.log(this.messagesEnd.scrollHeight);
        this.messagesEnd.scrollTop = this.messagesEnd.scrollHeight;
        // console.log(this.messagesEnd);
        // if (this.messagesEnd > 0) {
        //     this.messagesEnd.scrollTop = this.messagesEnd.scrollHeight;
        // }
    };

    registerConversationElm = async elm => {
        this.conversationDomElm.push(elm);
        await this.setState({
            conversationDOM: this.conversationDomElm
        });
    };

    registerUserConversationElm(elm) {
        this.conversationDomElm.push(elm);
        this.setState({
            conversationDOM: this.conversationDomElm
        });
    }


    onUploadFileComplete = response => {
        let conversationElm = (
            <ConversationItemImagePreview
                item={response}
                type={Constant.CONVERSATION_TYPE.UPLOAD}
                key={response.data.id + response.data.action}
            />
        );
        this.registerUserConversationElm(conversationElm);
        //this.toggleModal();
        setTimeout(() => {
            this.triggerConversation();
        }, 2000);
    };

    initBotConversation() {
        this.triggerConversation();
    }
    updateCategoryPercentage() {
        for (let index = 0; index < this.state.formcategory.length; index++) {
            let currentCategoryId = this.state.formcategory[index].id;
            let formItem = this.state.liveForm.find(x => x.cat === currentCategoryId);
        }
    }
    prefillData() {
        let currentFormData = this.state.liveForm;

        for (let index = 0; index < this.state.aadharData.length; index++) {
            let item = this.state.aadharData[index];

            for (let liveIndex = 0; liveIndex < currentFormData.length; liveIndex++) {
                if (item.id === currentFormData[liveIndex].fieldId) {
                    currentFormData[liveIndex].value = item.value;
                    break;
                }
            }
        }
        this.updateCategoryPercentage()
        this.setState({
            liveForm: currentFormData
        });
        this.forceUpdate();
    }

    triggerConversation = async () => {
        console.log(this.state.lastConversationIndex)
        let conversationObject = this.state.conversationTree[
            this.state.lastConversationIndex
        ];

        try {
            if (conversationObject !== undefined) {
                while (conversationObject.type !== "CHOICE") {
                    let conversationElm = (
                        <BotConversationElm
                            item={conversationObject}
                            type={Constant.CONVERSATION_TYPE.BOT}
                            key={conversationObject.id}
                        />
                    );
                    this.registerConversationElm(conversationElm);
                    let nextConversationId = this.state.lastConversationIndex + 1;
                    await this.setState({
                        lastConversationIndex: nextConversationId
                    });
                    if (conversationObject.type === 'INFO_PROCESS_FLASH_FILL') {
                        await this.prefillData()
                    }
                    conversationObject = this.state.conversationTree[nextConversationId];
                    await new Promise(r => setTimeout(r, 1000));
                }
                //console.log(conversationObject);
                //Encountered a choice decision
                if (conversationObject.type === "CHOICE") {
                    let conversationElm = (
                        <BotConversationElm
                            item={conversationObject}
                            type={Constant.CONVERSATION_TYPE.BOT}
                            key={conversationObject.id}
                        />
                    );
                    this.registerConversationElm(conversationElm);
                    let currentOption = options.find(
                        o => o.id === conversationObject.option
                    );
                    let nextConversationId = this.state.lastConversationIndex + 1;
                    await this.setState({
                        currentOption: currentOption,
                        lastConversationIndex: nextConversationId
                    });
                    await new Promise(r => setTimeout(r, 2000));
                    //this.forceUpdate()
                }
            } else {
                console.log("Something went wrong..")
                //End Conversation
            }
        } catch (e) {

            console.log(e)
        }
    };
    handleImageChange(e) {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = async () => {
            let response = {
                type: Constant.CONVERSATION_TYPE.TEXT,
                data: {
                    id: 'UPLOAD_ID',
                    timestamp: new Date().toUTCString(),
                    text: reader.result,
                    action: 'PROCESS_ID'

                }
            };
            this.onUploadFileComplete(response);
        }
        reader.readAsDataURL(file)
    }
    handleUserResponse = async conversation => {

        this.setState({
            currentOption: {}
        });
        let conversationElm = (
            <ConversationItem
                item={conversation}
                type={Constant.CONVERSATION_TYPE.TEXT}
                key={conversation.data.timestamp}
            />
        );
        this.registerUserConversationElm(conversationElm);
        if (conversation.data.id === "FLASH_FILL_OPTION") {
            this.inputElement.click();
        } else {
            await new Promise(r => setTimeout(r, 1000));
            this.triggerConversation();
        }
    };

    handleFormSectionSelection = async response => {
        let selectedIndex = 0;
        var item = this.state.formcategory.find(x => x.id === response);
        for (; selectedIndex < this.state.formcategory.length; selectedIndex++) {
            if (item.id === this.state.formcategory[selectedIndex].id) {
                break;
            }
        }
        await this.setState({
            selectedFormCategory: selectedIndex
        });
    };

    OnViewOverview = () => {
        this.toggleModal();
    }

    render() {
        let currentStateId = this.state.formcategory[
            this.state.selectedFormCategory
        ].id;
        let currentFormItem = this.state.liveForm.filter(
            x => x.cat === currentStateId
        );
        return (
            <Fragment>
                <TopNavigation />
                <MDBContainer fluid className="form-container">
                    <MDBRow className="title-container">
                        <span className="title-text">NEW ACCOUNT OPENING FORM</span>
                        <span className="overview-section"
                            onClick={this.OnViewOverview}
                        >
                            OVERVIEW
                        </span>
                    </MDBRow>
                    <MDBRow className="form-sections-container">
                        <FormSection
                            item={this.state.formcategory}
                            selectedFormIndex={this.state.selectedFormCategory}
                            onSelect={this.handleFormSectionSelection}
                        />
                    </MDBRow>
                    <MDBRow className="form-conversation-container">
                        <MDBCol md="3" sm="12" xs="12" className="live-form-container">
                            <LiveFormContainer item={currentFormItem} />
                        </MDBCol>
                        <MDBCol md="9" sm="12" className="conversation-container">
                            {/* <div className="conversation-area">
                                <div
                                    className="conversation-item-area"
                                    ref={el => {
                                        this.messagesEnd = el;
                                    }}
                                >
                                    {this.state.conversationDOM}
                                </div>
                            </div> */}
                            <div className="conversation-area"
                            ref={el => {
                                this.messagesEnd = el;
                            }}>
                              
                                    {this.state.conversationDOM}
                              
                            </div>
                            <div className="input-area no-margin">
                                <OmniInput
                                    options={this.state.currentOption}
                                    onUserResponse={this.handleUserResponse.bind(this)}
                                />
                            </div>
                        </MDBCol>
                    </MDBRow>
                    <input className="fileInput invisible"
                        type="file"
                        ref={input => this.inputElement = input}
                        onChange={(e) => this.handleImageChange(e)} />
                </MDBContainer>

                {/* <MDBBtn onClick={this.toggleModal}>Modal</MDBBtn> */}
                <MDBModal isOpen={this.state.modal}
                    toggle={this.toggle}
                    backdrop={false}
                    className="overview-mobile no-margin"
                >
                    <MDBModalHeader toggle={this.toggleModal}
                        className="overview-header-size"
                    >
                        <span className="overview-title">NEW ACCOUNT APPLICATION</span>
                    </MDBModalHeader>
                    <MDBModalBody
                        className="over-view-body"
                    >
                        <OverViewMobile category={this.state.formCategory} items={this.state.liveForm} />
                    </MDBModalBody>
                </MDBModal>
            </Fragment>

        );
    }
}

export default Form;

function BotConversationElm(props) {
    return (
        <div className="conversation-message-container">
            <div className="conversation-avatar"></div>
            <div className="conversation-msg">{props.item.text}</div>
        </div>
    );
}

function ConversationItemImagePreview(props) {
    return (
        <div className="conversation-item-container">
            <div className="conversation-msg user-message imagePreview">
                <img src={props.item.data.text} alt="" />
            </div>
        </div>
    );
}

function ConversationItem(props) {
    return (
        <div className="conversation-item-container">
            <div className="conversation-msg user-message">{props.item.data.text}</div>
        </div>
    );
}

function FormSection(props) {
    let colors = [
        '#008299',
        '#0098B3',
        '#00B0CF'
    ]

    return (
        <div className="form-section-container">
            {props.item.map((x, index) => (
                <FormSectionItem item={x} color={colors[index]} index={index} selectedFormIndex={props.selectedFormIndex} key={x.id} onSelect={props.onSelect} />
            ))}
        </div>
    );
}

function FormSectionItem(props) {
    let elemStyle = {}
    if (props.selectedFormIndex === props.index) {
        elemStyle = {
            'backgroundColor': '#05567E',
            'color': 'white',
            'maxHeight': '60px',
            'padding': '12px 10px',
            'margin': '0 -1px',
            'width': '160px',
            'borderRight': '1px solid #FAFAF9',
            'cursor': 'pointer',
            'flex': '0 0 auto',
            'fontWeight': '500'
        }
    } else {
        elemStyle = {
            'backgroundColor': props.color,
            'color': 'white',
            'maxHeight': '60px',
            'padding': '12px 10px',
            'margin': '0 -1px',
            'width': '160px',
            'borderRight': '1px solid #FAFAF9',
            'cursor': 'pointer',
            'flex': '0 0 auto',
            'fontWeight': '400'
        }
    }

    return (
        <div
            style={elemStyle}
            //  className={` ${props.selectedFormIndex === props.index ? 'section-item-selected' : ''}`}            

            onClick={props.onSelect.bind(this, props.item.id)}>
            <div className="section-item-number">Step {props.index + 1}</div>
            <div className="section-item-label">{props.item.name}</div>
        </div>
    );
}

function LiveFormContainer(props) {
    return (
        <div className="value-container">
            {props.item.map(x => (
                <LiveFormItem item={x} key={x.id} />
            ))}
        </div>
    );
}

function LiveFormItem(props) {
    return (
        <div className="live-form-item">
            <div className="live-form-title">{props.item.fieldName}</div>
            <div className="live-form-value">{props.item.value}</div>
        </div>
    );
}




class OverViewMobile  extends Component{
    constructor(props){
        super(props);
        this.state={
            selectedIndex:0
        }
    }
    handleSelection=(index)=>{
        // selectedIndex=index
        this.setState({
            selectedIndex:index
        })
    }
    render(){
        let cat = formInfo.formCategory;
        return (
            <div>
                {cat.map((x, index) => (
                    <OverviewMobileSection cat={x} 
                        items={this.props.items} 
                        key={index} 
                        select={this.state.selectedIndex} 
                        current={index}
                        onSelect={this.handleSelection} ></OverviewMobileSection>
                ))}
            </div>
        )
    }   
}

function OverviewMobileSection(props) {
    let formElem = [];
    for (let index in props.items) {
        if (props.cat.id === props.items[index].cat) {
            formElem.push(props.items[index])
        }
    }
   
    let displayObj={}
    let isSelected = props.select===props.current;
    if(!isSelected){
        displayObj={
        'display':'none'
    }}

    let onSelect=()=>{
        props.onSelect(props.current);
    }


    return (
        <div>
            <div onClick={onSelect}>
                <div 
                    
                    className={`overview-item-elm ${!isSelected 
                                    ? 'overview-item-inactive' : 'overview-item-active'}`}  
                ></div>
                <span className="overview-cat-title"
                >{props.cat.name}</span>
            </div>


            <div className="overview-item-container"
                style={displayObj}
            >

                {formElem.map(x => (
                    <LiveFormItem item={x} key={x.id} />
                ))}

            </div>
        </div>
    )
}