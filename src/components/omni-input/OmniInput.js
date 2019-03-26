import React, { Component, Fragment } from 'react';
import './OmniInput.css';
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
                timestamp: new Date().toUTCString(),
                text: value,
                action: 'PROCESS_TEXT'
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
            data: {
                id: option.id,
                timestamp: new Date().toUTCString(),
                text: option.value.text,
                action: 'PROCESS_OPTION_YES_NO'
            }
        };
        this.props.onUserResponse(response);
    }

    render() {
        this.optionObj = this.props.options;
        this.hideOption = false;
        return (
            <Fragment>
                <div className="intelli-option-container">
                    <OptionList options={this.optionObj} onSelectOption={this.onSelectUserOptionSelection.bind(this)} />


                    <div className="omni-input-container">
                        <input type="text" id="ipOmniInput"
                            className="form-control form-control-md omni-input"
                            value={this.state.currentVal}
                            onChange={this.handleUserInput.bind(this)}
                            onKeyPress={this.handleInputKeyPress.bind(this)}
                        />
                        <i className="material-icons btn-send">send</i>
                    </div>
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
        // this.state = {
        //     options: props.options
        // }
        this.currentItemId = "";
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
            id: this.props.options.id,
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
