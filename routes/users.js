const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator/check');
const { mongoose } = require( 'mongoose' );
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

require('dotenv').config();
const jwtSecret = process.env.jwtSecret;

//@route        POST  api/users
//@desc         Register users
//@access       Public

router.post('/', [
    check('name', 'Please enter a name').not().isEmpty(),
    check('email', 'Please enter a valid mail').isEmail(),
    check('password', 'Please enter a valid password, min 8 chars').isLength({ min: 8})
], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({
            errors: errors.array()
        });
    }

    const {name, email, password} = req.body;

    try {
        let user = await User.findOne({ email });
        
        if(user){
            return res.status(400).json({ msg: 'User already exists'})
        }

        user = new User({
            name,
            email,
            password
        });

        const salt = await bcrypt.genSalt(10);

        user.password = await bcrypt.hash(password, salt);

        user.save();

        const payload = {
            user:{
                id:user.id
            }
        }

        jwt.sign(payload, jwtSecret, {
            expiresIn: 360000
        }, (err, token) => {
            if (err) throw err;
            res.json({token});
        });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
    

    
});

module.exports = router;