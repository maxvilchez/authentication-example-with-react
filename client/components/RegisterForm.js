import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Message, Button, Input } from 'semantic-ui-react';
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
        this.checkUserExists = this.checkUserExists.bind(this);
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
    checkUserExists(e) {
        const field = e.target.name;
        const value = e.target.value;
        if( value !== '') {
            this.props.isUserExists(value).then( res => {
                let errors = this.state.errors;
                if(res.data.user){
                    if(field === 'username'){
                        errors[field] = 'Ya existe un usuario con el mismo nombre de usuario.';
                    }else{
                        errors[field] = 'Ya existe un usuario con el mismo email.';
                    }
                }else {
                    errors[field] = '';
                }
                this.setState({ errors })
            })
        }
        
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
                    <label htmlFor='Nombre de usuario'>Nombre de usuario:</label>
                    <Input 
                        name='username'
                        value={this.state.username}
                        onChange={ this.onChange }
                        onBlur={ this.checkUserExists }
                    />
                    {errors.username && <Message error header='Mensaje de Error:' content={errors.username} />}
                </Form.Field>
                <Form.Field>
                    <label htmlFor='Contraseña'>Contraseña:</label>
                    <Input
                        name='password'
                        type='password'
                        value={ this.state.password } 
                        onChange={ this.onChange }
                    />
                    {errors.password && <Message error header='Mensaje de Error:' content={errors.password} />}
                </Form.Field>
                <Form.Field>
                    <label htmlFor='Confirmar Contraseña'>Confirmar Contraseña:</label>
                    <Input
                        name="passwordConfirmation"
                        type='password'
                        value={ this.state.passwordConfirmation } 
                        onChange={ this.onChange }
                    />
                    {errors.passwordConfirmation && <Message error header='Mensaje de Error:' content={errors.passwordConfirmation} />}
                </Form.Field>
                <Form.Field>
                    <label htmlFor='Email'>Email:</label>
                    <Input
                        name="email"
                        type='email'
                        value={ this.state.email } 
                        onChange={ this.onChange }
                        onBlur={ this.checkUserExists }
                    />
                    {errors.email && <Message error header='Mensaje de Error:' content={errors.email} />}
                </Form.Field>
                <Button type='submit' secondary>Registrarse</Button>
            </Form>
        )
    }
}

RegisterForm.proptypes = {
    userSignupRequest: PropTypes.func.isRequired,
    addFlashMessage: PropTypes.func.isRequired,
    isUserExists: PropTypes.func.isRequired,
}

export default withRouter(RegisterForm);
