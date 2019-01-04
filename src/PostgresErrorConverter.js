module.exports = class PostgresErrorConverter {
    static convertError(error, req, res, next) {
        console.log(error);

        // TODO: Map the errors according to https://www.postgresql.org/docs/9.3/errcodes-appendix.html
        // setup integration tests
        next();
    }


}
