import validator from 'validator';
import _ from 'lodash';

export default function validateInputLogin(data) {
    let errors = {};

    if(validator.isEmpty(data.email)){
        errors.email = 'El email es requerido.'
    }
    if(!validator.isEmail(data.email)){
        errors.email = 'El email es invalido.'
    }
    if(validator.isEmpty(data.password)){
        errors.password = 'La contraseña es requerido.'
    }

    return {
        errors,
        isValid: _.isEmpty(errors)
    };
}