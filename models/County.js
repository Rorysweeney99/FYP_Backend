const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CountySchema = new Schema ({
    name: String,
    city: String,
});

const County = mongoose.model('County', CountySchema);

module.exports = County;