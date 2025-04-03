const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const RecipeCompletionSchema = new mongoose.Schema({
    completion_id: {type:Number, required:true, unique:true},
    recipe_id: {type:Number, required:true},
    username: {type:String, required:true},
    is_completed: {type:Boolean, required:true},
    completion_date: {type:Date,required:false}
});

RecipeCompletionSchema.plugin(AutoIncrement, { inc_field: 'completion_id' });
module.exports = mongoose.model('RecipeCompletion', RecipeCompletionSchema);