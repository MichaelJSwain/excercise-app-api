const express = require("express");
const app = express();
require('dotenv').config()

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`app listening on port ${PORT}`);
});