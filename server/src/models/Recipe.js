const mongoose = require('mongoose');

const RecipeSchema = new mongoose.Schema({
    //anything besides these values can be obtained from the external API
    recipe_id: {type:Int16Array, required:true, unique:true},
    difficulty_lvl: {type:Int16Array, required:true},
    point_value: {type:Int16Array, required:true}
});

module.exports = mongoose.model('Recipe', RecipeSchema);