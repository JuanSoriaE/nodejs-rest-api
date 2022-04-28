const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    price: {
        type: Number,
        default: 0
    },
    image: {
        public_id: String,
        url: String
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('product', productSchema);