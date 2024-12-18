require('dotenv').config();
const express = require('express')
const path = require('path')


const PORT = process.env.PORT || 3080


const app = express()

app.use(express.static(__dirname + "public"))


app.get('/',  (req, res)=>{
    try {
        res.sendFile(path.join(__dirname,"public","menu.html"));
    } catch (error) {
        console.log("error fetching menu.html: ",error.message);
    }  
})

app.listen(PORT, ()=>{
    console.log(`Server is running on port http://localhost:${PORT}`);
})