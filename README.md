# loopback-postgres-error-handler

Convert postgres error messages for the loopback error handler.
Maps the errors `code` property to the configured status

## Usage and configuration

### Installation

`npm i @joinbox/loopback-postgres-error-handler`

### Configuration

Add the following configuration to your middleware config.
Make sure the error handler is included before the strong-error-handler or your
custom error handler. Also make sure you have disabled the rest error handler in the `config.json` file


```
{
    "remoting": {
        "rest": {
            "handleErrors": false
        }
    }
}

```


`middleware.json`

- errorCodeMappings: A key value mapping for postgres error codes and http status codes
Note: The postgres error code must be a String.

```
"final:after": {
        "./../../../index.js": {
            "params": {
                "errorCodeMappings": [
                    ["23000", 406],
                    ["23001", 406],
                    ["23502", 406],
                    ["23503", 406],
                    ["23514", 406],
                    ["23514", 406]
                ]
            }
        },
        "@joinbox/loopback-microservice#errorHandler": {
            "params": {
                "debug": false,
                "log": true,
                "serviceName": "test-service"
            }
        }
    }

```


## Testing

You can run `npm test` to run the integration and unit tests.

You must have a postgres database running with the credentials matching the ones in the `test/support/server/datasources.json` file.
