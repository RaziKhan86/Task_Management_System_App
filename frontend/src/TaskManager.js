import React, { useEffect, useState } from 'react'
import { FaBeer, FaCheck, FaPencilAlt, FaPlus, FaSearch, FaTrash } from "react-icons/fa";
import { ToastContainer } from 'react-toastify'
import { creatTask, DeteleTask, GetAllTask, UpdateTask } from './api';
import { notify } from './utils';


export default function TaskManager() {
    const [input, setInput] = useState('');
    const [tasks, setTasks] = useState([]);
    const [copyTasks, setCopyTasks] = useState([]);
    const [updateTask, setUpdateTask] = useState(null);
    const handleTask = () => {
        if (updateTask && input) {
            // console.log('Update API');
            const obj = {
                taskName: input,
                isDone: updateTask.isDone,
                _id: updateTask._id
            }
            HandleUpdateItem(obj)
        } else if (updateTask === null && input) {
            // console.log("Create")
            HandleAddTask();
        }
        setInput('');
    }
    useEffect(() => {
        if (updateTask) {
            setInput(updateTask.taskName);
        }
    }, [updateTask])
    const HandleAddTask = async () => {
        const obj = {
            taskName: input,
            isDone: false
        }
        try {
            const { success, message } = await creatTask(obj);
            if (success) {
                //Show success Toast
                notify(message, 'success')
            } else {
                //Show error Toast
                notify(message, 'success')

            }
            fetchAllTasks();
        } catch (error) {
            console.log(error);
            notify('Failed to Create Task', 'success')

        }
    }
    const fetchAllTasks = async () => {
        try {
            const { success, message, data } = await GetAllTask();
            setTasks(data);
            setCopyTasks(data);
        } catch (error) {
            console.log(error);
            notify('Failed to Create Task', 'success')

        }
    }
    useEffect(() => {
        fetchAllTasks();
    }, [])

    const HandleDeleteTask = async (id) => {
        try {
            const { success, message } = await DeteleTask(id);
            if (success) {
                //Show success Toast
                notify(message, 'success')
            } else {
                //Show error Toast
                notify(message, 'success')

            }
            fetchAllTasks();
        } catch (error) {
            console.log(error);
            notify('Failed to Create Task', 'success')

        }
    }

    const handleCheckAndUncheck = async (item) => {
        const { _id, isDone, taskName } = item;
        const obj = {
            taskName,
            isDone: !isDone
        }
        try {
            const { success, message } = await UpdateTask(_id, obj);
            if (success) {
                //Show success Toast
                notify(message, 'success')
            } else {
                //Show error Toast
                notify(message, 'success')

            }
            fetchAllTasks();
        } catch (error) {
            console.log(error);
            notify('Failed to Create Task', 'success')

        }
    }

    const HandleUpdateItem = async (item) => {
        const { _id, isDone, taskName } = item;
        const obj = {
            taskName,
            isDone: isDone
        }
        try {
            const { success, message } = await UpdateTask(_id, obj);
            if (success) {
                //Show success Toast
                notify(message, 'success')
            } else {
                //Show error Toast
                notify(message, 'success')

            }
            fetchAllTasks();
        } catch (error) {
            console.log(error);
            notify('Failed to Create Task', 'success')

        }
    }
    const HandleSearch = (e)=>{
        const term = e.target.value.toLowerCase();
        const oldTasks = [...copyTasks];
        const result = oldTasks.filter((item)=> item.taskName.toLowerCase().includes(term))
        setTasks(result);
    }
    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">

                    <div className="card shadow-lg border-0 rounded-4 p-4 custom-card">

                        {/* Title */}
                        <h2 className="text-center mb-4 fw-bold gradient-text">
                            Task Manager 🚀
                        </h2>

                        {/* Add Task */}
                        <div className="input-group mb-3 custom-input">
                            <input
                                type="text"
                                className="form-control rounded-start-pill border-0"
                                placeholder="What needs to be done?"
                                value={input}
                                onChange={(e) => {
                                    setInput(e.target.value)
                                }}
                            />
                            <button className="btn btn-primary rounded-end-pill px-4 " onClick={handleTask}>
                                <FaPlus />
                            </button>
                        </div>

                        {/* Search */}
                        <div className="input-group mb-4">
                            <span className="input-group-text bg-light border-0">
                                <FaSearch/>
                            </span>
                            <input
                               onChange={HandleSearch}
                                type="text"
                                className="form-control border-0 bg-light"
                                placeholder="Search tasks..."
                            />
                        </div>

                        {/* Task List */}
                        <ul className="list-group list-group-flush">

                            {
                                tasks.map((item) => (
                                    <li key={item._id} className="list-group-item d-flex justify-content-between align-items-center task-item">
                                        <span className={item.isDone ? "fw-medium text-decoration-line-through text-muted" : ""}>
                                            {item.taskName}
                                        </span>

                                        <div className="d-flex gap-2">

                                            <button onClick={() => handleCheckAndUncheck(item)} className="btn btn-sm btn-success rounded-circle icon-btn">
                                                <FaCheck />
                                            </button>

                                            <button onClick={() => setUpdateTask(item)} className="btn btn-sm btn-warning rounded-circle icon-btn">
                                                <FaPencilAlt />
                                            </button>

                                            <button className="btn btn-sm btn-danger rounded-circle icon-btn" onClick={() => {
                                                HandleDeleteTask(item._id);
                                            }}>
                                                <FaTrash />
                                            </button>

                                        </div>
                                    </li>
                                ))
                            }

                        </ul>

                    </div>

                </div>
            </div>
            {/* Toastify */}
            <ToastContainer
                position='top-right'
                autoClose={3000}
                hideProgressBar={false}
            />
        </div>


    )
}
