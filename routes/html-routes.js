const express = require('express');
const { builtinModules } = require('module');
const router = express.Router();

// -- ROUTES -- //
router.get('/', (req, res) => {
    // console.log("Hit Landing Page");
    res.render("index");
});

module.exports = router;