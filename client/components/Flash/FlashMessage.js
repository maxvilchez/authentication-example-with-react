import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Message } from 'semantic-ui-react';

class FlashMessage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visibleMessage: true,
        };
        this.handleDismiss = this.handleDismiss.bind(this);
    }
    handleDismiss() {
        this.props.deleteFlashMessage(this.props.message.id);
        this.setState({
            visibleMessage: false,
        })
    }
    render() {
        const { id, type, title, message } = this.props.message
        return (
            <Message  
                className={type} 
                onDismiss={this.handleDismiss} 
                header={title} 
                content={message}
                visible={this.state.visibleMessage}
            />
        )
    }
}

FlashMessage.proptypes = {
    message: PropTypes.object.isRequired,
    deleteFlashMessage: PropTypes.func.isRequired,
}


export default FlashMessage;