const Tour = require('../models/tourModel');

exports.getAllTours = async (request, response) => {
    const tours = await Tour.find();

    try {
        response.status(200).json({
            status: 'success',
            results: tours.length,
            data: {
                tours: tours,
            },
        });
    } catch (err) {
        response.status(400).json({
            status: 'fail',
            message: 'Invalid request',
        });
    }
};

exports.getTour = async (request, response) => {
    try {
        const tour = await Tour.findById(request.params.id);

        response.status(200).json({
            status: 'success',
            data: {
                tour: tour,
            },
        });
    } catch (err) {
        response.status();
    }
};

exports.createTour = async (request, response) => {
    try {
        const newTour = await Tour.create(request.body);
        response.status(201).json({
            status: 'success',
            data: {
                tour: newTour,
            },
        });
    } catch (err) {
        response.status(404).json({
            status: 'fail',
            message: 'Invalid data sent!',
        });
    }
};
