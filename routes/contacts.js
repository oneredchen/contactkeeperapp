// Defining the request that can be handled by Contacts API
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');
const User = require('../models/Users');
const Contact = require('../models/Contacts');

// @route    POST api/contacts
// @desc     Get all user's contacts
// @access   Private
router.get('/', auth, async (req,res)=>{
    try {
        // Retrieve contacts associated with a specific user (identified via the user.id)
        // The results is then sorted in most recent order.
        const contacts = await Contact.find({user: req.user.id}).sort({data:-1});
        return res.json(contacts);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route    POST api/contacts
// @desc     Add new contacts for user
// @access   Private
router.post('/', 
    [
        auth, 
        check('name', 'Name is required').notEmpty()
    ],
    async(req,res)=>{
        const errors = validationResult(req);
        if (!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()});
        }

        const {name,email,phone,type} = req.body;

        try {
            const newContact = new Contact({
                name,
                email,
                phone,
                type,
                user: req.user.id //accessible due to the decoded JWT token
            });
            
            const contact = await newContact.save();

            res.json(contact);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
);

// @route    PUT api/contacts/:id
// @desc     Update a contact for user
// @access   Private
router.put('/:id', auth, async (req,res)=>{
    const {name, email, phone, type} = req.body;
    
    // Build a contact object
    const contactField = {};
    
    // Update the respective fields if it exists
    if (name) contactField.name = name;
    if (email) contactField.email = email;
    if (phone) contactField.phone = phone;
    if (type) contactField.type = type;

    try {
        // Finding the contact by ID
        let contact = await Contact.findById(req.params.id);

        if (!contact){
            return res.status(404).json({msg: 'Contact Not Found'});
        }

        //Make sure user owns the contact
        if (contact.user.toString() !== req.user.id){
            return res.status(401).json({msg: 'Unauthorized User'});
        }

        // Find the contact by the ID. If it exists, update it according to contactField
        // Else, create the contact in the DB
        contact = await Contact.findByIdAndUpdate(req.params.id,
            {$set: contactField},
            {new: true}
        );
        res.json(contact);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }

});

// @route    DELETE api/contacts/:id
// @desc     Delete a contact for user
// @access   Private
router.delete('/:id', auth, async (req,res)=>{
    try {
        // Finding the contact by ID
        let contact = await Contact.findById(req.params.id);

        if (!contact){
            return res.status(404).json({msg: 'Contact Not Found'});
        }

        //Make sure user owns the contact
        if (contact.user.toString() !== req.user.id){
            return res.status(401).json({msg: 'Unauthorized User'});
        }

        // Find the contact by the ID and delete it 
        await Contact.findByIdAndRemove(req.params.id);

        res.json({msg: 'Contact has been removed'});
        
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});
// exporting the router
module.exports = router;