import express from "express"
import postsRouter from "./routes/posts.router.js"
import usersRouter from "./routes/users.router.js"


import "dotenv/config"

const app = express()
app.use(express.json());
app.use(express.static('/public'))
app.listen(process.env.PORT, () => console.log(`localhost:${process.env.PORT}`))

app.use("/users", (req,res,next)=>{
    res.header('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS"); //
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization")
    next()
}, usersRouter)

app.use("/posts",  (req,res,next)=>{
    res.header('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization")//
    next()
},postsRouter)



