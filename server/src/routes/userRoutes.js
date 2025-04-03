const express = require('express');
const router = express.Router();
const { login, signup, logout, addFriend, getFriendByUser, getAllUsers, createRecipeCompletion, completeRecipe } = require('../controllers/userController'); 

router.post('/login', login);
router.post('/signup', signup);
router.post('/logout', logout);
router.post("/friend/add", addFriend);
router.get("/friend/get/:username", getFriendByUser);
router.get("/", getAllUsers);
router.post('/createRecipeCompletion', createRecipeCompletion);
router.put('/completeRecipe', completeRecipe);

module.exports = router;