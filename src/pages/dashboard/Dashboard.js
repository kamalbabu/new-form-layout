import React, { Component } from 'react';
import './Dashboard.css';
import ScanDoc from '../../components/transfer-doc/ScanDoc';

import { MDBBtn, MDBIcon } from "mdbreact";

import { MDBInput } from "mdbreact";
// import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavbarToggler, MDBCollapse, MDBNavItem, MDBNavLink, MDBIcon } from 'mdbreact';
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
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