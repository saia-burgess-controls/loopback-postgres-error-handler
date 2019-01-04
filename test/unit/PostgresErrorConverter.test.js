const { expect } = require('chai');
const { describe, it, beforeEach } = require('mocha');

const PostgresErrorConverter = require('../../src/PostgresErrorConverter.js');

describe('The PostgresErrorConverter Class', () => {

    beforeEach(() => {
        this.handler = new PostgresErrorConverter();
    });

    it('can be instantiated empty', () => {
        expect(this.handler).to.be.a('Object');
    });
});
