import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';

const app=express();
const PORT=5000;
const SECRET_KEY="mysecretkey";


app.use(cors());
app.use(express.json());


// Adding a API Endpoint

// Syntax
// app.get('/home', (requestObject, responseObject) => {
//     responseObject.send("API IS WORKING");
// });


let students=[
    {id:1,name:'Alice',email:'alice@example.com'},
    {id:2,name:'Bob',email:'bob@example.com'}
];

//unprotected route
// app.get("/students",(req,res)=>{
//     // res.send("Welcome folks!")
//     res.json({message:students});
// });

function authenticateToken(req,res,next){
    // None
    const authHeader=req.headers['authorization'];
    const token=authHeader && authHeader.split(' ')[1]

    if (!token) return res.status(401).send("Token required");

    jwt.verify(token,SECRET_KEY,(err,user)=>{
        if (err) return res.sendStatus(403);
        req.user=user;
        next();
    });
}

app.get('/students',authenticateToken,(req,res)=>{
    const student=students.find(s => s.email === req.user.email);
    if (!student){
    return res.status(404).json({ message: "Student not found" });
  }
  res.json({ student });
});

app.post('/login', (req, res) => {
  const { email } = req.body;

  // Check if student exists
  const student = students.find(s => s.email === email);
  if (!student) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  // Create token with 1h validity
  const token = jwt.sign(
    { id: student.id, email: student.email },
    SECRET_KEY,
    { expiresIn: '1h' }
  );

  res.json({ token });
});



app.listen(PORT,()=>{
    console.log(`Server running at http://localhost:${PORT}`);
})