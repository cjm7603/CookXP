const mongoose = require('mongoose');

const RecipeCompletionSchema = new mongoose.Schema({
    completion_id: {type:Int16Array, required:true, unique:true},
    recipe_id: {type:Int16Array, required:true},
    user_id: {type:Int16Array, required:true},
    is_completed: {type:Boolean, required:true},
    completion_date: {type:Date,required:false}
});

module.exports = mongoose.model('RecipeCompletion', RecipeCompletionSchema);