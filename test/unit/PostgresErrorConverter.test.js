const { expect } = require('chai');
const { before, describe, it } = require('mocha');

const PostgresErrorConverter = require('../../src/PostgresErrorConverter.js');

describe('The PostgresErrorConverter Class', () => {

    it('can be instantiated empty', () => {
        const handler = new PostgresErrorConverter();
        expect(handler).to.be.a('Object');
        expect(handler).to.have.a.property('options');
        expect(handler).to.have.a.property('mappings')
            .to.have.a.property('size', 0);
    });

    it('creates the error code mappings form the given configuration', () => {
        const handler = new PostgresErrorConverter({
            errorCodeMappings: [
                ['500', '400'],
            ],
        });

        const { mappings } = handler;

        expect(handler).to.be.a('Object');
        expect(handler).to.have.a.property('options');
        expect(mappings).to.have.a.property('size', 1);
        expect(mappings.has('500')).to.equal(true);
    });


    it('maps the given errors code to the configured status code', () => {
        const handler = new PostgresErrorConverter({
            errorCodeMappings: [
                ['testCode', 'testStatusCode'],
            ],
        });

        const testError = {
            code: 'testCode',
            message: 'my custom error message',
        };

        handler.convertError(testError, null, null, (result) => {
            expect(result).to.be.an('Object');
            expect(result).to.have.property('code', testError.code);
            expect(result).to.have.property('message', testError.message);
            expect(result).to.have.property('status', 'testStatusCode');
        });
    });
});
