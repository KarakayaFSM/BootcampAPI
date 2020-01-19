const ErrorResponse = require("../utils/errorResponse");
const Bootcamp = require("../models/Bootcamp");
const asyncHandler = require("../middleware/async");

// @desc     Get all bootcamps
// @route    GET /api/v1/bootcamps
// @ access  Public
exports.getAllBootcamps = asyncHandler(async (req, res, next) => {
  const bootcamps = await Bootcamp.find();
  res
    .status(200)
    .json({ success: true, count: bootcamps.length, data: bootcamps });
});

// @desc     Get bootcamp with id
// @route    GET /api/v1/bootcamps/:id
// @ access  Public
exports.getBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findById(req.params.id);

  if (!bootcamp) {
    return errorMessage(req.params.id, next);
  }

  return res.status(200).json({ success: true, data: bootcamp });
});

// @desc     Create new bootcamp
// @route    POST /api/v1/bootcamps
// @ access  Private
exports.createBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.create(req.body);
  res.status(201).json({
    success: true,
    data: bootcamp
  });
});

// @desc     Delete bootcamp
// @route    DELETE /api/v1/bootcamps/:id
// @ access  Private
exports.deleteBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);

  if (!bootcamp) {
    return errorMessage(req.params.id, next);
  }

  res.status(200).json({
    success: true,
    msg: `deleted bootcamp with id: ${req.params.id}`
  });
});

// @desc     Update bootcamp
// @route    PUT /api/v1/bootcamps/:id
// @ access  Private
exports.updateBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!bootcamp) {
    return errorMessage(req.params.id, next);
  }

  res.status(200).json({ success: true, data: bootcamp });
});

function errorMessage(id, next) {
  let message = `Bootcamp with id: ${id} not found`;
  return next(new ErrorResponse(message, 404));
}
