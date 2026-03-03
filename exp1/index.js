const express=require('express');
const app=express();
app.use(express.json());
let students=[
    {"id":1,name:"Rahul"},
    {"id":2,name:"Ashley"},
    {"id":3,name:"Akash"},
    {"id":4,name:"Ram"},
    {"id":5,name:"Sam"}
];

app.get('/students',(req,res)=>{
    res.json(students);
});

app.post('/students',(req,res)=>{
    const newStudent={
        id:students.length+1,name:req.body.name
    };
    students.push(newStudent);
    res.statusCode(201).json(newStudent);
});

const PORT=3000;
app.listen(PORT,()=>{
    console.log(`Server running on http://localhost:${PORT}`);
});