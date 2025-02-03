const Exercise = require("../Models/Exercise");
const {v4} = require("uuid");

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
const airLunge = new Exercise({
    name: "Air Lunge, alternating",
    preparation: "Make sure that you have enough space around you.",
    instructions: [
        "Stand with your feet under your hips",
        "Take a big step forward and bend your back knee towards the floor.",
        "Simultaneously bend your front knee until it reaches a 90 degree angle.",
        "Push your front heel against the floor as you come up."
    ],
    timer: 60, // seconds
    reps: 0,
    sets: 1
});
const hipBridge = new Exercise({
    name: "Hip Bridge",
    preparation: "Lay an exercise mat down so you can lie on it",
    instructions: [
        "Lie on your back with bended knees, feet on the floor.",
        "Press the heels against the floor and your hips up.",
        "Keep your abs tight and squeeze your glutes together.",
        "let your hips sink down again"
    ],
    timer: 60, // seconds
    reps: 0,
    sets: 1
});
const jumpSquats = new Exercise({
    name: "Jump Squats",
    preparation: "Make sure that you have enough space around you.",
    instructions: [
        "Begin with your feet at shoulder width, the toes pointing a little outside.",
        "Bend your knees and let your body sink in a squat position, keep your back straight and your chest up.",
        "Push through your feet, jump from the ground while you stretch your hips and knees.",
        "land softly and bend your knees to receive the impact."
    ],
    timer: 60, // seconds
    reps: 0,
    sets: 1
});

const exercises = [
    airSquat,
    pushUpsKnees,
    sitUp,
    lateralRaise,
    handWalk,
    airLunge,
    hipBridge,
    jumpSquats
];

module.exports = exercises;