const userRoute = require("./routes/usuarioRoute")
require('dotenv').config();
const express = require('express');
const cors = require('cors');

const appts = express();

appts.use(express.json());

appts.use(cors());
appts.use("/users", userRoute);

module.exports = app