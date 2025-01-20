import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose"
import userRouter from "./Router/UserRouter.js";
import productRouter from "./Router/ProductRouter.js";
import jwt from "jsonwebtoken"; //get http reqest (json wep token eka amunamma)


const app=express();
app.use(bodyParser.json());

 app.use((req,res,next)=>{
    
    let token=req.header  //midleware webtoken reading
    ("Authorization")
    
     if (token!=null){
        token=token.replace("Bearer ","") //"Bearer" Skip this word  
        jwt.verify(token,"kvsecret-891",
            (err,decoded)=>{                //get error or decoded value
                if(!err){
                    req.user=decoded;      //req eke user kiyana ekata decoded value eka assigning kirima
                }
            }
        )
     }
     next() 
 
})   
  

let mongoURL="mongodb+srv://Shanu:123@cluster0.lv3kj.mongodb.net/User?retryWrites=true&w=majority&appName=Cluster0";
mongoose.connect(mongoURL);
let connection=mongoose.connection;
connection.once("open",()=>{
    console.log("Connection is OK")
})


app.use("/api/user",userRouter);
app.use("/api/product",productRouter);


app.listen(3000,()=>{
    console.log("Server port 3000 is running ")
    
});


