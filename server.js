const express = require("express");
const exphbs = require("express-handlebars");
const db = require("./models");

require("dotenv").config();
const API = require("./utils/API");

const app = express();
const PORT = process.env.PORT || 3000;

// -- MIDDLEWARE --//
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static('assets'));

// Setup Template Engine
app.engine('handlebars', exphbs({ defaultLayout: "main" }));
app.set('view engine', 'handlebars');

// -- Array to load API images-- //
const dataSet = [];

// -- ROUTES -- //
app.get('/', (req, res) => {
    console.log("Hit Landing Page");
    res.render("index", {});
});

app.get('/api', (req, res) => {
    // -- TESTING -- //
    console.log("*******");
    // console.log(dataSet);

    res.render('index', { allImages: dataSet });
});

app.post('/api', (req, res) => {
    // Empty data array
    dataSet.splice(0);

    // Store query string
    let query = req.body.search;
    // Make API request
    API.search({ query, per_page: 5 })
        .then(data => {
            let photos_data = data.photos;
            // console.log(photos_data);

            // Load data set
            photos_data.map(elem => dataSet.push(elem));
            res.redirect('/api');
        }).catch(err => {
            console.log(err);
        });
});

app.get('/favorites', (req, res) => {
    let favorites = [];

    db.Favorite.findAll()
        .then(data => {
            data.map(elem => favorites.push(elem.dataValues));
            // console.log(favorites);
            res.render('favorites', { allFavorites: favorites });
        })
        .catch(err => {
            console.log(err);
        });
});

app.post('/favorite', (req, res) => {

    let newFavorite = {
        photographer: req.body.photographer,
        photographer_url: req.body.photographer_url,
        photo_url: req.body.photo_url
    }
    // Save Object to DB
    db.Favorite.create(newFavorite)
        .then(favorite => {
            // console.log(favorite);
            console.log("Saved new image to favorites");
        })
        .catch(err => {
            console.log(err);
        });
});

app.post('/remove', (req, res) => {
    console.log(req.body.photo_id);
    let photo_id = req.body.photo_id
    db.Favorite.destroy({ where: { id: photo_id }})
        .then(data => {
            // console.log(data);
            res.redirect("/favorites");
        })
        .catch(err => {
            console.log(err);
        });
});


// Sync the Database and start Express server
db.sequelize.sync().then(function() {
    app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`);
    });
});




