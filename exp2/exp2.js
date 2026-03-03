// const express=require('express');
// const cors=require('cors');
// const mongoose=require('mongoose');
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

const app=express();
const PORT=5000;

app.use(cors());
app.use(express.json());

/*
MongoDB Connection
*/

mongoose.connect('mongodb://localhost:27017/Test1')
    .then(()=>{
        console.log('MongoDB Connected');
    })
    .catch((err)=>{
        console.error("Mongodb connection error.",err);
    });

/*
User schema and model
*/

const UserSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    }
},{timestamps:true});

const User=mongoose.model('User',UserSchema);

//adding routes

app.get('/',(req,res)=>{
    res.send("API is working");
});

app.get('/users',async(req,res)=>{
    try{
        const users=await User.find();
        res.json(users);
    }catch(err){
        res.status(500).json({message:err.message});
    }
});

//get user by id
app.get('/users/:id',async(req,res)=>{
    try{
        const user=await User.findById(req.params.id);
        if (!user){
            return res.status(404).json({message:'User not found'});
        }
        res.json(user);
    }catch(err){
        res.status(400).json({message:'INVALID ID'});
    }
});

//create user
app.post('/users',async(req,res)=>{
    try{
        const newUser=new User({
            name:req.body.name,
            email:req.body.email
        });
        const savedUser=await newUser.save();
        res.status(201).json(savedUser);
    }catch(err){
        res.status(500).json({message:err.message});
    }
});


app.listen(PORT,()=>{
    console.log(`Server is running at http://localhost:${PORT}`);
});