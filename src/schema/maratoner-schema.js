const PointSchema = require('./point-schema');
const mongoose = require('mongoose');

const maratonerSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    name:  {
        type: String,
        required: true,
    },
    photo: String,
    bio: String,
    series: [String],
    location: {
        type: PointSchema,
        index: '2dsphere'
    },
});

module.exports = mongoose.model('Maratoner', maratonerSchema);