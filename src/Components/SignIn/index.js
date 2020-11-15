import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, ModalHeader } from 'reactstrap';
import SignInAuth from './form';
import './style.css';
import { Redirect } from 'react-router-dom';

class Signin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false
        };
    }
    componentDidMount() {
        let isAuthenticated = this.props.isAuthenticated
        if (isAuthenticated === false) {
            this.toggle()
        }
    }
    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    };
    render() {
        const verify = this.props.verify
        return (
            <div>
                <Modal className="signInModel" isOpen={this.state.isOpen} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}></ModalHeader>
                    <div className="SingUp">
                        <SignInAuth onUpdateUser={this.toggle} />
                    </div>
                </Modal>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.isAuthenticated
    }
}
export default connect(mapStateToProps, null)(Signin);
