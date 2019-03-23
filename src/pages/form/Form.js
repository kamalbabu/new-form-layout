import React, { Component } from 'react';
import './Form.css';
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import OmniInput from '../../components/omni-input/OmniInput';
class Form extends Component {

    constructor(props){
        super(props);
        this.state ={
            processedForm:{}
        }
    }

    render() {
        return (
            <MDBContainer fluid className="form-full-height no-margin-side">   
                <MDBRow className="height-full-10 light-border" >   
                    hello              
                </MDBRow>
                 <MDBRow >
                    <MDBCol md="4"  className="no-mobile height-full-80 light-border">
                         hello
                    </MDBCol>
                    <MDBCol md="8" sm="12" className="height-80 light-border no-padding-side">
                        <MDBContainer className="height-full-80 no-padding-side">
                            <MDBRow className="height-80 width-full no-margin-side">

                            </MDBRow>
                            <MDBRow className="height-20 width-full no-margin-side">
                                <OmniInput/>
                            </MDBRow>
                        </MDBContainer> 
                    </MDBCol>
                </MDBRow>           
            </MDBContainer>
        )
    }
}

export default Form;