const express = require('express');
const router = express.Router();
const { getRandom, getByIngredient } = require('../controllers/recipeController'); 

router.get('/random', getRandom);
router.get('/ingredient/:ingredient', getByIngredient);

module.exports = router;