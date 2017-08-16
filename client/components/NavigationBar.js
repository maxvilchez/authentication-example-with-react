import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from './../actions/authActions';

class NavigationBar extends Component {
    constructor(){
        super();
        this.logout = this.logout.bind(this);
    }
    logout() {
        this.props.logout();
    }
    render() {
        const { isAuthorization } = this.props.auth;
        const userLinks = (
            <Menu.Menu position='right'>
                <Menu.Item onClick={this.logout}>Cerrar Sesión</Menu.Item>
            </Menu.Menu>
        );
        const guestLinks = (
            <Menu.Menu position='right'>
                <Link className="item" to='/register'>Regístrate</Link>
                <Link className="item" to='/login'>Iniciar Sesión</Link>
            </Menu.Menu>
        )
        return (
            <Menu fixed='top'>
                <Link className="item header" to='/'>Our Company</Link>
                { isAuthorization ?  userLinks : guestLinks }
            </Menu>
        );
    }
}

NavigationBar.proptypes = {
    auth: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
} 

export default connect(mapStateToProps, {logout})(NavigationBar);
