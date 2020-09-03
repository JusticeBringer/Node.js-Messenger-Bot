const mongoose = require("mongoose");

const MessageSchema = mongoose.Schema({
    text: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Messages", MessageSchema);