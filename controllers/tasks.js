const Task = require('../models/Task')
const asyncWrapper = require('../middleware/async');
const { createCustomError } = require("../errors/custom-error");

const getAllTasks = asyncWrapper(async (req, res) => {
    // res.send('Hello there!');
        const tasks = await Task.find({});
        res.status(200).json({tasks});
    }
)

const postTask = asyncWrapper(async (req, res) => {
    // res.json('Task Created')
  
        const task = await Task.create(req.body);
        res.status(201).json({task});
    
});

const getTaskById = asyncWrapper(async (req, res, next) => {
    // res.send('Task gotten by Id')
    // res.json({"id": req.params.id});

        const {id: taskID} = req.params;
        const task = await Task.findOne({_id: taskID});
        if(!task){
            return next(createCustomError(`task with id ${taskID} does not exist`, 404));
            // return res.status(404).json({msg:`task with id ${task} does not exist`});
        }
        res.status(200).json({task});

});

const patchTask = asyncWrapper(async (req, res) => {
    // res.send('Task is patched')
    // res.json({ id: req.params.id });
        const {id: taskID} = req.params;
        const task = await Task.findOneAndUpdate({_id: taskID}, req.body,{
            new: true,
            runValidators: true,
        })
        if(!task){

            return next(createCustomError(`task with id ${taskID} does not exist`, 404));
            // return  res.status(404).json({msg: `No task with id ${taskID}`});
        }
        res.status(201).json({task})
})

const deleteTaskById = asyncWrapper(async (req, res) => {
        const {id: taskID} = req.params;
        const task = await Task.findOneAndDelete({_id:taskID});

        if(!task){
            return next(createCustomError(`task with id ${taskID} does not exist`, 404));
            //return res.status(404).json({msg: `No task with id ${taskID}`});
        }
        res.status(200).json({task});

});
module.exports = {
  getAllTasks,
  postTask,
  getTaskById,
  patchTask,
  deleteTaskById
};