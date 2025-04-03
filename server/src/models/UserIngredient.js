const mongoose = require('mongoose');

const RecipeCompletionSchema = new mongoose.Schema({
    user_ingredient_id: {type:Int16Array, required:true, unique:true},
    user_id: {type:Int16Array, required:true},
    ingredient_name: {type:String, required: true},
    quantity: {type:Int16Array, required: true},
    last_updated: {type:Date,required:true}
});

module.exports = mongoose.model('RecipeCompletion', RecipeCompletionSchema);