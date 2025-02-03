const Workout = require("../Models/Workout");
const Exercise = require("../Models/Exercise");
const User = require("../Models/User");
const workouts = require("./workouts");
const exercises = require("./exercises");
const users = require("./users");

const seedDB = async () => {
        try {
        await Exercise.deleteMany();
        console.log("cleared exercises in DB");
    } catch(e) {
        console.log("error trying to clear DB - ", e);
    }

    exercises.forEach(async exercise => {
        const newExercise = new Exercise(exercise);
        // console.log("new exercise = ", newExercise);
        try {
            await newExercise.save();
            console.log("successfully save workout to DB", newExercise.name);
        } catch(e) {
            console.log("error trying to seed DB = ", e);
        }
    })

    // try {
    //     await User.deleteMany();
    //     console.log("cleared users in DB");
    // } catch(e) {
    //     console.log("error trying to clear DB - ", e);
    // }

    // users.forEach(async user => {
    //     const newUser = new User(user);
    //     try {
    //         await newUser.save();
    //         console.log("successfully save user to DB");
    //     } catch(e) {
    //         console.log("error trying to seed DB = ", e);
    //     }
    // })


    // try {
    //     await Workout.deleteMany();
    //     console.log("cleared workouts in DB");
    // } catch(e) {
    //     console.log("error trying to clear DB - ", e);
    // }

    // workouts.forEach(async workout => {
    //     const newWorkout = new Workout(workout);
    //     try {
    //         await newWorkout.save();
    //         console.log("successfully save workout to DB");
    //     } catch(e) {
    //         console.log("error trying to seed DB = ", e);
    //     }
    // })

    // for (let i = 0; i < workouts.length; i++) {
    //     const newWorkout = new Workout(workouts[i]);
    //     console.log(newWorkout);
    //     // try {
    //     //     await newWorkout.save();
    //     //     console.log("successfully save workout to DB");
    //     // } catch(e) {
    //     //     console.log("error trying to seed DB = ", e);
    //     // }
    // }

    // const newWorkout = new Workout(workouts[0]);
    
    // try {
    //     await Workout.deleteMany();
    //     console.log("cleared workouts in DB");
    //     await newWorkout.save();
    //     console.log("successfully save workout to DB");
    // } catch(e) {
    //     console.log("error trying to seed DB = ", e);
    // }
};

// seedDB();
module.exports = seedDB;