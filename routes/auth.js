//Defining the request that can be handled by AUTH API
const express = require('express');
const router = express.Router();

//@route    GET api/auth
//@desc     Get log in user data
//@access   Private 
router.get('/', (req,res)=>{
    res.send('Login user');
});

//@route    POST api/auth
//@desc     Authenticate user & get token
//@access   Public
router.post('/', (req,res)=>{
    res.send('Authenticate user');
});

//exporting the router
module.exports = router;