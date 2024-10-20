const mongoose = require('mongoose');

const SchemaEvent = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
})

module.exports = mongoose.model('Event', SchemaEvent);