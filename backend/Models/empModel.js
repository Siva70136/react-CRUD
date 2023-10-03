const mongoose = require('mongoose');

const empSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    salary: {
        type: Number,
        required: true
    },
    designation: {
        type: String,
        required: true
    }

}, { timestamps: true }

)

module.exports = mongoose.model("Employ", empSchema);
