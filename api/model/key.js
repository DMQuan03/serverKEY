const mongoose = require("mongoose")

let keySchema = new mongoose.Schema({
    social: {
        type: String,
    },
    key_name: {
        type: String,
        required: true,
        unique: true
    },
    expried: {
        type: Date,
        required: true
    },
    isLock: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })

module.exports = mongoose.model('keys', keySchema)