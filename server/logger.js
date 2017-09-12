const winston = require('winston');
require('winston-logstash');
const config = require('./config.json');

const logger = new winston.Logger({
  transports: [
    new (winston.transports.Console)(),
    new (winston.transports.Logstash)(config.logstashOptions)
  ]
});

module.exports = logger;
