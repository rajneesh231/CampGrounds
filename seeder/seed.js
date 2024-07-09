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
        let pr= Math.floor(Math.random()*25+5);
        pr = pr>25?25:pr
        await new Campground({
            location: `${cities[rand].city}, ${cities[rand].state}`,
            title: getName(),
            image: `https://picsum.photos/400?random=${Math.random()}`,
            description:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum qui, amet error minima, fugiat vero voluptates obcaecati eos autem blanditiis sunt molestiae officia, animi nihil odio? Exercitationem sequi ipsam ipsum. Alias officiis veniam, voluptatibus architecto at magnam illo veritatis illum laborum possimus modi quisquam et, perferendis mollitia ad magni. Corrupti molestias fugit unde sit provident dolores. Praesentium necessitatibus facilis molestiae.',
            price:pr
        }).save();
    }
}
seedDB().then(() => {
    mongoose.connection.close();
});