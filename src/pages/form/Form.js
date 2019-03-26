import { MDBCol, MDBContainer, MDBModal, MDBModalBody, MDBRow } from "mdbreact";
import React, { Component } from "react";
import * as Constant from "../../common/constants";
import OmniInput from "../../components/omni-input/OmniInput";
import UploadFile from "../../components/upload/UploadFile";
import conversation from "../../mocks/conversationTree";
import formInfo from "../../mocks/form";
import options from "../../mocks/optionMock";
import "./Form.css";

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
      aadharData: formInfo.aadharData
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
    if (this.messagesEnd) {
      this.messagesEnd.scrollTop = this.messagesEnd.scrollHeight;
    }
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
    this.toggleModal();
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
      console.log(formItem);
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
    if (conversation.data.id === "FLASH_FILL_METHOD_OPTION") {
      this.toggleModal();
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

  render() {
    let currentStateId = this.state.formcategory[
      this.state.selectedFormCategory
    ].id;
    let currentFormItem = this.state.liveForm.filter(
      x => x.cat === currentStateId
    );
    return (
      <MDBContainer fluid className="form-container">
        <MDBRow className="form-sections-container">
          <FormSection
            item={this.state.formcategory}
            onSelect={this.handleFormSectionSelection}
          />
        </MDBRow>
        <MDBRow className="form-conversation-container">
          <MDBCol md="3" sm="12" xs="12" className="live-form-container">
            <LiveFormContainer item={currentFormItem} />
          </MDBCol>
          <MDBCol md="9" sm="12" className="conversation-container">
            <div className="conversation-area">
              <div
                className="conversation-item-area"
                ref={el => {
                  this.messagesEnd = el;
                }}
              >
                {this.state.conversationDOM}
              </div>
            </div>
            <div className="input-area no-margin">
              <OmniInput
                options={this.state.currentOption}
                onUserResponse={this.handleUserResponse.bind(this)}
              />
            </div>
          </MDBCol>
        </MDBRow>
        <MDBModal
          isOpen={this.state.modal}
          toggle={this.toggleModal}
          size="fluid"
          className="full-width full-height no-margin"
        >
          <MDBModalBody>
            <UploadFile onUpload={this.onUploadFileComplete.bind(this)} />
          </MDBModalBody>
        </MDBModal>
      </MDBContainer>
    );
  }
}

export default Form;

function BotConversationElm(props) {
  return (
    <div className="conversation-message-container">
      <div className="conversation-avatar" />
      <div className="conversation-msg">{props.item.text}</div>
    </div>
  );
}

function ConversationItemImagePreview(props) {
  return (
    <div className="conversation-item-container">
      <div className="conversation-avatar" />
      <div className="conversation-msg user-message imagePreview">
        <img src={props.item.data.text} alt="" />
      </div>
    </div>
  );
}

function ConversationItem(props) {
  return (
    <div className="conversation-item-container">
      <div className="conversation-avatar" />
      <div className="conversation-msg user-message">{props.item.data.text}</div>
    </div>
  );
}

function FormSection(props) {
  return (
    <div className="form-section-container">
      {props.item.map((x, index) => (
        <FormSectionItem item={x} index={index} key={x.id} onSelect={props.onSelect} />
      ))}
    </div>
  );
}

function FormSectionItem(props) {
  return (
    // <div className={`form-section-item ${this.state.selectedFormCategory == props.index ? 'section-item-selected' : null}`}
    //   onClick={props.onSelect.bind(this, props.item.id)}>
    <div className="form-section-item"
      onClick={props.onSelect.bind(this, props.item.id)}>
      <div className="section-item-number">Step {props.index + 1}</div>
      <div className="section-item-label">{props.item.name}</div>
    </div>
  );
}

function LiveFormContainer(props) {
  return (
    <div>
      {props.item.map(x => (
        <LiveFormItem item={x} key={x.id} />
      ))}
    </div>
  );
}

function LiveFormItem(props) {
  return (
    <div className="live-form-item">
      <div>{props.item.fieldName}</div>
      <div>{props.item.value}</div>
    </div>
  );
}
