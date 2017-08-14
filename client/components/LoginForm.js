import React, { Component } from 'react';
import { Form, Message, Button } from 'semantic-ui-react';
import validateInputLogin from './../../server/shared/validations/login';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

class LoginForm extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
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
        const { errors, isValid } = validateInputLogin(this.state);
        if(!isValid){
            this.setState({ errors });
        }
        return isValid;
    }
    onSubmit() {
        if( this.isValid() ){
            this.setState({ errors: {}, isLoding: true });
            this.props.login(this.state).then(
                () => { this.props.history.push('/'); },
            ).catch(
                ({response}) => {
                    this.setState({ errors: response.data.errors, isLoding:false })
                }
            );
        }
    }
    render() {
        const { errors, isLoding, email, password } = this.state;
        return (
            <div>
                {errors.form && <Message negative>{errors.form}</Message>}
                <Form onSubmit={this.onSubmit} size='tiny' error loading={isLoding}>
                    <Form.Field>
                        <Form.Input
                            label='Email:'
                            name="email"
                            type='email'
                            value={ email } 
                            onChange={ this.onChange }
                        />
                        {errors.email && <Message error header='Mensaje de Error:' content={errors.email} />}
                    </Form.Field>
                    <Form.Field>
                        <Form.Input
                            label='Contraseña:'
                            name='password'
                            type='password'
                            value={ password }
                            onChange={ this.onChange }
                        />
                        {errors.password && <Message error header='Mensaje de Error:' content={errors.password} />}
                    </Form.Field>
                    <Button type='submit' secondary>Iniciar Sesión</Button>
                </Form>
            </div>
        )
    }
}

LoginForm.proptypes = {
    login: PropTypes.func.isRequired,
};

export default withRouter(LoginForm);
