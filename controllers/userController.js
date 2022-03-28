const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');

const ApiError = require('../utils/apiError');
const factory = require('./handlersFactory');
const User = require('../models/userModel');

// @desc      Get all users
// @route     GET /api/v1/users
// @access    Public
exports.getUsers = factory.getAll(User);

// @desc      Get specific user by id
// @route     GET /api/v1/users/:id
// @access    Public
exports.getUser = factory.getOne(User);

// @desc      Create user
// @route     POST /api/v1/users
// @access    Private
exports.createUser = asyncHandler(async (req, res, next) => {
  const user = await User.create({
    name: req.body.name,
    slug: req.body.slug,
    email: req.body.email,
    phone: req.body.phone,
    profileImg: req.body.profileImg,
    password: req.body.password,
  });

  res.status(201).json({ data: user });
});

// @desc      Update user data without(password)
// @route     PATCH /api/v1/users/:id
// @access    Private
exports.updateUser = asyncHandler(async (req, res, next) => {
  const document = await User.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      slug: req.body.slug,
      email: req.body.email,
      phone: req.body.phone,
      role: req.body.role,
    },
    {
      new: true,
    }
  );

  if (!document) {
    next(new ApiError(`No document found for this id: ${req.params.id}`, 404));
  }

  // document.save();
  res.status(200).json({ data: document });
});

// @desc      Update user data without(password)
// @route     PATCH /api/v1/users/:id
// @access    Private
exports.updateUserPassword = asyncHandler(async (req, res, next) => {
  const document = await User.findByIdAndUpdate(
    req.params.id,
    {
      password: await bcrypt.hash(req.body.password, 12),
      passwordChangedAt: Date.now(),
    },
    {
      new: true,
    }
  );

  if (!document) {
    next(new ApiError(`No document found for this id: ${req.params.id}`, 404));
  }

  // document.save();
  res.status(200).json({ data: document });
});

// @desc     Delete user
// @route    DELETE /api/v1/users/:id
// @access   Private
exports.deleteUser = factory.deleteOne(User);
