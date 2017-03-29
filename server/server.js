const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const winston = require('winston');
const logger = require('./logger');
const config = require('./config.json');

const app = express();

app.use(bodyParser.json());
app.use(cors());

const getLevel = (level = 'error') => {
  if (Object.keys(winston.config.npm.levels).indexOf(level) !== -1) {
    return level.toLowerCase();
  }

  return 'error';
}

app.post('/api/log', (req, res) => {
  const {message, meta = {}} = req.body;
  const {projectid, appid, level} = meta;

  if (appid && projectid && config.projects[projectid]) {
    logger[getLevel(level)](message, meta);
  }

  res.sendStatus(200);
});

app.listen(process.env.PORT || 3000);
