import express from "express"
import connectDb from "./config/database.js";
import dns from 'node:dns'
dns.setServers(['1.1.1.1', '8.8.8.8']);
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors'


// routes
import authRouter from "./routes/authRouter.js";
import adminRouter from "./routes/adminRouter.js";




const app = express();
const PORT = process.env.PORT;

app.use(cors())
app.use(express.json())

app.use('/auth' , authRouter)
app.use('/admin' , adminRouter)


connectDb()
.then(()=>{
    app.listen(PORT, ()=>{
        console.log(`Running on http://localhost:${PORT}`)
    })
})
.catch((err)=>{
    console.log(err.message)
})

