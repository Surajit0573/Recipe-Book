const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = new Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    fevRecipes:[{
        type:String
    }],
    myRecipes:[{
        type: Schema.Types.ObjectId,
        ref: 'Recipe'
    }]
   

    
});

module.exports = mongoose.model('User', User);