const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator/check');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { findOne, emit } = require( '../models/User' );
const { json } = require( 'express' );
const User = require( '../models/User' );
const auth = require( '../middleware/auth' );


require('dotenv').config();
const jwtSecret = process.env.jwtSecret;

//@route        GET api/auth
//@desc         Get logged in user
//@access       Private

router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);    
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

//@route        POST api/auth
//@desc         Auth user and get token
//@access       Public

router.post('/',[check('email', 'Please enter a valid email').isEmail(), check('password', 'Please enter a valid password').exists().isLength({min:8})] , async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({
            errors: errors.array()
        });
    }

    const {email, password} = req.body;

    try {
        let user = await User.findOne({email});

        if(!user){
            res.status(400).json({msg:'Invalid credentials'});
        };

        let isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            res.status(400).json({msg:'Invalid credentials'});
        }

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
        res.status(500).send('Server Error');
    }
});

module.exports = router;