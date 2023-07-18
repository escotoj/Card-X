const { Schema } = require('mongoose');

const cardSchema = new Schema ({
    title: {
        type: String, 
        require: true,
        trim: true,
    },
    detail: {
        type: String,
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