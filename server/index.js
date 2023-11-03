const express = require("express");
const cors = require("cors");
const app = express();
const {v4: uuidv4} = require("uuid");
require("dotenv").config();
require("./config/databaseConnection")
const todoRouter = require("./routers/todoRouter");

// console.log(process.env.PORT);

app.use(express.json());
app.use(cors());
app.use("/api",todoRouter);

app.get("/",(req,res)=>{
    res.json({message: "hello"})
})

const port = process.env.PORT || 5002;
app.listen(port, ()=> console.log(`api running on ${port}`));