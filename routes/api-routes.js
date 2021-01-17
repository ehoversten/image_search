const express = require('express');
const router = express.Router();
// Requiring our models
var db = require("../models");
const API = require("../utils/API");

// -- Array to load API images-- //
const dataSet = [];

// -- ROUTES -- //
router.get('/', (req, res) => {
    res.render('index', { allImages: dataSet });
});

router.post('/', (req, res) => {
    // Empty data array
    dataSet.splice(0);

    // Store query string
    let query = req.body.search;
    // Make API request
    API.search({ query, per_page: 36 })
        .then(data => {
            let photos_data = data.photos;
            // Load data set
            photos_data.map(elem => dataSet.push(elem));
            res.redirect('/api');
        }).catch(err => {
            console.log(err);
        });
});

router.get('/favorites', (req, res) => {
    let favorites = [];

    db.Favorite.findAll()
        .then(data => {
            data.map(elem => favorites.push(elem.dataValues));
            res.render('favorites', { allFavorites: favorites });
        })
        .catch(err => {
            console.log(err);
        });
});

router.post('/favorite', (req, res) => {

    let newFavorite = {
        photographer: req.body.photographer,
        photographer_url: req.body.photographer_url,
        photo_url: req.body.photo_url
    }
    // Save Object to DB
    db.Favorite.create(newFavorite)
        .then(favorite => {
            console.log("Saved new image to favorites");
        })
        .catch(err => {
            console.log(err);
        });
});

router.post('/remove', (req, res) => {
    console.log(req.body.photo_id);
    let photo_id = req.body.photo_id
    db.Favorite.destroy({ where: { id: photo_id }})
        .then(data => {
            res.redirect("/favorites");
        })
        .catch(err => {
            console.log(err);
        });
});

module.exports = router;
