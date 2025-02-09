const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require('dotenv').config();
const cors = require('cors');
const seedDB = require("./fakeData/seedDB");
const workoutsSeedData = require("./fakeData/workouts");
const {v4} = require("uuid");

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
        console.log("user", User.find({}));
        if (!user) {
            return res.status(400).json({message: "unknown user"});
        }
        if (user.password === password) {
            console.log("successfully found user")
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
                                        current: user.current,
                                        customWorkouts: user.customWorkouts
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
    try {
        const newUser = new User({
            username,
            password
        })
        await newUser.save();
    
        return res.status(200).json(newUser);
    } catch(e) {
        return res.status(400).json("Unable to register user. Please try again later");
    }
});

// WORKOUTS - SHOW
app.get("/exerciseApp/api/workouts/:id", async (req, res) => {
    const {id} = req.params;
    
    try {
        const workout = await Workout.findById(id);
        return res.status(200).json(workout);
    } catch(e) {
        return res.status(400).json("could not find workout");
    }
});

// WORKOUTS - INDEX
app.get("/exerciseApp/api/workouts", async (req, res) => {
    console.log("INDEX endpoint");


    // return res.status(200).json(workoutsSeedData);;

    try {
        const workouts = await Workout.find({});
        console.log("successfully found workouts!", workouts.length);
        // setTimeout(() => {    
            res.status(200).json(workouts);
        // }, 2000);
    } catch(e) {
        console.log("error trying to find workouts");
        return res.status(400).json("can't get workouts. Please try again later");
    }
});

// WORKOUTS - COMPLETED
app.post("/exerciseApp/api/workouts/completed", async (req, res) => {
    console.log("hit the workout completed route");
    const {userId, workoutId} = req.body;

    try {
        const foundUser = await User.findById(userId);
        const isCompleted = foundUser.completed.some(c => c.toString() == workoutId);

        if (!isCompleted) {
            console.log("workout not completed yet, adding to completed...");
            const foundWorkout = await Workout.findById(workoutId);
            foundUser.completed.push(foundWorkout);
            await foundUser.save();
            console.log("successfully saved completed workout");
            return res.status(200).json({message: "successfully saved completed workout"});
        } else {
            console.log("workout already completed");
        }

        const updatedCurrentWorkouts = foundUser.current.filter(c => {
            return c.toString() != workoutId;
        });

        foundUser.current = updatedCurrentWorkouts;
        await foundUser.save();
        console.log("updated current workouts for user");
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
        let isInProgress = foundUser.current.some(c => c.toString() == workoutId);
        
        if (isInProgress) {
            console.log("workout already in progress");
        } else {
            const foundWorkout = await Workout.findById(workoutId);
            foundUser.current.push(foundWorkout);
            await foundUser.save();
            console.log("successfully save current workout");
            return res.status(200).json({message: "successfully saved current workout"});
        }
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
        const isFaved = foundUser.favourites.some(favourite => favourite.toString() == workoutId);
        if (isFaved) {
            // remove from favourites
            let updatedFavourites = foundUser.favourites.filter(favourite => {
                return favourite.toString() != workoutId
            });
            foundUser.favourites = updatedFavourites;
            await foundUser.save();
        } else {
            // add to favourites
            const foundWorkout = await Workout.findById(workoutId);
            foundUser.favourites.push(foundWorkout);
            await foundUser.save();
        }
        return res.status(200).json({message: "successfully updated favourites"});
    } catch(e) {
        console.log("error in favourites endpoint", e);
        return res.status(400).json({message: "error updating favourites"});
    }
})

// ------ EXERCISES ------- //
// INDEX
app.get("/exerciseApp/api/exercises", async (req, res) => {
    try {
        const exercises = await Exercise.find({});
        return res.status(200).json(exercises);
    } catch (e) {
        return res.status(400).json({message: "error fetching exercises"});
    }
});

// CREATE (WORKOUT)
app.post("/exerciseApp/api/workouts", async (req, res) => {
    const {name, exercises, user_id} = req.body.workout;

    const newWorkout = new Workout(
        {
            id: v4(),
            name,
            description: `
                Testing creating a new custom workout.
            `,
            image: "https://media.self.com/photos/61bcd0e05aed92fc4251b026/4:3/w_2560%2Cc_limit/GettyImages-1213234926.jpeg",
            duration: "15 mins",
            difficulty: "Advanced",
            equipment: "No equipment",
            type: "HIIT",
            format: "Individual workout",
            bodyArea: "Full body",
            trainingSet: exercises,
            goals: ["Shape & tone", "Weight loss"]
        }
    );

    try {
        const user = await User.findById(user_id);
        user.customWorkouts.push(newWorkout);
        await user.save();
        console.log("successfully saved new CUSTOM workout to user");
        return res.status(200).json(newWorkout);
    } catch(e) {
        console.log("error trying to save custom workout to DB");
        return res.status(400).json({message: "error trying to create workout"});
    }

});



mongoose.connect(DB_CONNECTION_STRING);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connect error:"));
db.once("open", () => {
    console.log("Database connected!!");
});

app.listen(PORT, () => {
    console.log(`app listening on port ${PORT}`);
});