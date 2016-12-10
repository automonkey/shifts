const expect = require('chai').expect;

const entryProcessor = require('../lib/entryProcessor');

describe('entryProcessor', () => {

    it('should return errors', () => {
        const result = entryProcessor.generateIcsData("invalid");
        expect(result.errors).to.have.length.of.at.least(1);
    });

});
