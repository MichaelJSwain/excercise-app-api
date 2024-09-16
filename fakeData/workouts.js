const Workout = require("../Models/Workout");
const Exercise = require("../Models/Exercise");

// const pushUps = new Exercise({
//     name: "Push ups",
//     preparation: [
//         "lay mat on floor"
//     ],
//     instructions: [
//         "blh",
//         "blh",
//         "blh"
//     ],
//     reps: 6
// });

const airSquat = new Exercise({
    name: "Air squat",
    preparation: "Make sure that you have enough space around you",
    instructions: [
        "Place your feet under your hips or a little wider.",
        "Move your hips back and down, bend the knees and keep your chest up.",
        "Squat down until your upper legs are parallel with the floor.",
        "Move up with your chest still up by pushing your heels against the floor."
    ],
    timer: 60, // seconds
    reps: 0,
    sets: 1
});
const pushUpsKnees = new Exercise({
    name: "Push-ups knees",
    preparation: "",
    instructions: [],
    timer: 60, // seconds
    reps: 0,
    sets: 1
});
const sitUp = new Exercise({
    name: "Sit-up",
    preparation: "",
    instructions: [
        "Lie on your back with your knees bent, feet on the ground and your fingertips placed on the side of your head.",
        "Engage (tighten) your core and pull your belly button in",
        "Keep your heels pressed against the floor.",
        "Squeeze your abs to lift your shoulder blades off the floor.",
        "Slowly lower your shoulders back to the floor."
    ],
    timer: 60, // seconds
    reps: 0,
    sets: 1
});
const lateralRaise = new Exercise({
    name: "Lateral raise",
    preparation: "",
    instructions: [],
    timer: 60, // seconds
    reps: 0,
    sets: 1
});
const handWalk = new Exercise({
    name: "Hand walk",
    preparation: "",
    instructions: [],
    timer: 60, // seconds
    reps: 0,
    sets: 1
});


const fullBodyBeginners = new Workout(
    {
        name: "Full body - circuit for beginners",
        description: `
            Full body circuit training for everyone, perfect for beginners!
            This circuit consists of five exercises that are completed in 
            1 minute intervals with 15 seconds rest in between.
            Ideal for vacations or home workouts. You don't need equipment
            for this routine.
        `,
        duration: "15 mins",
        difficulty: "Beginner",
        equipment: "No equipment",
        type: "HIIT",
        format: "Individual workout",
        bodyArea: "Full body",
        trainingSet: [airSquat, pushUpsKnees, sitUp, lateralRaise, handWalk],
        goals: ["Shape & tone", "Weight loss"]
    }
);
const corePlankWorkout = new Workout(
    {
        name: "Core - plank workout",
        description: `
            This training strengthens the lateral muscles, that are essential for balance and 
            the strengthening of the whole body. The workout consists of 6 exercises that you do for 
            1 minute before going to the next.
        `,
        duration: "9 mins",
        difficulty: "Intermediate",
        equipment: "No equipment",
        type: "HIIT",
        format: "Individual workout",
        bodyArea: "Abs",
        trainingSet: [airSquat, pushUpsKnees, sitUp, lateralRaise, handWalk],
        goals: ["Shape & tone", "Weight loss", "Muscle building", "Get fitter", "Improve performance"]
    }
);
const lowerBodyUltimateLegShred = new Workout(
    {
        name: "Lower body - ultimate leg shred",
        description: `
            This is an effective at home workout for the lower body, where you only need a resistance band. 
            After the warm-up, you do 3 rounds of 6 exercises. In the first round you do 20 reps of each exercise, 
            then 16 reps in the second round and finally 12 reps in the last round. Perform each rep slowly and controlled
            and enjoy the feeling that you're getting stronger.
        `,
        duration: "31 mins",
        difficulty: "Intermediate",
        equipment: "No equipment",
        type: "HIIT",
        format: "Individual workout",
        bodyArea: "Legs",
        trainingSet: [airSquat, pushUpsKnees, sitUp, lateralRaise, handWalk],
        goals: ["Shape & tone", "Weight loss", "Muscle building", "Get fitter"]
    }
);


const workouts = [
    fullBodyBeginners,
    corePlankWorkout,
    lowerBodyUltimateLegShred
];

module.exports = workouts;