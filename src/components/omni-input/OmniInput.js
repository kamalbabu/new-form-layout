import React, { Component } from 'react';
import './OmniInput.css';
import { MDBBtn, MDBIcon } from "mdbreact";
import { MDBInput } from "mdbreact";
import { Fragment } from 'react';
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";

import *  as Constant from '../../common/constants';

class OmniInput extends Component {

    constructor(props){
        super(props);     
        this.state={
            currentVal:'',
            currentOptionObj:props.options
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

    clearInput(){
        this.setState({
            currentVal:''
        });
    }

    sendCurrentMsg(value){
        let response ={
            type:Constant.CONVERSATION_TYPE.TEXT,
            value : value
        };
        this.props.onUserResponse(response);
    }

    onSelectUserOptionSelection(option){
        this.setState({
            currentOptionObj:{}
        });
        let response ={
            type:Constant.CONVERSATION_TYPE.OPTION,
            value : option
        };
        this.props.onUserResponse(response);
    }

    render() {
        return (
            <div className="width-full pad-12 ">
                <OptionList options={this.state.currentOptionObj} onSelectOption={this.onSelectUserOptionSelection.bind(this)}/>
                <MDBRow className="mg-top-5 no-margin">                    
                    <MDBCol sm="12" className="flex no-margin">
                        <input type="text" id="ipOmniInput"
                            className="form-control form-control-md omni-ip"
                            value={this.state.currentVal}
                            onChange={this.handleUserInput.bind(this)}                            
                            onKeyPress={this.handleInputKeyPress.bind(this)}
                        />
                        {/* <MDBIcon icon="chevron-right btn-send" size="lg"/> */}
                        <i className="material-icons btn-send">send</i>
                    </MDBCol>
                </MDBRow>
            </div>
        )
    }
}

export default OmniInput


class OptionList extends Component{
    constructor(props){
        super(props);          
        this.state={
            options:props.options
        }     
    }

    componentDidMount(){
        this.setState({
            options:this.props.options 
        });
    }

    setOptionState(){
        if(this.props.options){
            this.setState({
                options:this.props.options 
            });
        }
    }

    handleOptionSelect(optionItem){       
       let optionStatus={
           optionId:this.state.options.id,
           optionValue:optionItem
       }
       this.props.onSelectOption(optionStatus)
    }
    

    render(){
        let OptionList;
        var items= this.props.options.id?this.props.options.values:[];
        return(

                <div className="option-container">
                    {
                        items.map(function(item,index){
                            return(
                                <div className="option-item"
                                        key={index} 
                                        onClick={this.handleOptionSelect.bind(this,item)}>
                                        {item.title}</div>
                                    )
                        }.bind(this))
                    }
            </div>
        )
    }
}
