import validator from 'validator';
import _ from 'lodash';

export default function validateInput(data) {
    let errors = {};

    if(validator.isEmpty(data.username)){
        errors.username = 'UserName is required.'
    }
    if(validator.isEmpty(data.password)){
        errors.password = 'Password is required.'
    }
    if(validator.isEmpty(data.passwordConfirmation)){
        errors.passwordConfirmation = 'passwordConfirmation is required.'
    }
    if(!validator.equals(data.password, data.passwordConfirmation)){
        errors.passwordConfirmation = 'Passwords must match.'
    }
    if(validator.isEmpty(data.email)){
        errors.email = 'Email is required.'
    }
    if(!validator.isEmail(data.email)){
        errors.email = 'Email is invalid.'
    }

    return {
        errors,
        isValid: _.isEmpty(errors)
    }
}