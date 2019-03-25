import React, { Component } from 'react';
import { MDBNavbar} from 'mdbreact';
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
                <div >
                    <strong className="brand">Brand</strong>
                </div>
            </MDBNavbar>
        );
    }
}

export default TopNavigation;