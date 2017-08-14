import express from 'express';
import validationInputLogin from './../shared/validations/login';
import bcrypt from 'bcrypt';
import _ from 'lodash';
import jwt from 'jsonwebtoken';

import config from './../config';

import User from './../models/users';

let router = express.Router();

router.post('/', (req, res) => {
    const { email, password } = req.body;
    User.query({
        where: { email: email },
    }).fetch().then(user => {
        if(user) {
            if(bcrypt.compareSync(password, user.get('password_bcrypt'))) {
                const token = jwt.sign({
                    id: user.get('id'),
                    username: user.get('username')
                }, config.jwtSecret);
                res.json({ token });
            }else{
                res.status(401).json({ errors: { form: 'Contraseña invalida.' } })
            }
        }else{
            res.status(401).json({ errors: { form: 'Credenciales invalidos.' } })
        }
    })
});

export default router;