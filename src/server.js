require("dotenv").config();
import express from "express";
import viewEngine from "./config/viewEngine";
import initWebRoute from "./routes/web";
import bodyParser from "body-parser";
import mongoose from "mongoose"

let app = express();

// config view engine
viewEngine(app);

// use body-parser to post data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/controllers', express.static('controllers'));

// init all web routes
initWebRoute(app);

// connect to DB
mongoose.connect(
   process.env.DB_CONNECTION, 
   { useNewUrlParser: true} , 
   () => console.log("Connected to DB")
);

let port = process.env.PORT || 8080;

app.listen(port, ()=>{
   console.log(`Application is running on port ${port}`) ;
   console.log(`Press CTRL^C to stop the application`) ;
});