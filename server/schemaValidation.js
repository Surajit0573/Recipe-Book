const Joi = require('joi');

module.exports.userSchema = Joi.object({
  email: Joi.string().required(),
  username: Joi.string().required(),
  password: Joi.string().required()

});

module.exports.recipeSchema = Joi.object({
  strMeal: Joi.string().required(),
  strCategory: Joi.string().required(),
  strArea: Joi.string().required(),
  strInstructions: Joi.string().required(),
  strMealThumb: Joi.string().required(),
  ingredients:Joi.object().required(),
  strYoutube: Joi.string(),
});