const { MicroserviceError } = require('@joinbox/loopback-microservice');

module.exports = class PostgresErrorConverter {
    constructor(options = { errorCodeMappings: [] }) {
        this.options = options;
        this.mappings = new Map(this.options.errorCodeMappings);
    }

    convertError(error, req, res, next) {
        if (!this.mappings.has(error.code)) return next(error);

        // eslint-disable-next-line
        error.status = this.mappings.get(error.code);

        return next(error);
    }
};
