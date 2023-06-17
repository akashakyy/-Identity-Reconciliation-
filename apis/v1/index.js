const express = require('express');
const router = express.Router();

const contactCallbacks = require('./contacts/identifyContact.js');
const validateContact = require('./contacts/validateContact.js');

router.post('/identify', validateContact.validateIdentifyContactInput, contactCallbacks.identifyContacts);

module.exports = router;