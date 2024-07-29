if(process.env.NODE_ENV!="production"){
  require('dotenv').config();
}
const express = require("express");
const cors = require('cors');
const ExpressError = require("./utils/ExpressError.js");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser')
const users = require("./routes/user.js");
const recipe = require("./routes/recipe.js");
const upload= require("./routes/upload.js");
const app = express();
app.use(cors({
  credentials: true,
  origin: ['http://localhost:5173',`${process.env.CLIENT_URL}/`]
}));
let port = 3000;
var methodOverride = require('method-override')
const path = require("path");
const mongoose = require('mongoose');

app.use(methodOverride('_method'))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});

main().then(() => {
  console.log("connection is sucess");
})
  .catch(err => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGODB_URL);

}

//Home Route
app.get("/", (req, res) => {
  const home={massage:"Welcome to RecipeBook !!"};
  res.status(201).json({data:home});

});


app.use("/api/upload",upload);
app.use("/api/user",users);
app.use("/api/recipe",recipe);


//Wrong Path
app.all("*", (req, res, next) => {
  next(new ExpressError(400, "Page Not Exist"));
});


//Error Handle
app.use((err, req, res, next) => {
  let { status = 500, message = "Something Went Wrong" } = err;
  res.status(status).json({ status, message });
});

