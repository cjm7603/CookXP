const mongoose = require('mongoose');

const RecipeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  difficulty_lvl: {
    type: String,
    enum: ['Easy', 'Medium', 'Hard'],
    required: true
  },
  point_value: {
    type: Number,
    required: true,
    min: 0
  },
  ingredients: [
    {
      type: String,
      trim: true
    }
  ],
  instructions: {
    type: String,
    required: true
  },
  image_url: {
    type: String,
    default: ''
  },
  video_url: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

RecipeSchema.pre('save', function (next) {
    this.point_value = this.ingredients.length;
    next();
});

module.exports = mongoose.model('Recipe', RecipeSchema);
