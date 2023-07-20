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
    picture: {
        data: Buffer,
        contentType: String,
    }
    
});

const Card = model('Card', cardSchema);
module.exports = Card;