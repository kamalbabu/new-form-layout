import React, { Component, Fragment } from 'react';
import './OmniInput.css';
import *  as Constant from '../../common/constants';

import icoSend from "../../assets/ico-send.png";
import icoMic from "../../assets/ico-rec.png";
import icoEdit from "../../assets/ico-edit.png";


import icoADR from "../../assets/ico-aadhar.png"; 
import icoPAN from "../../assets/ico-pan.png";
import icoDRV from "../../assets/ico-drv.png";


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
        // this.sendCurrentMsg(this.state.currentVal)
        // this.clearInput();
    }

    hendSendButtonClick = (evt)=>{
        console.log(this.state.currentVal)
        this.sendCurrentMsg(this.state.currentVal);
        this.setState({
            currentVal: ''
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
        if(this.optionObj.id==='FLASH_FILL_OPTION'){
            this.optionObj.values[0].image=icoADR
            this.optionObj.values[1].image=icoPAN
            this.optionObj.values[2].image=icoDRV
        }
        console.log(this.optionObj);
        this.hideOption = false;
        return (
            <Fragment>
                <div className="intelli-option-container">
                    <OptionList options={this.optionObj} onSelectOption={this.onSelectUserOptionSelection.bind(this)} />


                    <div className="omni-input-container">
                        <input type="text" id="ipOmniInput"
                            className="form-control form-control-md omni-input"
                            placeholder="Please provide input here"
                            value={this.state.currentVal ||''}
                            onChange={this.handleUserInput.bind(this)}
                            onKeyPress={this.handleInputKeyPress.bind(this)}
                        />
                        <img className="ico-send" 
                                onClick={this.hendSendButtonClick.bind(this)}
                                src={icoSend}></img>
                        <img className="ico-mic"src={icoMic}></img>
                        <img className="ico-edit"src={icoEdit}></img>                        
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default OmniInput


class OptionList extends Component {
    constructor(props) {
        super(props);
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
                            <Fragment>
                                {
                                    item.image? 
                                         <div className="option-item-img-container" key={index}>
                                             <img className="option-item-img"
                                                 src={item.image} alt=''
                                                 
                                                 onClick={this.handleOptionSelect.bind(this, item)}
                                                 />
                                          </div>
                                    
                                            :
                                            <div className="option-item"
                                            key={index}
                                            onClick={this.handleOptionSelect.bind(this, item)}>
                                            {item.title}</div>
                                }
                            </Fragment>
                           


                            
                        )
                    }.bind(this))
                }
            </div>
        )
    }
}
