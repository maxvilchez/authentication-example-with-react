import React, { Component } from 'react';
import { Segment } from 'semantic-ui-react';
import FlashMessagesList from './Flash/FlashMessagesList';

import './../css/Home.css';

class Home extends Component {
    render() {
        return (
            <div className="home-container">
                <Segment basic>
                    <FlashMessagesList />
                </Segment>
            </div>
        )
    }
}

export default Home;
