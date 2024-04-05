import express from "express";
import cors from "cors";
import mongoose from "mongoose";
// import {User} from "../models/user";


const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://localhost:27017/bookmbs", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", (error) => {
  console.error("MongoDB connection error:", error);
});

db.once("open", () => {
  console.log("DB connection successful");
});

const userSchema = new mongoose.Schema({
    name :String,
    email:String,
    password:String
  
}) 

const User = new mongoose.model("User",userSchema)

//Routes 

app.post("/login", async(req, res) => {
    const {email,password } = req.body;
    try{
        const existingUser = await User.findOne({email:email});
        if(existingUser){
          if(password===existingUser.password){
            res.send({message:"Login Successfully",existingUser:existingUser})
          }
          else{
            res.send({message:"Incorrect Possword"})
          }
        }
        else{
          res.send({message:"user not registered"})

        }
    }
    catch (error) {
      console.error("Error occurred:", error);
      res.status(500).send({ message: "Internal server error" });
  }
//   res.send("MY API login");
});
app.post("/register", async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email: email });

        if (existingUser) {
            return res.status(400).send({ message: "User already registered" });
        }

        const newUser = new User({
            name,
            email,
            password
        });

        await newUser.save();
        res.status(201).send({ message: "User registered successfully,Please Login Now" });
    } catch (error) {
        console.error("Error occurred:", error);
        res.status(500).send({ message: "Internal server error" });
    }
});

app.listen(5000, () => {
  console.log("Server started on port 5000");
});
