import React from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';

const NavigationBar = () => (
    <Menu fixed='top'>
        <Link className="item header" to='/'>Our Company</Link>
        <Menu.Menu position='right'>
            <Link className="item" to='/register'>Sign up</Link>
            <Link className="item" to='/login'>Login</Link>
        </Menu.Menu>
    </Menu>
);

export default NavigationBar;
