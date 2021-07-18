const mongoose = require('mongoose');
const Campground = require('../models/campground');
const { places, descriptors } = require('./seedHelpers');
const cities = require('./cities');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
})


const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 200; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 1;
        const camp = new Campground({
            author: '60b612e522cccf29401db573',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quibusdam at esse odit in. Totam corporis necessitatibus placeat in ea natus voluptatum nostrum officia error distinctio quibusdam quod molestiae, repudiandae aperiam!',
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ]
            },
            images: [

                {

                    url: 'https://res.cloudinary.com/dewnoc5ih/image/upload/v1622701838/YelpCamp/fl0cha71ozyntthgj5hf.jpg',
                    filename: 'YelpCamp/fl0cha71ozyntthgj5hf'
                },
                {

                    url: 'https://res.cloudinary.com/dewnoc5ih/image/upload/v1622777454/YelpCamp/dbmc5yohixlrenjnfv1u.jpg',
                    filename: 'YelpCamp/dbmc5yohixlrenjnfv1u'
                }
            ]
        })
        await camp.save();
    }

}

seedDB().then(() => {
    mongoose.connection.close();
})