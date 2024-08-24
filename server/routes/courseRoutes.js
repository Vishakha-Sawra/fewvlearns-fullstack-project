const express = require("express");
const router = express.Router();
const courseController = require("../controllers/courseController");

router.get("/:id", courseController.getCourseDetails);

module.exports = router;
