import mongoose from 'mongoose';
import { Campground } from '../models/campgrounds.js';
import { cities } from './cities.js';
import { places, descriptors } from './seedHelpers.js';

mongoose.connect('mongodb://localhost:27017/yelp-camp')
    .then(() => {
        console.log("Successfully Connected to DB");
    })
    .catch((e) => {
        console.error('There was an error connecting to the Db');
    });
const getName = () => {
    return `${descriptors[Math.floor(Math.random() * descriptors.length)]} ${places[Math.floor(Math.random() * places.length)]}`
}
const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const rand = Math.floor(Math.random() * 1000);
        await new Campground({
            location: `${cities[rand].city}, ${cities[rand].state}`,
            title: getName(),
        }).save();
    }
}
seedDB().then(() => {
    mongoose.connection.close();
});