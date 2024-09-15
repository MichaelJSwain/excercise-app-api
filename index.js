const express = require("express");
const app = express();
const bodyParser = require("body-parser");
require('dotenv').config()

const PORT = process.env.PORT;

app.use(bodyParser.json());

const users = [
    {
        username: "Dave",
        password: "Dave"
    },
    {
        username: "Becky",
        password: "Becky"
    }
]

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
        return res.status(200).json({user: {username, password}});
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
})

app.listen(PORT, () => {
    console.log(`app listening on port ${PORT}`);
});