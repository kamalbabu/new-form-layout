import React, { Component } from 'react';
import './OmniInput.css';
import { MDBBtn, MDBIcon } from "mdbreact";
import { MDBInput } from "mdbreact";
import { Fragment } from 'react';
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
class OmniInput extends Component {

    constructor(props){
        super(props);
        this.state={
            currentVal:''
        }
    }

    componentDidMount(){

    }


    handleUserInput(evt) {
        this.setState({
            currentVal: evt.target.value
        });
    }

    handleInputKeyPress(evt) {
        if (evt.key === 'Enter' && evt.target.value !== '') {
            console.log(this.state.currentVal);    
            this.sendCurrentMsg(this.state.currentVal)
            this.clearInput();
        }
    }

    sendCurrentMsg(msg){

    }
    clearInput(){
        this.setState({
            currentVal:''
        });
    }


    render() {
        return (
            <div className="width-full pad-12 ">
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