import React, { Component } from 'react';
import LoginForm from './LoginForm';
import { Grid, Header } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { login } from './../actions/authActions';
import PropTypes from 'prop-types';

class Login extends Component {
    render() {
        const { login } = this.props;
        return (
            <Grid container centered>
                <Grid.Column mobile={16} tablet={8} computer={4}>
                    <div style={{ marginTop: '61px'}}>
                        <Header as='h2' textAlign='center'>Iniciar Sesión</Header>
                        <LoginForm login={login} />
                    </div>
                </Grid.Column>
            </Grid>
        )
    }
}

Login.proptypes = {
    login: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
    return {}
}

export default connect(mapStateToProps, {login})(Login);
