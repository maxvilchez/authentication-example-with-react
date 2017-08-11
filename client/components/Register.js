import React, { Component } from 'react';
import RegisterForm from './RegisterForm';
import { connect } from 'react-redux';
import { userSignupRequest } from './../actions/signupActions';
import { Grid, Header } from 'semantic-ui-react';

class Register extends Component {
    render() {
        const { userSignupRequest } = this.props;
        return (
            <Grid container centered>
                <Grid.Column mobile={16} tablet={8} computer={4}>
                    <div style={{ marginTop: '61px'}}>
                        <Header as='h2' textAlign='center'>Sign up</Header>
                        <RegisterForm userSignupRequest={userSignupRequest} />
                    </div>
                </Grid.Column>
            </Grid> 
        )
    }
}

const mapStateToProps = state => {
    return {}
}

export default connect(mapStateToProps, {userSignupRequest})(Register);