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
            conversationTree: conversation,
            conversationDOM: [],
            processedForm: {},
            currentOption: options[0],
            currentInputExpects: Constant.CONVERSATION_TYPE.OPTION,

        }
    }

    componentDidMount() {

    }

    createBotDomView() {

    }

    handleUserResponse(conversation) {
        if (conversation.type === Constant.CONVERSATION_TYPE.TEXT) {

        } else if (conversation.type === Constant.CONVERSATION_TYPE.OPTION) {

        }
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
                                <ConversationItem type={Constant.ENTITY_TYPE.BOT}/>
                                <ConversationItem type={Constant.ENTITY_TYPE.USER}/>                                
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




function ConversationItem(props) {

    let containerClassName=props.type===Constant.ENTITY_TYPE.BOT?'':'';

    return (
        <div className="conversation-container"> 
              <div className="conversation-avatar"></div>
              <div className="conversation-msg">hello damn</div>
        </div> 
            // <MDBCol md="8" sm="12" className="conversation-container">
            //     <div className="conversation-avatar"></div>
            //     <div className="conversation-msg">hello chakare</div>
            // </MDBCol>        
    )
}