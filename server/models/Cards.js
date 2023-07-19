const { Schema } = require('mongoose');

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


module.exports = cardSchema;