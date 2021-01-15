const express = require("express");
const exphbs = require("express-handlebars");

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

// -- TEMP DATA SET -- Database coming ... //
const dataSet = [];

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

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});




