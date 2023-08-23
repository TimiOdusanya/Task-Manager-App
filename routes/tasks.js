const express = require('express');
const router = express.Router();

const {
  getAllTasks,
  postTask,
  getTaskById,
  patchTask,
  deleteTaskById,
} = require("../controllers/tasks");


router.route('/').get(getAllTasks).post(postTask);
router.route('/:id').get(getTaskById).patch(patchTask).delete(deleteTaskById)


module.exports = router;