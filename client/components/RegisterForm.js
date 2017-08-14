import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Message, Button } from 'semantic-ui-react';
import validateInput from './../../server/shared/validations/signup';
import { withRouter } from 'react-router-dom';

class RegisterForm extends Component {
    constructor() {
        super();
        this.state = {
            username: '',
            password: '',
            passwordConfirmation: '',
            email: '',
            errors: {},
            isLoding: false,
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }
    isValid() {
        const { errors, isValid } = validateInput(this.state);
        if(!isValid){
            this.setState({ errors })
        }
        return isValid;
    }
    onSubmit() {
        if(this.isValid()){
            this.setState({ errors: {}, isLoding:true })
            this.props.userSignupRequest(this.state).then(
                () => {
                    this.props.addFlashMessage({
                        type: 'success',
                        title: 'Bienvenido!',
                        message: 'Tu registro ha sido satisfactorio.'
                    })
                    this.props.history.push('/');
                },
            ).catch(
                ({ response }) => this.setState({ errors: response.data, isLoding:false })
            );
        }
    }
    render() {
        const { errors } = this.state;
        return (
            <Form onSubmit={this.onSubmit} size='tiny' error loading={this.state.isLoding}>
                <Form.Field>
                    <Form.Input 
                        label='Username:' 
                        name='username'
                        value={this.state.username}
                        onChange={ this.onChange }
                    />
                    {errors.username && <Message error header='Mensaje de Error:' content={errors.username} />}
                </Form.Field>
                <Form.Field>
                    <Form.Input
                        label='Password:' 
                        name='password'
                        type='password'
                        value={ this.state.password } 
                        onChange={ this.onChange }
                    />
                    {errors.password && <Message error header='Mensaje de Error:' content={errors.password} />}
                </Form.Field>
                <Form.Field>
                    <Form.Input 
                        label='Password Confirmation:' 
                        name="passwordConfirmation"
                        type='password'
                        value={ this.state.passwordConfirmation } 
                        onChange={ this.onChange }
                    />
                    {errors.passwordConfirmation && <Message error header='Mensaje de Error:' content={errors.passwordConfirmation} />}
                </Form.Field>
                <Form.Field>
                    <Form.Input 
                        label='Email:'
                        name="email"
                        type='email'
                        value={ this.state.email } 
                        onChange={ this.onChange }
                    />
                    {errors.email && <Message error header='Mensaje de Error:' content={errors.email} />}
                </Form.Field>
                <Button type='submit' secondary>Sign up</Button>
            </Form>
        )
    }
}

RegisterForm.proptypes = {
    userSignupRequest: PropTypes.func.isRequired,
    addFlashMessage: PropTypes.func.isRequired,
}

export default withRouter(RegisterForm);
