const TaskModel = require("../Models/TaskModel");

const createTask = async (req,res)=>{
    const data = req.body;
    console.log(data);
    try {
        const model = new TaskModel(data);
        await model.save();
        res.status(201).json({message: "Task is created", success: true});
    } catch (err) {
        res.status(500).json({message: "Failed to Create Task", success: false});
    }
}

const fetchAllTask = async (req,res)=>{
    
    try {
        const data = await TaskModel.find({});
        res.status(200).json({message: "All Tasks", success: true,data});
    } catch (err) {
        res.status(500).json({message: "Failed to Get all tasks", success: false});
    }
}

const UpdateTaskbyId = async (req,res)=>{
    try {
        const id = req.params.id;
        const body = req.body;
        const obj = {$set : {...body}};
       const data =  await TaskModel.findByIdAndUpdate(id,obj);
        res.status(200).json({message: "Task Updated", success: true,data});
    } catch (err) {
        res.status(500).json({message: "Failed to Update Task", success: false});
    }
}

const DeleteTaskbyId = async (req,res)=>{
    
    try {
        const id = req.params.id;
        await TaskModel.findByIdAndDelete(id);
        res.status(200).json({message: "Task Deleted", success: true});
    } catch (err) {
        res.status(500).json({message: "Failed to Delete Task", success: false});
    }
}

module.exports = {
    createTask,
    fetchAllTask,
    UpdateTaskbyId,
    DeleteTaskbyId
}