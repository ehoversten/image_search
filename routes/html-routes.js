const express = require('express');
const { builtinModules } = require('module');
const router = express.Router();

// -- ROUTES -- //
router.get('/', (req, res) => {
    res.render("index");
});

module.exports = router;