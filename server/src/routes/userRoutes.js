const express = require('express');
const router = express.Router();
const { login, signup, logout, addFriend } = require('../controllers/userController'); 
const { verifyToken } = require('../middleware/authMiddleware');

router.post('/login', login);
router.post('/signup', signup);
router.post('/logout', logout);
router.post('/add-friend', verifyToken, addFriend);

module.exports = router;