const express = require("express");
const asyncWrap = require("../utils/asyncWrap.js");
const router = express.Router({ mergeParams: true });

const {validateRecipe,varifyJWT}=require("../middleware.js");
const recipeContoller=require("../controller/recipe.js");

router.route('/')
.post(varifyJWT,validateRecipe,asyncWrap(recipeContoller.addRecipe))
.get(varifyJWT,asyncWrap(recipeContoller.getRecipe));

router.route('/:id')
.get(varifyJWT,asyncWrap(recipeContoller.getRecipeById));

router.get('/:value/:text',asyncWrap(recipeContoller.filterRecipe));

module.exports = router;