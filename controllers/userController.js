const User = require('../models/userModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

const filterObj = (obj, ...allowedFields) => {
    Object.keys(obj).forEach(el => {
        if (allowedFields.includes(el));
    });
}

exports.getAllUsers = catchAsync(async (req, res, next) => {
    const users = await User.find();

    res.status(200).json({
        status: 'success',
        results: users.length,
        data: {
            users,
        },
    });
});

exports.updateMe = catchAsync(async (req, res, next) => {
    //1) Create error if user POSTs password data
    console.log(req.user);
    if (req.body.password || req.body.passwordConfirm) {
        return next(
            new AppError(
                'This route is not for password updates. Please use /updateMyPassword',
                400,
            ),
        );
    }
    //2) Update user document
    const filteredBody = filterObj(req.body, 'name', 'email');
    const updatedUser = await User.findByIdAndUpdate(
        req.user._id,
        filteredBody,
        {
            new: true,
            runValidators: true,
        },
    );

    res.status(200).json({
        status: 'success',
    });
});
