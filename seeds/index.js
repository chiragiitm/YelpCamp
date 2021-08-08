const express = require('express');
const mongoose = require('mongoose');
const cities = require('./cities');
const {descriptors, places} = require('./seedHelpers')
const Campground = require('../models/campground');


mongoose.connect('mongodb://localhost:27017/yelp-camp',{
    useNewUrlParser : true,
    useCreateIndex : true,
    useUnifiedTopology : true 
})

const db = mongoose.connection;
db.on('error', console.error.bind(console, "Connection Error:"));
db.once("open", () => {
    console.log("Database Connected");
})

const sample = arr => arr[Math.floor(Math.random() * arr.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for(let i = 0; i < 30; ++i) {
        const rand1000 = Math.floor(Math.random()*1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '6103a3e2d8cb0023988d2131',
            location : `${cities[rand1000].city}, ${cities[rand1000].state}`,
            title : `${sample(descriptors)} ${sample(places)}`,
            image: "https://source.unsplash.com/collection/483251",
            description : "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptate at officiis natus officia itaque nihil iste, magni sapiente! Ullam nam assumenda commodi, maxime atque libero praesentium minima? Porro, blanditiis consectetur!",
            price: price
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})