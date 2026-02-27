import "dotenv/config";
import express from "express";
import { prisma } from "./prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cors from "cors";

const app = express();
const port = 4444;

app.use(cors());
app.use(express.json());

// middleware
const authMiddleware = (req: any, res: any, next: any) => {
    const header = req.headers.authorization;
    if (!header) {
        return res.status(401).json({ message: "kamu belum login" });
    }
    const token = req.headers.authorization.split(" ")[1];
    
    if(!token){
        return res.status(401).json({message: "kamu belum login"})
    }try {
        const data = jwt.verify(token, "kunciRahasia");
        req.user = data;
        next();
    }catch(err){
        return res.status(401).json({message: "token nya salah"})
    }
}

app.post("/register", async (req, res) => {
    const {email, password} = req.body;

    const salt = await bcrypt.genSalt(10)
    const hashing = await bcrypt.hash(password, salt)

    const user = await prisma.user.create({
        data: {
            email: email,
            password: hashing
        },
    });
    res.status(201).json({message: "reguster sucess"})
});


app.post("/login", async (req, res) => {
    const {email, password} = req.body;
    
    const user = await prisma.user.findUnique({where: {email:email}});
    
    if(!user){
        return res.status(404).json({message: "ga ketemu user nya"});
    }

    const cekPassword = await bcrypt.compare(password, user.password);

    if(!cekPassword){
        return res.status(401).json({message: "pass nya salah"});
    }
    
    // token jwt
    const token = jwt.sign({id: user.id}, "kunciRahasia", {expiresIn: "1h"});
    
    res.status(200).json({message: "login berhasil", token: token})
});


// todo services
app.get("/todo", authMiddleware, async (req: any, res)=>{
    const todos = await prisma.todo.findMany({
        where: {
            userId: req.user.id
        }
    });
    res.status(200).json({todos})
});

app.post("/todo", authMiddleware, async (req: any, res)=> {
    const {title} = req.body;
    
    const newTodo = await prisma.todo.create({
        data: {
            title: title,
            userId: req.user.id
        }
    });
    res.status(201).json({message: "tugas baru telah dibuat", todo: newTodo})
});

app.put("/todo/:id", authMiddleware, async (req: any, res)=> {
    const {id} = req.params;
    const {completed, title} = req.body;

    try {

        const updateTodo = await prisma.todo.update({
            where: {
                id: Number(id),
                userId: req.user.id
            },
            data: {
                ...(title !== undefined && {title: title}),
                ...(completed !== undefined && {completed: completed})
            }
        });
        res.status(200).json({message: "tugas berhasil di update", todo: updateTodo})
    }catch(err) {
        res.status(400).json({message: "ada kesalahan atau gagal terupdate"})
    }
});

app.delete("/todo/:id", authMiddleware, async (req: any, res)=> {
    const {id} = req.params;
    
    try {
        const deleteTodo = await prisma.todo.delete({
            where: {
                id: Number(id),
                userId: req.user.id
            }
        })
        res.status(200).json({message: "tugas berhasil dihapus"})
    }catch(err){
        res.status(400).json({message: "ada kesalahan atau gagal terupdate"})
    }
})


app.listen(port, () => {
    console.log(`run on ${port}`);
});