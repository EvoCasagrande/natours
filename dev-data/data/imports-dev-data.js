const fs = require('fs');
const Tour = require('./../../models/tourModel');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });


mongoose
    .connect(process.env.DATABASE, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
    })
    .then(() => console.log('DB connection successful!'))
    .catch((err) => console.log('DB connection error:', err.message));


const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8'));

const importData = async () => {
    try {
        await Tour.create(tours);
        console.log('Data imported successfully!');
    } catch (err) {
        console.log('Error importing data:', err.message);
    }
    process.exit();
}

const deleteData = async () => {
    try {
        await Tour.deleteMany();
        console.log('Data deleted successfully!');
    } catch (err) {
        console.log('Error deleting data:', err.message);
    }
    process.exit();
}

if(process.argv[2] === '--import') {
    importData();
} else if(process.argv[2] === '--delete') {
    deleteData();
}