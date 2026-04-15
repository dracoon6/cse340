const express = require("express")
const router = new express.Router()
const reviewController = require("../controllers/reviewController")
const utilities = require("../utilities/")

// Route to add a new review
// Only logged in users can reach this (handled by controller or middleware)
router.post("/add", utilities.handleErrors(reviewController.addReview))

module.exports = router