import React, { Component }  from 'react';
import './OmniInput.css';
import { MDBBtn, MDBIcon } from "mdbreact";
import { MDBInput } from "mdbreact";
import { Fragment } from 'react';
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
class OmniInput extends Component {
    render() {
        return (
            <div className="width-full pad-12 ">
                <MDBRow className="mg-top-5 no-margin">
                    <MDBCol sm="12" className="flex no-margin">
                        <input type="text" id="example2" className="form-control form-control-md omni-ip" />                        
                        {/* <MDBIcon icon="chevron-right btn-send" size="lg"/> */}
                        <i class="material-icons btn-send">send</i>
                    </MDBCol>
                </MDBRow>
            </div>
        )
    }
}

export default OmniInput