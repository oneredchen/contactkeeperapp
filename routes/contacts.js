//Defining the request that can be handled by Contacts API
const express = require('express');
const router = express.Router();

//@route    POST api/contacts
//@desc     Get all user's contacts
//@access   Private
router.get('/', (req,res)=>{
    res.send('Get all contacts');
});

//@route    POST api/contacts
//@desc     Add new contacts for user
//@access   Private
router.post('/', (req,res)=>{
    res.send('Create new contact');
});

//@route    PUT api/contacts/:id
//@desc     Update a contact for user
//@access   Private
router.put('/:id', (req,res)=>{
    res.send('Update contact');
});

//@route    DELETE api/contacts/:id
//@desc     Delete a contact for user
//@access   Private
router.delete('/:id', (req,res)=>{
    res.send('Delete contact');
});
//exporting the router
module.exports = router;