import mongoose from 'mongoose';
const schema = mongoose.Schema;

const campgroundSchema = schema({
    title: String,
    price: Number,
    description: String,
    location: String,
    image:String
})
const Campground = mongoose.model('Campground', campgroundSchema);
export { Campground };