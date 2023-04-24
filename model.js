const mongoose = require('mongoose');

let Registerusers = new mongoose.Schema({
    id: {
        type: Number,
        require: true,
    },
    fast_name: {
        type: String,
        require: true,
    },
    last_name: {
        type: String,
        require: true,
    },
    email: {
        type : String,
        require: true,
        unique: true,
    },
    gender: {
        type: String,
        require: true,
    },
    income: {
        type: String,
        require: true,
    },
    city: {
        type: String,
        require: true,
    },
    car: {
        type: String,
        require: true,
    },
    quote: {
        type: String,
        require: true,
    },
    phone_price: {
        type: String,
        require: true,
    }
});

module.exports=mongoose.model("registerusers",Registerusers)