const express = require('express');
const router = express.Router();
const { adminLogin, verifyNGO , createReviewAndNotifyNGO } = require('../controllers/adminController');
const { viewPendingRequests } = require('../controllers/ngoController.js');

// Route to view pending verification requests
router.get('/pending-verifications',  viewPendingRequests);

// Admin login route
router.post('/login', adminLogin);

// Protected routes for NGO verification
router.post('/verify-ngo',  verifyNGO);  // Only accessible to logged-in admin

router.post("/reviews/create", createReviewAndNotifyNGO);

module.exports = router;
