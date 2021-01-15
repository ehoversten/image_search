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



// -- ROUTES -- //
app.get('/', (req, res) => {
    console.log("Hit Landing Page");
    res.render("index", {});
});


app.get('/api', (req, res) => {
    const query = 'Nature';
    client.photos.search({ query, per_page: 5 })
        .then(data => {
            console.log(data) 
            let photos = data.photos;
            console.log(photos[0]);
            // console.log(photos[0].url);
            // console.log(photos[0].photographer);
            // console.log(photos[0].src);
            // res.json(photos);
            res.render('index', { allImages: photos })
        });
})

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});




