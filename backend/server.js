const express = require('express');
const cors = require('cors')
const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.get("/",(req,res)=>{
    res.send("Backend server is working")
})

const users = [
    {
        id: 1,
        name: "Ramya",
        email: "ramya@gmail.com",
        password: "1234"
    },
    {
        id: 2,
        name: "Priya",
        email: "priya@gmail.com",
        password: "5678"
    }
]

app.get("/api/users",(req,res)=> {
    res.json(users);
})

app.post("/api/login",(req,res)=>{
    const {email,password} = req.body;

    const user = users.find((user)=> user.email === email && user.password === password)

    if(!user){
        return res.status(401).json({
            success: false,
            message: "Invalid email or password"
        })
    }
    res.json({
        success: true,
        message: "Login Successful",
        user: {
            id: user.id,
            name: user.name,
            email: user.email
        }
    })
})

app.listen(PORT,()=> {
    console.log(`Server running on port 5000`)
})