const express = require('express');
const userRouters = require('./routes/userRouters');
const taskRouters = require('./routes/taskRouters');
const projectRouters = require('./routes/projectRouters');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname + '/public')));
app.use(cors({ credentials: true, origin: "http://localhost:3000" })); //only for development
app.use(cookieParser())
app.use(userRouters);
app.use(taskRouters);
app.use(projectRouters);

module.exports = app;