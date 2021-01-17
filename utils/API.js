// Configure Pexels API
const pexels = require('pexels');
const client = pexels.createClient(process.env.API_KEY);

module.exports = client.photos;