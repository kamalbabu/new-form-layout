import { MDBCol, MDBContainer, MDBInput, MDBRow, MDBBtn } from "mdbreact";
import React, { Component } from 'react';
import logo from '../../logo.svg'
import './Dashboard.css';
import send from "../../assets/ico-send.png";
import upload from "../../assets/ico-rec.png";


class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.onProcessUrl = this.onProcessUrl.bind(this);
        this.onUploadFile = this.onUploadFile.bind(this);
        this.inputElement = null;
    }

    onProcessUrl() {
        this.props.history.push('/process')
    }

    handleUploadFile(e) {
        e.preventDefault();
        let reader = new FileReader();
        let file = e.target.files[0];
        reader.onloadend = async () => {
            setTimeout(() => {

                this.props.history.push('/process')
            }, 2000);
        }
        reader.readAsDataURL(file)
    }

    onUploadFile() {
        this.inputElement.click();
    }

    render() {
        return (
            <MDBContainer fluid>
                <MDBRow className="vertical-align">
                    <MDBCol md="4" sm="12" className="offset-md-4 flex">
                        <img className="brand-logo-big" src={logo} alt="" />
                        <div className="ip-container">
                            <input className="ip-content"
                                placeholder="Provide url or upload file to begin"

                            ></input>
                            <img className="btn-upload"
                                src={upload}
                                onClick={this.onUploadFile}
                            ></img>
                            <img className="btn-send"
                                src={send}
                                onClick={this.onProcessUrl}
                            ></img>

                        </div>
                        <div className="no-show">
                            <input className="fileInput invisible"
                                type="file"
                                ref={input => this.inputElement = input}
                                onChange={(e) => this.handleUploadFile(e)} />
                        </div>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        )
    }
}

export default Dashboard