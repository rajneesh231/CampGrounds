import express from 'express';
import mongoose from 'mongoose';
import { homedir } from 'os';
import { Campground } from './models/campgrounds.js';
import path from 'path';
import { fileURLToPath } from 'url';
import methodOverride from 'method-override';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

mongoose.connect('mongodb://localhost:27017/yelp-camp')
    .then(() => {
        console.log("Successfully Connected to DB");
    })
    .catch((e) => {
        console.error('There was an error connecting to the Db');
    });


app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
});
app.get('/', (req, res) => {
    res.status(200).render("homepage");
});

app.get('/campgrounds', async (req, res) => {
    const data = await Campground.find({})
    res.status(200).render("./campgrounds/ind", { data });
});
app.post('/campgrounds', async (req, res) => {
    const data = req.body;
    const camp = new Campground({
        title: data.title,
        location: data.location
    });
    await camp.save();
    res.redirect(`/campgrounds/${camp._id}`);
})

app.get('/campgrounds/new', (req, res) => {
    res.render('campgrounds/newCamp');
})

app.get('/campgrounds/:id', async (req, res) => {
    const { id } = req.params;
    const data = await Campground.findById(id);
    res.status(200).render("./campgrounds/campInfo", { data });
});




app.get('/campgrounds/:id/edit', async (req, res) => {
    const { id } = req.params;
    const data = await Campground.findById(id);
    res.status(200).render("./campgrounds/edit", { data });

})

app.put('/campgrounds/:id', async (req, res) => {
    const { id } = req.params;
    const data = await Campground.findByIdAndUpdate(id, {
        title: req.body.title,
        location: req.body.location
    });
    res.redirect(`/campgrounds/${id}`);
})
app.delete('/campgrounds/:id', async (req, res) => {
    const { id } = req.params;
    const data = await Campground.findByIdAndDelete(id);
    res.redirect('/campgrounds');
})