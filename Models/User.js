const mongoose = require("mongoose");
const {Schema} = mongoose;

const userSchema = new Schema({
    username: String,
    email: String,
    password: String,
    avatar: String,
    dob: Date,
    joinDate: Date,
    favourites: [
        {type: mongoose.Types.ObjectId, ref: "Workout"}
    ],
    completed: [
        {type: mongoose.Types.ObjectId, ref: "Workout"}
    ],
    current: [
        {type: mongoose.Types.ObjectId, ref: "Workout"}
    ],
    customWorkouts: Array
});

const User = mongoose.model("User", userSchema);

module.exports = User;