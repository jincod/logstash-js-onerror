const express = require('express');
const cors = require('cors')
const winston = require('winston');
const bodyParser = require('body-parser');
const logger = require('./logger');

const app = express();

app.use(bodyParser.json());
app.use(cors());

const projects = process.env.PROJECTS.split(',')
  .reduce((result, project) => {
    const splitted = project.split(':');

    const projectId = splitted[0];
    const projectName = splitted[1];

    return Object.assign({}, result, {
      [projectId]: projectName
    });
  }, {});

const getLevel = (level = 'error') => {
  if (Object.keys(winston.config.npm.levels).indexOf(level) !== -1) {
    return level.toLowerCase();
  }

  return level;
}

app.post('/api/log', (req, res) => {
  const {message, meta = {}} = req.body;
  const {projectid, appid, level} = meta;
  const project = projectid && projects[projectid];

  if (appid && message && project) {
    logger[getLevel(level)](message, {project, appid});
  }

  res.sendStatus(200);
});

app.listen(process.env.PORT || 3000);
