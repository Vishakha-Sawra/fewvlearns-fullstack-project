const express = require('express');
const { storePurchase } = require('../controllers/storePurchaseController');
const authenticateToken = require("../middlewares/authenticateToken");

const router = express.Router();

router.post('/store-purchase', authenticateToken, storePurchase);

module.exports = router;
