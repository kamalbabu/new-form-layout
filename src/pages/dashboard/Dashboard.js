import { MDBCol, MDBContainer, MDBInput, MDBRow,MDBBtn } from "mdbreact";
import React, { Component } from 'react';
import ScanDoc from '../../components/transfer-doc/ScanDoc';
import './Dashboard.css';

class Dashboard extends Component {

    constructor(props){
        super(props);
        this.onProcessForm =this.onProcessForm.bind(this);
    }
    onProcessForm(){
        console.log(this.props.history.push('/form'));
    }

    render() {
        return (
            <MDBContainer fluid>
                <MDBRow className="vertical-align">
                    <MDBCol md="4" sm="12" className="offset-md-4 flex">
                        <MDBInput label="Please provide url to file" />
                    </MDBCol>
                </MDBRow>
                <MDBRow className="">
                    <MDBCol md="4" sm="12" className="offset-md-4 flex">
                            <MDBBtn color="primary" 
                                    className="btn-start"
                                    onClick={this.onProcessForm}>Start</MDBBtn>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        )
    }
}

export default Dashboard