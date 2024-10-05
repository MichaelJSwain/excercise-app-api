const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require('dotenv').config();
const cors = require('cors');
const seedDB = require("./fakeData/seedDB");

const corsOptions = {
    origin: 'http://localhost:5173',
    optionsSuccessStatus: 200,
  };
 
  app.use(cors(corsOptions));

const Workout = require("./Models/Workout");
const Exercise = require("./Models/Exercise");

const users = require("./fakeData/users");
const workouts = require("./fakeData/workouts");

const PORT = process.env.PORT;
const DB_CONNECTION_STRING = process.env.DB_CONNECTION_STRING;

app.use(bodyParser.json());


// USER - Login
app.post("/exerciseApp/api/user/login", (req, res) => {
    const {username, password} = req.body;
    if (!username) {
        return res.status(400).json("Please enter a username");
    }
    if (!password) {
        return res.status(400).json("Please enter a password");
    }
    // check user in DB...
    let result = null;
    users.forEach(user => {
        if (user.username === username) {
            if (user.password === password) {
                result = user;
            }
        }
    });

    if (result) {
        return res.status(200).json({user: result});
    } else {
        return res.status(400).json({message: "User not found"});
    }
});

// USER - Register
app.post("/exerciseApp/api/user/register", (req, res) => {
    const {username, password} = req.body;
    if (!username) {
        return res.status(400).json("Please enter a username");
    }
    if (!password) {
        return res.status(400).json("Please enter a password");
    }
    const newUser = {
        username,
        password
    }
    users.push(newUser);
    return res.status(200).json(newUser);
});

// WORKOUTS - SHOW
app.get("/exerciseApp/api/workouts/:id", (req, res) => {
    console.log("SHOW endpoint");
    const {id} = req.params;
    
    let result = false;

    workouts.forEach(workout => {
        if (`${workout._id}` == id) {
            result = workout;
        }
    });
    
    if (result) {
        return res.status(200).json(result);
    } else {
        return res.status(400).json("could not find workout");
    }
});

// WORKOUTS - INDEX
app.get("/exerciseApp/api/workouts", async (req, res) => {
    console.log("INDEX endpoint");

    try {
        const workouts = await Workout.find({});
        console.log("successfully found workouts!");
        res.status(200).json(workouts);
    } catch(e) {
        console.log("error trying to find workouts");
        return res.status(400).json("can't get workouts. Please try again later");
    }
});

// FAVOURITES - CREATE
app.post("/exerciseApp/api/favourites", (req, res) => {
    console.log("request to favourites endpoint = ");
})

mongoose.connect(DB_CONNECTION_STRING);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connect error:"));
db.once("open", () => {
    console.log("Database connected!!");
    // seedDB();
});

app.listen(PORT, () => {
    console.log(`app listening on port ${PORT}`);
});