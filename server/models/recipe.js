const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Recipe = new Schema({
    strMeal:{
        type:String,
        required:true
    },
    strCategory:{
        type:String,
        required:true
    },
    strArea:{
        type:String,
        required:true
    },
    strInstructions:{
        type:String,
        required:true
    },
    strYoutube:{
        type:String
    },
    ingredients:{type:Object,required:true},
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    strMealThumb:{type: String,required:true}, 
});

module.exports = mongoose.model('Recipe', Recipe);