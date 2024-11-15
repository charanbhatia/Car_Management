const Car = require('../models/car.model');
const cloudinary = require('../config/cloudinary');
const { successResponse, errorResponse } = require('../utils/response.utils');
const fs = require('fs').promises;

// Helper function to delete local files
const unlinkFile = async (path) => {
  try {
    await fs.unlink(path);
  } catch (error) {
    console.error(`Error deleting file ${path}:`, error);
  }
};

// Create Car
exports.createCar = async (req, res) => {
  try {
    const { title, description } = req.body;
    let tags = [];
    try {
      tags = JSON.parse(req.body.tags);
    } catch (e) {
      return errorResponse(res, 400, 'Tags must be a valid JSON array');
    }

    if (!req.files || req.files.length === 0) {
      return errorResponse(res, 400, 'At least one image is required');
    }

    const uploadPromises = req.files.map((file) =>
      cloudinary.uploader.upload(file.path, { folder: 'car-management' })
    );
    const uploadedImages = await Promise.all(uploadPromises);
    const imageUrls = uploadedImages.map((image) => image.secure_url);

    await Promise.all(req.files.map((file) => unlinkFile(file.path)));

    const newCar = await Car.create({
      title,
      description,
      tags,
      images: imageUrls,
      user: req.user.id,
    });

    return successResponse(res, 201, newCar);
  } catch (error) {
    if (req.files) {
      await Promise.all(
        req.files.map((file) => unlinkFile(file.path).catch(() => {}))
      );
    }
    console.error('Error creating car:', error);
    return errorResponse(res, 500, error.message);
  }
};

// Get all Cars
exports.getCars = async (req, res) => {
  try {
    const cars = await Car.find({ user: req.user.id });
    return successResponse(res, 200, cars);
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

// Get a single Car
exports.getCar = async (req, res) => {
  try {
    const car = await Car.findOne({ _id: req.params.id, user: req.user.id });
    if (!car) {
      return errorResponse(res, 404, 'Car not found');
    }
    return successResponse(res, 200, car);
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

// Update Car
exports.updateCar = async (req, res) => {
  try {
    const { title, description } = req.body;
    let tags = [];
    try {
      tags = JSON.parse(req.body.tags);
    } catch (e) {
      return errorResponse(res, 400, 'Tags must be a valid JSON array');
    }

    const car = await Car.findOne({ _id: req.params.id, user: req.user.id });
    if (!car) {
      return errorResponse(res, 404, 'Car not found');
    }

    let imageUrls = car.images;
    if (req.files && req.files.length > 0) {
      const uploadPromises = req.files.map((file) =>
        cloudinary.uploader.upload(file.path, { folder: 'car-management' })
      );
      const uploadedImages = await Promise.all(uploadPromises);
      imageUrls = uploadedImages.map((image) => image.secure_url);

      await Promise.all(req.files.map((file) => unlinkFile(file.path)));
    }

    car.title = title || car.title;
    car.description = description || car.description;
    car.tags = tags.length ? tags : car.tags;
    car.images = imageUrls;

    const updatedCar = await car.save();
    return successResponse(res, 200, updatedCar);
  } catch (error) {
    console.error('Error updating car:', error);
    return errorResponse(res, 500, error.message);
  }
};

// Delete Car (add logic as per requirements)
exports.deleteCar = async (req, res) => {
  try {
    const car = await Car.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    if (!car) {
      return errorResponse(res, 404, 'Car not found');
    }
    return successResponse(res, 200, 'Car deleted successfully');
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};
