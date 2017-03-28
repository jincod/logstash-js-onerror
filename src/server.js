const express = require('express');
const winston = require('winston');
var bodyParser = require('body-parser');

const logger = require('./logger');

const app = express();

app.use(bodyParser.json());

const getLevel = (level = 'error') => {
  if (Object.keys(winston.config.npm.levels).indexOf(level) !== -1) {
    return level.toLowerCase();
  }

  return 'error';
}

app.post('/api/log', (req, res) => {
  const {projectid, appid, message, level} = req.body;

  logger[getLevel(level)](message, {projectid, appid});

  res.sendStatus(200);
});

app.listen(process.env.PORT || 3000);
