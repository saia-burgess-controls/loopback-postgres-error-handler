const PostgresErrorConverter = require('./src/PostgresErrorConverter.js');

module.exports = function(options) {
    const converter = new PostgresErrorConverter(options);

    return (err, req, res, next) => converter.convertError(err, req, res, next);
};
