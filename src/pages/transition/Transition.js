import { MDBCol, MDBContainer, MDBInput, MDBRow,MDBBtn } from "mdbreact";
import React, { Component } from 'react';
import logo from '../../logo.svg'
import './Transition.css';
import send from "../../assets/ico-send.png";
import upload from "../../assets/ico-rec.png";


class Transition extends Component {

    constructor(props){
        super(props);
        
    }

    componentDidMount(){
       this.loadForm() 
    }

    loadForm(){

        setTimeout(()=>{
            this.props.history.push('/form');
        },3000);
    }
    
    render() {
        return (
            <MDBContainer fluid>
                <MDBRow className="vertical-align">
                    <MDBCol md="4" sm="12" className="offset-md-4 flex">
                        <span>Please wait while we process your form</span>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        )
    }
}

export default Transition