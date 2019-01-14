const { MicroserviceError } = require('@joinbox/loopback-microservice');

module.exports = class PostgresErrorConverter {
    constructor(options = { errorCodeMappings: [] }) {
        this.options = options;
        this.mappings = new Map(this.options.errorCodeMappings);
    }

    convertError(error, req, res, next) {
        if (!this.mappings.has(error.code)) return next();

        // eslint-disable-next-line
        const status = this.mappings.get(error.code);
        const { message } = error;
        //const customError = new MicroserviceError(message, { statusCode: status, originalError: error });

        // TEST
        error.status = status;
        return next(error);
    }
};
