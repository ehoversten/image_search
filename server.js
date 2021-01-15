const express = require("express");
const exphbs = require("express-handlebars");

const API = require("./utils");

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

    let data = 0;
    res.json(data);
})

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});