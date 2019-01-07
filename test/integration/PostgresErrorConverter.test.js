const { expect } = require('chai');
const { before, describe, it } = require('mocha');

const PostgresErrorConverter = require('../../src/PostgresErrorConverter.js');

describe('The PostgresErrorConverter Class', () => {

    before(async function() {
        this.handler = new PostgresErrorConverter();

        const { Author, Book } = this.service.app.models;

        this.testData = {
            author: await Author.create({ name: 'Test Author' }),
        };

        this.testData.book = await Book
            .create({
                title: 'Test Book',
                author_id: this.testData.author.id,
            });
    });

    it('maps a foreign key violation database error to a 406', async function() {
        const { body: { error } } = await this.service.api
            .post('Books')
            .send({ title: 'foo', author_id: 0 })
            .ok(() => true);

        expect(error).to.be.a('Object');
        expect(error).have.a.property('statusCode', 406);
        expect(error).have.a.property('message', 'insert or update on table "Book" violates foreign key constraint "boot_author_id_fk"');
    });
});
