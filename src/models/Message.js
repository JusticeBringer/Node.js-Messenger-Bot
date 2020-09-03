const mongoose = require("mongoose");

const MessageSchema = mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true,
        validate: {
            validator : Number.isInteger,
            message : '{Value} is not integer value'
        }
    },
    text: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Messages", MessageSchema);