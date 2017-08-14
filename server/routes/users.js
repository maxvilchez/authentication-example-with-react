import express from 'express';
import validateInput from './../shared/validations/signup';
import bcrypt from 'bcrypt';
import _ from 'lodash'

import User from './../models/users';

let router = express.Router();

function validateUnique(data, otherValidations) {
    let { errors } = otherValidations(data);
    return User.query({ 
        where: { email: data.email },
        orWhere: { username: data.username }
    }).fetch().then( user => {
        if(user){
            if(user.get('username') === data.username) {
                errors.username = 'Ya existe un usuario con el mismo nombre de usuario.'
            }
            if(user.get('email') === data.email){
                errors.email = 'Ya existe un usuario con el mismo email.'
            }
        }
        return {
            errors,
            isValid: _.isEmpty(errors)
        }
    })
}

router.post('/', (req, res) => {
    validateUnique(req.body, validateInput).then(({ errors, isValid }) => {
        if(isValid) {
            const { username, password, email } = req.body;
            const password_bcrypt = bcrypt.hashSync(password, 10);
    
            User.forge({
                username, password_bcrypt, email
            }, { hasTimestamps: true }).save()
                .then( user => res.json({ success: true }) )
                .catch( err => res.status(500).json({ error: err }) )
    
        }else{
            res.status(400).json(errors);
        }
    });
});

export default router;
