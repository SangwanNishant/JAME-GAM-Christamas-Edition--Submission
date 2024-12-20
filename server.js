require('dotenv').config();
const express = require('express')
const path = require('path')


const PORT = process.env.PORT || 3080


const app = express()

app.use(express.static(path.join(__dirname,"public")))


app.get('/',  (req, res)=>{
    try {
        res.sendFile(path.join(__dirname,"public","menu.html"));
    } catch (error) {
        console.log("error fetching menu.html: ",error.message);
    }  
})

app.get('/game', (req,res)=>{
    try {
        res.sendFile(path.join(__dirname,'public',"game.html"))
    } catch(error){
        console.log("error fetching game.html: ",error.message)
    }
})

app.get('/game-day', (req,res)=>{
    try {
        res.sendFile(path.join(__dirname,'public',"gameDay.html"))
    } catch(error){
        console.log("error fetching game.html: ",error.message)
    }
})

app.get('/game-night', (req,res)=>{
    try {
        res.sendFile(path.join(__dirname,'public',"gameNight.html"))
    } catch(error){
        console.log("error fetching game.html: ",error.message)
    }
})


app.listen(PORT, ()=>{
    console.log(`Server is running on port http://localhost:${PORT}`);
})