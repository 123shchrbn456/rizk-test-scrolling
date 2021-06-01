const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    surname: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    postCode: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    dayBirth: {
        type: String,
        required: true,
    },
    monthBirth: {
        type: String,
        required: true,
    },
    yearBirth: {
        type: String,
        required: true,
    },
    sex: {
        type: String,
        required: true,
    },
    terms_and_conditions: {
        type: String,
        required: true,
    },
    privacy_and_cookie: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("User", UserSchema);
