//Defining the request that can be handled by AUTH API
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

//Linking to the Users model
const User = require('../models/Users');

//@route    GET api/auth
//@desc     Get log in user data
//@access   Private 
router.get('/', auth, async (req,res)=>{
    try {
        // Using the decoded data from the JWT, the user id is used to retrieve
        // the corresponding user data from the DB
        const user = await User.findById(req.user.id).select('-password');
        res.json(user)
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Sever Error');
    }
});

//@route    POST api/auth
//@desc     Authenticate user & get token
//@access   Public
router.post('/',
    [
        check('email','Please provide a valid email').isEmail(),
        check('password', 'Please enter a password').exists()
    ],
    async (req,res) =>{
        //For error checking 
        const errors = validationResult(req);
        //If error is not empty, return a 400 Bad Response
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()});
        }

        const {email, password} = req.body;

        try {
            let user = await User.findOne({email});

            //if user doesn't exist, raise a 400 Bad Response
            if(!user){
                res.status(400).json({msg: "Invalid Credentials"});
            }

            //To compare the provided password is equal to the password in DB
            const isMatch = await bcrypt.compare(password, user.password);

            //If the password don't match, raise a 400 Bad Response 
            if(!isMatch){
                return res.status(400).json({msg:'Invalid Credentials'});
            }

            const payload = {
                user:{
                    id: user.id
                }
            };

            //Generate a log in token for the user
            jwt.sign(
                payload,
                config.get('jwtSecret'),
                {
                    expiresIn:36000
                },
                (err, token) =>{
                    if (err) throw err;
                    res.json({token});
                }
            );

        } catch (err) {
            console.error(err.message)
            res.status(500).send('Server Error');
        }
    }
);

//exporting the router
module.exports = router;