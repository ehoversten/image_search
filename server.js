const express = require("express");
const exphbs = require("express-handlebars");
const db = require("./models");
require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 3000;
const htmlRoutes = require("./routes/html-routes");
const apiRoutes = require("./routes/api-routes");

// -- MIDDLEWARE --//
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static('assets'));

// Setup Template Engine
app.engine('handlebars', exphbs({ defaultLayout: "main" }));
app.set('view engine', 'handlebars');

// Bringing in the routes
app.use('/', htmlRoutes);
app.use('/api', apiRoutes);

// Sync the Database and start Express server
db.sequelize.sync().then(function() {
    app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`);
    });
});




