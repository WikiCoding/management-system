const db = require('../../db/db');

const createProjectTask = async (req, res) => {
  try {
    const createTaskQuery = 'INSERT INTO project_tasks (proj_task_name,proj_task_duration,proj_task_pred,owned_by,proj_task_start,proj_task_end) VALUES ($1,$2,$3,$4,$5,$6)';

    await db.query(createTaskQuery,
      [req.body.projTask, req.body.projTaskDuration, req.body.projTaskPred, req.params.proj_title, req.body.taskStartDate, req.body.taskEndDate]);

    res.status(201).send('Task created');
  } catch (err) {
    res.status(400).send(err)
  }
}

module.exports = createProjectTask;