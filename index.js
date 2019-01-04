const PostgresErrorConverter = require('./src/PostgresErrorConverter.js');

module.exports = function() {
    return PostgresErrorConverter.convertError;
};
