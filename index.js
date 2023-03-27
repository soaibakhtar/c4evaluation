const express = require("express");
const cors = require("cors")
const {connection} = require("./db")
const {userRouter} = require("./routes/user.routes");
const { authorisation } = require("./middleware/auth");
const {postRouter} = require("./routes/post.routes")

const app = express();
require("dotenv").config()
app.use(express.json())
app.use(cors())

app.use("/users",userRouter)
app.use(authorisation)
app.use("/posts",postRouter)

app.listen(process.env.port, async ()=>{
    try {
        await connection
        console.log(`MongoDb is connected on ${process.env.port}`);
    } catch (error) {
        console.log(error);
    }
    console.log("server is running");
})