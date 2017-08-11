import React, { Component } from 'react';
import LoginForm from './LoginForm';

export default class Login extends Component {
    render() {
        return (
            <div className="">
                <div className="container">
                    <h1 className="display-4">Login</h1>
                    <LoginForm />
                </div>
            </div>
        )
    }
}