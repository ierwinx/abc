const express = require('express');
const app = express();
const log4js = require('log4js');

const logger = log4js.getLogger("app");

let typeAndPatter = {
    type: 'pattern',
    pattern: '[# %d{yyyy-MM-dd hh:mm:ss,SSS} %p %z %c %m #]'
};

log4js.configure({
    appenders: {
        archivo: {
            type: 'file',
            layout: typeAndPatter,
            filename: './logs/server.log',
            maxLogSize: 500000000,
            backups: 125,
            compress: true
        },
        app: {
            type: 'console',
            layout: typeAndPatter
        }
    },
    categories: {
        default: { appenders: ['archivo', 'app'], level: 'all' }
    },
    pm2: true
});
app.use(log4js.connectLogger(logger, { level: log4js.levels.INFO, format: ':method :url' }));

module.exports = app;