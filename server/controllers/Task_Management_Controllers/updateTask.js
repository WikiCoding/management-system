const db = require('../../db/db');
//const sgMail = require('@sendgrid/mail');

const updateTaskCompletion = async (req, res) => {
  //:id is the exact idtask to be changed
  //checkUserTask the user owned tasks based on the userId on the tasks Table.
  const tasks = req.tasks; //comes from the checkUserTask
  let isOwner = false;

  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].idtasks === parseInt(req.params.id)) {
      isOwner = true
      continue //if we find a match, break out of the loop.
    }
  }

  if (!isOwner) return res.status(401).send('Unauthorized');
  //Assuming that the customer accepts that this return result will not disclose if the id of the task exists.

  try {
    //1st checking if the user is trying to update a task that belongs to him.
    const taskUpdate =
      `UPDATE tasks SET completed=$1 WHERE idtasks=$2`;

    const values = [parseInt(req.body.completed), parseInt(req.params.id)];

    await db.query(taskUpdate, values)

    res.status(200).send('Task completion updated.')

    //NOTIFYING MANAGER
    // const query = 'SELECT * FROM users WHERE id=$1';
    // const result = await db.query(query, [req.userId])

    // const taskId = req.params.id; //summary can be up to 2500char so for easier read just used the task Id.


    // const managerEmail = result.rows[0].manager_email;
    // const username = result.rows[0].username;
    // const ADMIN_EMAIL = process.env.ADMIN_SG_MAIL; //since I'm using my account for sendgrid, please consider my email as the Admin (for testing purposes)
    // const date = new Date().toLocaleDateString(); //not showing time.

    // sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    // sgMail.send({
    //   to: managerEmail,
    //   from: ADMIN_EMAIL,
    //   subject: `Task ${taskId} completion notification`,
    //   text: `The tech ${username} performed the task ${taskId} on date ${date}`
    // });
  } catch (err) {
    res.status(400).send('Could not update. ', err.details);
  }

}

const updateTaskDescription = async (req, res) => {
  const tasks = req.tasks;
  let isOwner = false;

  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].idtasks === parseInt(req.params.id)) {
      isOwner = true
      continue //if condition we find a match, break out of the loop.
    }
  }

  if (!isOwner) return res.status(401).send('Unauthorized');
  try {
    const taskUpdate =
      `UPDATE tasks SET task=$1 WHERE idtasks=$2`;

    const values = [req.body.task, parseInt(req.params.id)]

    await db.query(taskUpdate, values)

    res.status(200).send('Task description updated')
  } catch (err) {
    res.status(400).send('Could not update. ', err.details)
  }

}

module.exports = { updateTaskCompletion, updateTaskDescription };