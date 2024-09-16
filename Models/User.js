const mongoose = require("mongoose");
const {Schema} = mongoose;

const userSchema = new Schema({
    name: String,
    email: String,
    password: String,
    avatar: String,
    dob: Date,
    joinDate: Date,
    favourites: Array,
    completed: Array,
    current: Array
});

const User = mongoose.model("User", userSchema);

module.exports = User;