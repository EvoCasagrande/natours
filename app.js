const express = require('express');
const morgan = require('morgan');

const globalErrorController = require('./controllers/errorController');
const AppError = require('./utils/appError');
const tourRouter = require('./routes/tourRoutes');

const app = express();

//1) MIDDLEWARES
app.use(express.json());
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}
app.use(express.static('public'));

//2) RUTAS
app.use('/api/v1/tours', tourRouter);

app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorController);

module.exports = app;
