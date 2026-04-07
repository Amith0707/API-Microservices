import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

const app=express();
const PORT=5000;
app.use(express.json());
app.use(cors());

// Connects our application to mongodb database named test1
mongoose.connect('mongodb://localhost:27017/Test1') 
// So this is promise handling
    .then(()=>{
        console.log('MongoDB COnnected');
    })
    .catch((err)=>{
        console.error('Failed to connect.',err);
    });

// Schema and model (CORE Concept)
const UserSchema=new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true}
},{timestamps:true});//automatically adds createdAt and updatedAt

const User=mongoose.model('User',UserSchema);
// Creates a model which is used to interact with the database collection.

app.get('/',(req,res)=>{
    res.send('API is working');
});

app.get('/users',async(req,res)=>{
    try{
        const user=await User.find(); //user.find() fetches all users from mongodbs
        res.json(user);
    }catch(err){
        res.status(500).json({message:err.message});
    }
});

app.get('/users/:id',async(req,res)=>{
    try{
        const user=await User.findById(req.params.id);
        if(!user){
            res.status(404).json({message:'User not found'})
        }
    }catch(err){
        res.status(400).json({message:'INVALID ID'});
    }
});

app.post('/users',async(req,res)=>{
    try{
        const newUser=new User({
            name:req.body.name,
            email:req.body.email
        });
        const savedUser=await newUser.save();
        res.status(201).json({message:"Craetd New user succesfully",newUser});
    }catch(err){
        res.status(500).json({message:err.message});
    }
});

app.delete('/users', async (req, res) => {
    try {
        await User.deleteMany();

        res.json({ message: "All users deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.delete('/users/:id',async(req,res)=>{
    try{
        const deletedUser=await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json({ message: "User deleted successfully" });        
    }catch(err){
        res.status(400).json({message:"INVALID ID"});
    }
});

app.put('/users/:id',async(req,res)=>{
    try{
        const updatedUser=await User.findByIdAndUpdate(
            req.params.id,
            {
                name:req.body.email,
                email:req.body.email
            },
            {new:true}
        );
        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(updatedUser);
    } catch (err) {
        res.status(400).json({ message: "Invalid ID" });
    }
});
