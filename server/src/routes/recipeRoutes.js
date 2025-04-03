const express = require('express');
const router = express.Router();
const { getRandom, getByIngredient, getById } = require('../controllers/recipeController'); 

router.get('/random', getRandom);
router.get('/ingredient/:ingredient', getByIngredient);
router.get('/:id', getById);

module.exports = router;