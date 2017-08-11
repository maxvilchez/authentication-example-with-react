import express from 'express';
import validator from 'validator';
import _ from 'lodash';

let router = express.Router();

function validateInput(data) {
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
    if(validator.equals(data.password, data.passwordConfirmation)){
        errors.passwordConfirmation = 'Passwords must match.'
    }
    if(!validator.isEmail(data.email)){
        errors.email = 'Email is invalid.'
    }
    if(validator.isEmpty(data.email)){
        errors.email = 'Email is required.'
    }

    return {
        errors,
        isValid: _.isEmpty(errors)
    }
}

router.post('/', (req, res) => {
    setTimeout(()=> {
        const { errors, isValid } = validateInput(req.body);
        if(!isValid) {
            res.status(400).json(errors);
        }
    }, 1000)
});

export default router;
