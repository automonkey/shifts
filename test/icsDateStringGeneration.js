const expect = require('chai').expect;

const icsDateStringGenerator = require('../lib/icsDateStringGenerator');

describe('ics date string generation', function() {

  it('should genetate ics string', function() {
    const date = new Date(2016, 10, 24, 15, 14, 13);
    const str = icsDateStringGenerator.generateIcsString(date);

    expect(str).to.equal("20161124T151413");
  });

  it('should zero pad values', function() {
    const date = new Date(2016, 0, 1, 1, 1, 1);
    const str = icsDateStringGenerator.generateIcsString(date);

    expect(str).to.equal("20160101T010101");
  });

});
