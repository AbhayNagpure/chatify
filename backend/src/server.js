// const express = require("express")

import express from "express"; // this will work if you change "type": "module" in package.json
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
const app = express()

import dotenv from "dotenv"
dotenv.config() //this puts all the data of env in process.env
const PORT = process.env.PORT || 3000

app.use("/api/auth", authRoutes) //this is how we import our route files

app.use("/api/messages", messageRoutes)

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))