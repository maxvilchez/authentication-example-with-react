import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FlashMessage from './FlashMessage';
import { deleteFlashMessage } from './../../actions/flashMessages';

class FlashMessagesList extends Component {
    render() {
        return (
            <div>
                { this.props.messages.map(message => 
                    <FlashMessage key={message.id} message={message} deleteFlashMessage={this.props.deleteFlashMessage} />       
                )}
            </div>
        );
    }
}

FlashMessagesList.proptypes = {
    messages: PropTypes.array.isRequired,
    deleteFlashMessage: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => {
    return {
        messages: state.flashMessages
    }
}

export default connect(mapStateToProps, {deleteFlashMessage})(FlashMessagesList);
