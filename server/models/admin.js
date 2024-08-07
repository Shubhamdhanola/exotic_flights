const mongoose = require('mongoose')

const Schema = mongoose.Schema

const adminSchema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    phone: {type: Number, required: true},
    token: {type: String}
})

module.exports = mongoose.model("Admin", adminSchema);