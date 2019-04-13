import React, { Component } from 'react';
import { MDBNavbar } from 'mdbreact';
import logo from '../../logo.svg'
import "./TopNav.css";

class TopNavigation extends Component {
    state = {
        collapse: false
    }

    onClick = () => {
        this.setState({
            collapse: !this.state.collapse,
        });
    }

    toggle = () => {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }

    render() {
        return (
            <MDBNavbar className="flexible-navbar" fixed="true" light expand="md">
                {/* <div >
                    <strong className="brand">Brand</strong>
                </div> */}
                <div className="brand-container">
                    {/* <div className="live-form-toggle">
                        <i className="material-icons">menu</i>
                    </div> */}
                    <div className="brand-logo-container">
                        <img className="brand-logo" src={logo} alt="" />
                    </div>
                </div>
            </MDBNavbar >
        );
    }
}

export default TopNavigation;