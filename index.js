const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require('dotenv').config();
const cors = require('cors');
const seedDB = require("./fakeData/seedDB");
const workoutsSeedData = require("./fakeData/workouts");


const corsOptions = {
    origin: 'http://localhost:5173',
    optionsSuccessStatus: 200,
  };
 
  app.use(cors(corsOptions));

const Workout = require("./Models/Workout");
const Exercise = require("./Models/Exercise");

const users = require("./fakeData/users");
const workouts = require("./fakeData/workouts");
const User = require("./Models/User");

const PORT = process.env.PORT;
const DB_CONNECTION_STRING = process.env.DB_CONNECTION_STRING;

app.use(bodyParser.json());


// USER - Login
app.post("/exerciseApp/api/user/login", async (req, res) => {
    console.log(req.body)
    const {username, password} = req.body;
    if (!username) {
        return res.status(400).json("Please enter a username");
    }
    if (!password) {
        return res.status(400).json("Please enter a password");
    }
    // check user in DB...

    try {
        const user = await User.findOne({username});
        console.log(user);
        if (!user) {
            return res.status(400).json({message: "unknown user"});
        }
        if (user.password === password) {
            const userId = `${user._id.toString()}`;
            return res.status(200).json({
                                        _id: userId, 
                                        username: user.username,
                                        email: user.email,
                                        avatar: user.avatar,
                                        dob: user.dob,
                                        joinDate: user.joinDate,
                                        favourites: user.favourites,
                                        completed: user.completed,
                                        current: user.current
                                    });
        } else {
            return res.status(400).json({message: "invalid email or password"});
        }
    } catch(e) {
        console.log("can't find user: ", e);
        return res.status(400).json({message: "unknown user"});
    }
});

// USER - Register
app.post("/exerciseApp/api/user/register", async (req, res) => {
    const {username, password} = req.body;
    if (!username) {
        return res.status(400).json("Please enter a username");
    }
    if (!password) {
        return res.status(400).json("Please enter a password");
    }
    const newUser = new User({
        username,
        password
    })
    // users.push(newUser);
    await newUser.save();
    console.log("new user = ", newUser);

    return res.status(200).json(newUser);
});

// WORKOUTS - SHOW
app.get("/exerciseApp/api/workouts/:id", (req, res) => {
    console.log("SHOW endpoint");
    res.status(200).json({workout: "1"})
    // const {id} = req.params;
    
    // let result = false;

    // workouts.forEach(workout => {
    //     if (`${workout._id}` == id) {
    //         result = workout;
    //     }
    // });
    
    // if (result) {
    //     return res.status(200).json(result);
    // } else {
    //     return res.status(400).json("could not find workout");
    // }
});

// WORKOUTS - INDEX
app.get("/exerciseApp/api/workouts", async (req, res) => {
    console.log("INDEX endpoint");


    return res.status(200).json(workoutsSeedData);;

    // try {
    //     const workouts = await Workout.find({});
    //     console.log("successfully found workouts!", workouts.length);
    //     // setTimeout(() => {    
    //         res.status(200).json(workouts);
    //     // }, 2000);
    // } catch(e) {
    //     console.log("error trying to find workouts");
    //     return res.status(400).json("can't get workouts. Please try again later");
    // }
});

// WORKOUTS - COMPLETED
app.post("/exerciseApp/api/workouts/completed", async (req, res) => {
    console.log("hit the workout completed route");
    const {userId, workoutId} = req.body;

    try {
        const foundUser = await User.findById(userId);
        const foundWorkout = await Workout.findById(workoutId);
        foundUser.completed.push(foundWorkout);
        await foundUser.save();
        console.log("successfully saved completed workout");
        return res.status(200).json({message: "successfully saved completed workout"});
    } catch(e) {
        console.log("error trying to save completed workout");
        return res.status(400).json({message: "error trying to save completed workout"});
    }

});

// WORKOUTS - CURRENT / IN PROGRESS
app.post("/exerciseApp/api/workouts/current", async (req, res) => {
    console.log("hit the current workout endpoint");
    const {userId, workoutId} = req.body;

    try {
        const foundUser = await User.findById(userId);
        const foundWorkout = await Workout.findById(workoutId);
        foundUser.current.push(foundWorkout);
        await foundUser.save();
        console.log("successfully save current workout");
        return res.status(200).json({message: "successfully saved current workout"});
    } catch(e) {
        console.log("error trying to save current workout");
        return res.status(400).json({message: "error trying to save current workout"});
    }
});

// FAVOURITES - CREATE
app.post("/exerciseApp/api/favourites", async (req, res) => {
    const {userId, workoutId} = req.body;
    console.log("request to favourites endpoint = ", req.body);
    try {
        const foundUser = await User.findById(userId);
        const foundWorkout = await Workout.findById(workoutId);
        foundUser.favourites.push(foundWorkout);
        await foundUser.save();
        console.log("saved favourite to user");
    } catch(e) {
        console.log("error in favourites endpoint", e)
    }
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