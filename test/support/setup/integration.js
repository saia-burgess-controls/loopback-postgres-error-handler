require('./unit');
const { before } = require('mocha');

before('start service', async function() {
    await this.service.start();
    this.apiClient = this.service.api;
});
