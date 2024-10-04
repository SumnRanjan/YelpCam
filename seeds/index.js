const mongoose = require("mongoose");
const Campground = require("../models/campground");
const cities = require("./cities");
const { places, descriptors } = require('./seedHelpers');

mongoose.connect("mongodb://127.0.0.1:27017/yelp-camp")
  .then(() => {
    console.log("Database connected");
  })
  .catch(err => {
    console.error("Connection error:", err);
  });

const sample = array => array[Math.floor(Math.random() * array.length)]
  
const seedDB = async () =>{
    await Campground.deleteMany({})
    for(let i = 0 ; i < 50 ; i++){
        const rendom1000 = Math.floor(Math.random() * 1000)
        const camp = new Campground({
            location :  `${cities[rendom1000].city} , ${cities[rendom1000].state}`,
            title : `${sample(descriptors)} ${sample(places)}`
        })
        await camp.save()
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})