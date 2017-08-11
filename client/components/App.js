import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import NavigationBar from './NavigationBar';

import Home from './Home';
import Login from './Login';
import Register from './Register';

export default class App extends Component {
    render() {
        return (
            <div className='container'>
                <NavigationBar />
                <div>
                    <Switch>
                        <Route exact path='/' component={Home} />
                        <Route exact path='/login' component={Login} />
                        <Route exact path='/register' component={Register} />
                    </Switch>
                </div>
            </div>
        )
    }
}
