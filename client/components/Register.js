import React, { Component } from 'react';
import RegisterForm from './RegisterForm';
import { connect } from 'react-redux';
import { userSignupRequest } from './../actions/signupActions';
import { addFlashMessage } from './../actions/flashMessages';
import { Grid, Header } from 'semantic-ui-react';
import PropTypes from 'prop-types';

class Register extends Component {
    render() {
        const { userSignupRequest, addFlashMessage } = this.props;
        return (
            <Grid container centered>
                <Grid.Column mobile={16} tablet={8} computer={4}>
                    <div style={{ marginTop: '61px'}}>
                        <Header as='h2' textAlign='center'>Sign up</Header>
                        <RegisterForm userSignupRequest={userSignupRequest} addFlashMessage={addFlashMessage}/>
                    </div>
                </Grid.Column>
            </Grid> 
        )
    }
}

Register.proptypes = {
    userSignupRequest: PropTypes.func.isRequired,
    addFlashMessage: PropTypes.func.isRequired,
}

const mapStateToProps = state => {
    return {}
}

export default connect(mapStateToProps, {userSignupRequest, addFlashMessage})(Register);