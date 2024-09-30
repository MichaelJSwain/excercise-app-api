const express = require("express");
const app = express();
const bodyParser = require("body-parser");
require('dotenv').config();
const cors = require('cors');

const corsOptions = {
    origin: 'http://localhost:5173',//(https://your-client-app.com)
    optionsSuccessStatus: 200,
  };
 
  app.use(cors(corsOptions));

const Workout = require("./Models/Workout");
const Exercise = require("./Models/Exercise");

const users = require("./fakeData/users");
const workouts = require("./fakeData/workouts");

const PORT = process.env.PORT;

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
app.get("/exerciseApp/api/workouts", (req, res) => {
    console.log("INDEX endpoint");

    res.status(200).json(workouts);
});

// FAVOURITES - CREATE
app.post("/exerciseApp/api/favourites", (req, res) => {
    console.log("request to favourites endpoint = ");
})



app.listen(PORT, () => {
    console.log(`app listening on port ${PORT}`);
});