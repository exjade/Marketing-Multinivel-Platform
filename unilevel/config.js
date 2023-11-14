const { config } = require('dotenv');

config();

const DOMAIN = process.env.DOMAIN || 'http://localhost:3000';
const REQUEST = process.env.REQUEST;

module.exports = {
    DOMAIN,
    REQUEST
}