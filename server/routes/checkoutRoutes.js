const express = require("express");
const router = express.Router();
const checkoutController = require("../controllers/checkoutController");
const authenticateToken = require("../middlewares/authenticateToken");


router.post("/create-checkout-session", authenticateToken, checkoutController.createCheckoutSession);

module.exports = router;
