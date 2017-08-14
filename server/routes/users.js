import express from 'express';
import validateInput from './../shared/validations/signup';
import bcrypt from 'bcrypt';

import User from './../models/users';

let router = express.Router();

router.post('/', (req, res) => {
    const { errors, isValid } = validateInput(req.body);
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

export default router;
