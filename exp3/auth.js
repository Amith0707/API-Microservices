import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';



//JWT is JSON Web token

// JWT is a token used for securely transmitting information 
// between client and server for authentication.
// After login, the server gives a token, and the client sends it with 
// every request to access protected routes.

const app=express();
const PORT=5000;
const SECRET='my_secret_key';
app.use(express.json());
app.use(cors());

let students=[
    {id:1,name:'Alice',email:'alice@example.com'},
    {id:2,name:'Bob',email:'bob@example.com'}
];


/*
1. req.body
Data sent in request body (POST/PUT)
req.body contains data sent by the client in the request body.

2. req.params
Data from URL

GET /users/123
req.params.id  // "123"

3. req.user (SPECIAL)

Comes from middleware (JWT decode)
req.user contains decoded token data added by authentication middleware.

jwt.sign({ email: "alice@example.com" })
req.user = { email: "alice@example.com" }
*/

//Securing the routes

// This function is a middleware used to verify JWT tokens 
// and protect routes from unauthorized access.
function authenticateToken(req,res,next){

    //Extracts header like Authorization: Bearer <token>
    const authHeader=req.headers['authorization'];
    // if header is Bearer abc123 then splits it
    const token=authHeader && authHeader.split(' ')[1]

    if (!token){
        res.status(401).send("Token Required");
    }

    //checks if token is valid and signed with crct key
    jwt.verify(token,SECRET,(err,user)=>{
        if(err) return res.sendStatus(403);
        req.user=user;
        next();
    });
}

app.get('/students',authenticateToken,(req,res)=>{
    const student=students.find(s=>s.email===req.user.email);
    if (!student){
        return res.status(404).json({ message: "Student not found" });
    }
    res.json({ student });
});

app.post('/login',(req,res)=>{
    const {email}=req.body;

    const student=students.find(s=>s.email===email);
    if (!student) {
        return res.status(401).json({ message: "Invalid credentials" });
    }  

    const token=jwt.sign(
        {id:student.id,email:student.email},
        SECRET,{expiresIn:'1h'}
    );
});

app.listen(PORT,()=>{
    console.log(`Server running at http://localhost:${PORT}`);
})
