import React, { Component } from 'react';
import './Form.css';
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";

class Form extends Component {
    render() {
        return (
            <MDBContainer fluid className="form-full-height">   
                 <MDBRow >
                    <MDBCol md="4" sm="12" className="no-mobile">
                         hello
                    </MDBCol>
                    <MDBCol md="4" sm="12" className="">
                         hello
                    </MDBCol>
                </MDBRow>           
            </MDBContainer>
        )
    }
}

export default Form;