const express = require("express");
const router = express.Router();

router.get('/', (req, res) => {
    res.json({ name: "Chris" });
});

router.get('/oauth', (req, res) => {
    res.json({ oauth: "miuvyfz3bolyddzwdmxywjmqsw2na1" });
});

module.exports = router;
