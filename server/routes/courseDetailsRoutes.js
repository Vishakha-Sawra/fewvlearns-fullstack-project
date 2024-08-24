const express = require("express");
const router = express.Router();
const courseController = require("../controllers/courseDetailsController");
router.get("/course-details/:id", courseController.getCourseDetails);

module.exports = router;