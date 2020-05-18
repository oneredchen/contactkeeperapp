//Defining the request that can be handled by USERS API
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');


//Linking to the Users model
const User = require('../models/Users');

//@route    POST api/users
//@desc     Register a user
//@access   Public 
router.post('/',
    [
        //Check the name field to ensure a name is submitted
        check('name','Please add a name').notEmpty(),
        //Check that an email is submitted
        check('email', 'Please include a valid email.').isEmail(),
        //Check that the password used is 6 or more characters
        check('password','Please make sure password is 6 or more characters').isLength({min:6})
    ], 
    async (req,res)=>{
        const errors = validationResult(req);
        //If error is not empty, raise 400 Status Bad Request
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()});
        }
        const {name, email, password} = req.body;
    
        try {
            //search the database to see if the user exists
            let user = await User.findOne({email});
            
            //if user exists, return a 400 Status
            if(user){
                return res.status(400).json({msg: 'User already exists'});
            }
            
            //create a new User model with the data sent in the request
            user = new User({name,email,password});
            
            //Determines how secure the Salt is 
            const salt = await bcrypt.genSalt(10);

            //Hashing the Password
            user.password = await bcrypt.hash(password,salt);

            //Save the user to the database 
            await user.save();

            //User information to be sent over the token
            const payload = {
                user : {
                    id: user.id
                }
            }

            //Signing & Generating the JWT Token
            jwt.sign(payload, config.get('jwtSecret'),{
                expiresIn: 36000
            }, (err, token)=>{
                if (err) throw err;
                res.json({token});
            })

        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
);

//exporting the router
module.exports = router;