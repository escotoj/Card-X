const { Schema, model } = require('mongoose');

const cardSchema = new Schema ({
    title: {
        type: String, 
        require: true,
        trim: true,
    },
    details: {
        type: String,
        require: true,
        trim: true,
    },
    date: {
        type: Date,
    },
    cardAuthor: {
        type: String,
        required: true,
        trim: true,
    },
});

const Card = model("Card", cardSchema);
module.exports = Card;