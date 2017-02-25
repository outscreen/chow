const crypto = require('crypto');
const secret = process.env.crypto;

const hash = (string) => crypto.createHmac('sha256', secret)
    .update(string)
    .digest('hex');

module.exports = hash;