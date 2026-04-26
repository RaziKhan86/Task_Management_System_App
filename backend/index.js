const express = require('express');
const app = express();
require('dotenv').config();
require('./Models/db.js')
const TaskRouter = require('./Routes/TaskRouter.js');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 8000;
const cors = require('cors');
app.get('/',(req,res)=>{
    res.send("Hello Server...");
})

app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true })); 
app.use('/tasks', TaskRouter);

app.listen(PORT,()=>{
    console.log("Server is runing...")
})