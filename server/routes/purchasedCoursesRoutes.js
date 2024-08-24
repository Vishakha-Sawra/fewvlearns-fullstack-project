const express = require("express");
const router = express.Router();
const purchasedCoursesController = require("../controllers/purchasedCoursesController");
const authenticateToken = require("../middlewares/authenticateToken");

router.get("/purchased-courses", authenticateToken, purchasedCoursesController.getPurchasedCourses);

module.exports = router;
