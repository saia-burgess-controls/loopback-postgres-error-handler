const path = require('path');
const { before } = require('mocha');

const Microservice = require('@joinbox/loopback-microservice');

before(async function() {
    const appRootDir = path.resolve(__dirname, '../server');
    const env = 'testing';
    const options = {
        boot: {
            appRootDir,
            env,
        },
    };
    this.service = await Microservice.boot(options);
    this.models = this.service.app.models;
});
