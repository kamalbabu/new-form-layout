import React, { Component } from 'react';
import './Form.css';
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import OmniInput from '../../components/omni-input/OmniInput';
class Form extends Component {
    render() {
        return (
            <MDBContainer fluid className="form-full-height">   
                <MDBRow className="height-full-10 light-border" >   
                    hello              
                </MDBRow>
                 <MDBRow >
                    <MDBCol md="4"  className="no-mobile height-full-80 light-border">
                         hello
                    </MDBCol>
                    <MDBCol md="8" sm="12" className="height-80 light-border">
                        <MDBContainer className="height-full-80">
                            <MDBRow className="height-80 width-full">

                            </MDBRow>
                            <MDBRow className="height-20 width-full">
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