const express = require('express');
const authenticate = require('../middleware/auth.middleware');
const upload = require('../middleware/upload.middleware');
const { validateCar } = require('../middleware/validation.middleware');
const {
  createCar,
  getCars,
  getCar,
  updateCar,
  deleteCar,
} = require('../controllers/car.controller');

const router = express.Router();

// Create a new car
router.post('/', authenticate, upload.array('images', 10), validateCar, createCar);

// Get all cars for a user
router.get('/', authenticate, getCars);

// Get a single car by ID
router.get('/:id', authenticate, getCar);

// Update a car by ID
router.put('/:id', authenticate, upload.array('images', 10), validateCar, updateCar);

// Delete a car by ID
router.delete('/:id', authenticate, deleteCar);

module.exports = router;
