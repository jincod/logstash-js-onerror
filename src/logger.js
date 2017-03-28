const winston = require('winston');
require('winston-logstash');
const config = require('./config.json');

const logger = new winston.Logger({
  transports: [
    new (winston.transports.Console)(),
    new (winston.transports.Logstash)(config.logstashOptions)
  ]
});

logger.rewriters.push((level, msg, meta) => {
  const {projectid} = meta;
  const project = config.projects[projectid];

  return Object.assign({project}, meta);
});

module.exports = logger;
