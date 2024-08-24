const express = require("express");
const router = express.Router();
const courseContentController = require("../controllers/courseContentController");
const authenticateToken = require("../middlewares/authenticateToken");
router.get("/course-content/:id", authenticateToken, courseContentController.getCourseContent);

module.exports = router;