const express = require('express');
const router = express.Router();
const { login, signup, logout, getUserInfo, addFriend, getFriendByUser, getAllUsers, createRecipeCompletion, completeRecipe } = require('../controllers/userController'); 

router.post('/login', login);
router.post('/signup', signup);
router.post('/logout', logout);
router.get('/:username', getUserInfo);
router.post("/friend/add", addFriend);
router.get("/friend/:username", getFriendByUser);
router.get("/", getAllUsers);
router.post('/createRecipeCompletion', createRecipeCompletion);
router.put('/completeRecipe', completeRecipe);

module.exports = router;