const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A tour must have a value'],
        unique: true,
    },
    price: {
        type: Number,
        required: [true, 'A string must have a value'],
    },
    rating: {
        type: Number,
        default: 4.5,
    },
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
