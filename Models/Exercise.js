const mongoose = require("mongoose");
const {Schema} = mongoose;

const exerciseSchema = new Schema({
    name: String,
    preparation: Array,
    instructions: Array,
    reps: Number
});

const Exercise = mongoose.model("Exercise", exerciseSchema);

module.exports = Exercise;