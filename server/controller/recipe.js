const User = require("../models/user.js");
const Recipe = require("../models/recipe.js");
const { redirect } = require("react-router-dom");

module.exports.deleteRecipe=async (req,res)=>{
    const recipe_id = req.params.id;
    const { id } = res.payload;
    try {
        const user = await User.findById(id);
        if (!user) {
            console.error("User not found");
            return res.status(404).json({ ok: false, message: "User not found", redirect: '/login' });
        }
        if(!user.myRecipes.includes(recipe_id)){
            console.error("User does not own this recipe");
            return res.status(403).json({ ok: false, message: "You are not authorized to delete this recipe" });
        }
        user.myRecipes = user.myRecipes.filter(item => item!== recipe_id);
        user.fevRecipes = user.fevRecipes.filter(item => item!== recipe_id);
        await user.save();
        const recipe = await Recipe.findByIdAndDelete(recipe_id);

        if (!recipe) {
            console.error("Recipe not found");
            return res.status(404).json({ ok: false, message: "Recipe not found", redirect: '/' });
        }
        return res.status(201).json({ ok: true, message: "Recipe deleted successfully", data: null });
    } catch (e) {
        console.error(e.message);
        return res.status(500).json({ ok: false,message:"server error"});
    }
}
module.exports.getRecipeById = async (req, res) => {
    const recipe_id = req.params.id;
    const { id } = res.payload;
    try {
        const user = await User.findById(id);
        if (!user) {
            console.error("User not found");
            return res.status(404).json({ ok: false, message: "User not found", redirect: '/login' });
        }
        const recipe = await Recipe.findById(recipe_id);
        console.log("recipes : ",recipe);
        return res.status(201).json({ ok: true, message: "Recipe fetched successfully", data: recipe });
    } catch (e) {
        console.error(e.message);
        return res.status(500).json({ ok: false, message: "Something went wrong" });
    }

};


const capitalizeWords = str => {
    return str.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

};
module.exports.addRecipe = async (req, res) => {
    const { id } = res.payload;
    let { strMeal, strCategory, strArea, strInstructions, strYoutube, ingredients, strMealThumb } = req.body;
    strMeal = strMeal.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    strCategory = strCategory.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    strArea = strArea.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    ingredients = Object.fromEntries(
        Object.entries(ingredients).map(([key, value]) => [key, capitalizeWords(value)])
    );
     try {
        const user = await User.findById(id);
        if (!user) {
            console.error("User not found");
            return res.status(404).json({ ok: false, message: "User not found", redirect: '/login' });
        }
        let recipe = await Recipe.create({ strMeal, strCategory, strArea, strInstructions, strYoutube, ingredients, strMealThumb });
        recipe.user = id;
        await recipe.save();
        user.myRecipes.push(recipe);
        user.save();
        return res.status(201).json({ ok: true, message: "Recipe added successfully", data: recipe });
    } catch (e) {
        console.error(e.message);
        return res.status(500).json({ ok: false, message: "Something went wrong" });
    }

};

module.exports.getRecipe = async (req, res) => {
    const { id } = res.payload;
    try {
        const user = await User.findById(id).populate('myRecipes');
        if (!user) {
            console.error("User not found");
            return res.status(404).json({ ok: false, message: "User not found", redirect: '/login' });
        }
        return res.status(201).json({ ok: true, message: "Recipe fetched successfully", data: user.myRecipes });
    } catch (e) {
        console.error(e.message);
        return res.status(500).json({ ok: false, message: "Something went wrong" });
    }

};

module.exports.filterRecipe = async (req, res) => {
    const { value, text } = req.params;
    const currText = text.split('_').join(' ').toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ').trim();
   console.log("currText : ",currText);
    try {
        let recipes;
        if (value == 'name') {
            recipes = await Recipe.find({ strMeal: currText });
        } else if (value == 'i') {
            recipes = await Recipe.find({
                $expr: {
                    $gt: [{
                        $size: {
                            $filter: {
                                input: { $objectToArray: "$ingredients" },
                                as: "ingredient",
                                cond: { $eq: ["$$ingredient.v", currText] }
                            }
                        }
                    }, 0]
                }
            });
        } else if (value == 'a') {
            recipes = await Recipe.find({ strArea: currText });

        } else if (value == 'c') {
            recipes = await Recipe.find({ strCategory: currText });
        }

        return res.status(201).json({ ok: true, message: "Recipe fetched successfully", data: recipes });
    } catch (e) {
        console.error(e.message);
        return res.status(500).json({ ok: false, message: "Something went wrong" });
    }

};


