<<<<<<< HEAD
const express = require('express');

const router = express.Router();
const { getDb } = require('../db.js');

router.get('/', (req, res) => {
    res.json({ name: 'Chris' });
});

router.get('/oauth', (req, res) => {
    const db = getDb();
    db.collection('Streamers').find({ }).toArray( (err, result) => {
        console.log(result);
    });
    res.json({ oauth: 'miuvyfz3bolyddzwdmxywjmqsw2na1' });
=======
const express = require("express");
const router = express.Router();

router.get('/', (req, res) => {
    res.json({ name: "Chris" });
});

router.get('/oauth', (req, res) => {
    res.json({ oauth: "miuvyfz3bolyddzwdmxywjmqsw2na1" });
>>>>>>> 2af8af657a41031cd27b9e5212e85b1953db85ea
});

module.exports = router;
