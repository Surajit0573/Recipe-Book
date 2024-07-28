if(process.env.NODE_ENV!="production"){
    require('dotenv').config();
  }
const jwt = require('jsonwebtoken');
const ExpressError = require("./utils/ExpressError.js");
const { recipeSchema,userSchema } = require("./schemaValidation.js");
const jwtSecret=process.env.JWT_SECRET;


module.exports.varifyJWT= async(req,res,next)=>{
    if (!req.cookies.token) {
        return res.status(401).json({ message: "You are not logged in", ok: false, redirect:'/login' });
    }
    const token = req.cookies.token;
    if (!token||token.length==0) {
        return res.status(401).json({ message: "You are not logged in", ok: false,redirect:'/login' });
    }
    try {
        const decoded = await jwt.verify(token,jwtSecret);
        res.payload = decoded;
        next();
    } catch (err) {
        console.error(err.message);
        return res.status(401).json({ message:"Something went Wrong in varification", ok: false,redirect:null});
    }
}

//Listing Schema Validation
module.exports.validateRecipe = (req, res, next) => {
    let { error } = recipeSchema.validate(req.body);
    if (error) {
        console.error(error);
        let errMsg = error.details.map((el) => el.message).join(',');
        throw new ExpressError(400, errMsg);
    } else {
        next();
    }
};

// //Review Schema Validation
// module.exports.validatereview = (req, res, next) => {
//     let { error } = reviewSchema.validate(req.body);
//     if (error) {
//         console.error(error);
//         let errMsg = error.details.map((el) => el.message).join(',');
//         throw new ExpressError(400, errMsg);
//     } else {
//         next();
//     }
// };


//User Schema Validation
module.exports.validateuser = (req, res, next) => {
    let { error } = userSchema.validate(req.body);
    if (error) {
        console.error(error);
        let errMsg = error.details.map((el) => el.message).join(',');
        throw new ExpressError(400, errMsg);
    } else {
        next();
    }
};
