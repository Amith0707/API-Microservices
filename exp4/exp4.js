import express from 'express';
import cors from 'cors';

const app=express();
const PORT=5000;

app.use(cors());
app.use(express.json());


let students=[
    {"ID":1,"Name":"Akash","College":"NHCE"},
    {"ID":2,"Name":"Darshan","College":"DSCE"}
];
app.get('/',(req,res)=>{
    res.send("API IS WORKINGS SUCESSFULLY");
});

app.get('/students',(req,res)=>{
    res.json({message:students});
});


app.listen(PORT,()=>{
    console.log(`Server is listening on http://localhost:${PORT}`);
})