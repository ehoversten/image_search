const express = require("express");
const exphbs = require("express-handlebars");
require("dotenv").config();

// const API = require("./utils");

// Configure Pexels API
const pexels = require('pexels');
const client = pexels.createClient(process.env.API_KEY);


const app = express();
const PORT = process.env.PORT || 3000;

// -- MIDDLEWARE --//
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static('assets'));

// Setup Template Engine
app.engine('handlebars', exphbs({ defaultLayout: "main" }));
app.set('view engine', 'handlebars');

// -- TEMP DATA SET -- //
let dataSet = [];

// -- ROUTES -- //
app.get('/', (req, res) => {
    console.log("Hit Landing Page");
    res.render("index", {});
});


app.get('/api', (req, res) => {
    // -- TESTING -- //
    console.log("*******");
    console.log(dataSet);

    res.render('index', { allImages: dataSet });
});

app.post('/api', (req, res) => {

    // Store query string
    let query = req.body.search;
    console.log(query);
    // Make API request
    client.photos.search({ query, per_page: 5 })
        .then(data => {
            let photos_data = data.photos;
            console.log(photos_data);
            dataSet = photos_data;
            res.redirect('/api');
        }).catch(err => {
            console.log(err);
        });
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});




