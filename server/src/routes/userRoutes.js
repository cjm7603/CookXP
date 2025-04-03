const express = require('express');
const router = express.Router();
const { login, signup, logout, addFriend, getFriendByUser, getAllUsers } = require('../controllers/userController'); 

router.post('/login', login);
router.post('/signup', signup);
router.post('/logout', logout);
router.post("/friend/add", addFriend);
router.get("/friend/get/:username", getFriendByUser);
router.get("/", getAllUsers);

module.exports = router;