import React, { Component } from 'react';

export default class LoginForm extends Component {
    constructor() {
        super();
        this.state = {
            username: '',
            password: '',
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }
    onSubmit(e) {
        e.preventDefault();
        console.log(this.state);
    }
    render() {
        return (
            <div className='row'>
                <div className="col-4">
                    <form onSubmit={ this.onSubmit } autoComplete="off">
                        <div className="form-group">
                            <label htmlFor='Username'>Username:</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                name="username"
                                value={this.state.username}
                                onChange={ this.onChange }
                                autoComplete="off"   
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor='Password'>Password:</label>
                            <input 
                                type="password" 
                                className="form-control" 
                                name="password"
                                value={ this.state.password } 
                                onChange={ this.onChange }
                                autoComplete="off"
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">Login</button>
                    </form>
                </div>
            </div>
        )
    }
}