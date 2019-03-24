import React, { Component, Fragment } from 'react';
import './OmniInput.css';
import { MDBBtn, MDBIcon } from "mdbreact";
import { MDBInput } from "mdbreact";
// import { Fragment } from 'react';
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";

import *  as Constant from '../../common/constants';

class OmniInput extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentVal: '',
            currentOptionObj: {},
        }

    }

    handleUserInput(evt) {
        this.setState({
            currentVal: evt.target.value
        });
    }

    handleInputKeyPress(evt) {
        if (evt.key === 'Enter' && evt.target.value !== '') {
            //console.log(this.state.currentVal);    
            this.sendCurrentMsg(this.state.currentVal)
            this.clearInput();
        }
    }

    clearInput() {
        this.setState({
            currentVal: ''
        });
        this.optionObj = {};

    }

    sendCurrentMsg(value) {

        let response = {
            type: Constant.CONVERSATION_TYPE.TEXT,
            data: {
                id: 'USER_TEXT',
                value: {
                    text: value
                }
            }
        };
        this.props.onUserResponse(response);
    }

    onSelectUserOptionSelection(option) {
        this.setState({
            currentOptionObj: {}
        });
        let response = {
            type: Constant.CONVERSATION_TYPE.OPTION,
            data: option
        };
        this.props.onUserResponse(response);
        this.forceUpdate();
    }

    render() {
        this.optionObj = this.props.options;
        this.hideOption = false;
        return (
            <Fragment>
                <OptionList options={this.optionObj} onSelectOption={this.onSelectUserOptionSelection.bind(this)} />
               
                <div className="oip-container">
                        <input type="text" id="ipOmniInput"
                            className="form-control form-control-md omni-ip"
                            value={this.state.currentVal}
                            onChange={this.handleUserInput.bind(this)}
                            onKeyPress={this.handleInputKeyPress.bind(this)}
                        />
                        <i className="material-icons btn-send">send</i>
                </div>
                {/* <MDBRow className="mg-top-5 no-margin">
                    <MDBCol sm="12" className="flex no-margin">
                        <input type="text" id="ipOmniInput"
                            className="form-control form-control-md omni-ip"
                            value={this.state.currentVal}
                            onChange={this.handleUserInput.bind(this)}
                            onKeyPress={this.handleInputKeyPress.bind(this)}
                        />
                        <i className="material-icons btn-send">send</i>
                    </MDBCol>
                </MDBRow> */}
            </Fragment>
        )
    }
}

export default OmniInput


class OptionList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            options: props.options
        }
    }

    componentDidMount() {
        this.setState({
            options: this.props.options
        });
    }

    setOptionState() {
        if (this.props.options) {
            this.setState({
                options: this.props.options
            });
        }
    }

    handleOptionSelect(optionItem) {
        let optionStatus = {
            id: this.state.options.id,
            value: optionItem
        }
        this.props.onSelectOption(optionStatus)
    }


    render() {

        var items = this.props.options.id ? this.props.options.values : [];
        return (
            <div className="option-container">
                {
                    items.map(function (item, index) {
                        return (
                            <div className="option-item"
                                key={index}
                                onClick={this.handleOptionSelect.bind(this, item)}>
                                {item.title}</div>
                        )
                    }.bind(this))
                }
            </div>
        )
    }
}
