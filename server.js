const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

// -- ROUTES -- //
app.get("/", (req, res) => {
    console.log("Hit Landing Page");
    res.send("Welcome ...");
})

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});