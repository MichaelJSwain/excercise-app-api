const mongoose = require("mongoose");
const {Schema} = mongoose;

const workoutSchema = new Schema({
    name: String,
    description: String,
    duration: String,
    difficulty: String,
    image: String,
    equipment: String,
    type: String,
    format: String,
    bodyArea: String,
    trainingSet: Array,
    goals: Array,
    custom_workout: Boolean
});

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;