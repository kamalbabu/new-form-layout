import { MDBCol, MDBContainer, MDBInput, MDBRow } from "mdbreact";
import React, { Component } from 'react';
import ScanDoc from '../../components/transfer-doc/ScanDoc';
import './Dashboard.css';

class Dashboard extends Component {
    render() {
        return (
            <MDBContainer fluid>
                <MDBRow className="vertical-align">
                    <MDBCol md="4" sm="12" className="offset-md-4 flex">
                        <MDBInput label="Please provide url to file" />
                        {/* <MDBBtn color="primary" >
                            <MDBIcon icon="magic" className="mr-2" /> Start                            
                        </MDBBtn> */}
                        <ScanDoc/>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        )
    }
}

export default Dashboard