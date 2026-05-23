
import { ENV } from "./lib/env.js";
import express from "express"; // this will work if you change "type": "module" in package.json
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import path from "path";
import {connectDB} from "./lib/db.js"
import cookieParser from "cookie-parser";

const app = express()                                          //create an express 'application instance'
const __dirname = path.resolve()

const PORT =ENV.PORT || 3000
app.use(express.json())                                       //MIDDLEWARE: parse JSON request bodies.
app.use(cookieParser())

app.use("/api/auth", authRoutes)                               // 4. ROUTING: All /api/auth/* → authRoutes
app.use("/api/messages", messageRoutes)                       //  ROUTING: All /api/messages/* → messageRoutes

//make ready for deployment
if(ENV.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "../frontend/dist")));

    app.use("*", (_,res) => {
        res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
    })
}

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
    connectDB()
})