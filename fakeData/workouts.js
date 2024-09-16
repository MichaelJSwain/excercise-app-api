const Exercise = require("../Models/Exercise");

const pushUps = new Exercise({
    name: "Push ups",
    preparation: [
        "lay mat on floor"
    ],
    instructions: [
        "blh",
        "blh",
        "blh"
    ],
    reps: 6
});

const workouts = [
    {
        id: 1,
        name: "Full body",
        description: "",
        duration: "47 mins",
        difficulty: "Beginner",
        equipment: "No equipment",
        type: "HIIT",
        format: "Individual workout",
        bodyArea: "Full body",
        trainingSet: [pushUps],
        goals: ["Shape & tone", "Weight loss"]
    }
];

module.exports = workouts;