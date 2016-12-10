const expect = require('chai').expect;

const parser = require('../lib/dateParser');

describe('date parser', () => {

  it('should parse date', () => {

    const res = parser.processEntry(
        'Sept 24 2016 from 13:12:21 to 14:34:43');

    expect(res.errors).to.be.empty;

    const eventDateRange = res.date;

    expect(eventDateRange).to.have.property('from');
    const from = eventDateRange.from;
    expect(from.getFullYear()).to.equal(2016);
    expect(from.getMonth()).to.equal(8);
    expect(from.getDate()).to.equal(24);
    expect(from.getHours()).to.equal(13);
    expect(from.getMinutes()).to.equal(12);
    expect(from.getSeconds()).to.equal(21);

    expect(eventDateRange).to.have.property('to');
    const to = eventDateRange.to;
    expect(to.getFullYear()).to.equal(2016);
    expect(to.getMonth()).to.equal(8);
    expect(to.getDate()).to.equal(24);
    expect(to.getHours()).to.equal(14);
    expect(to.getMinutes()).to.equal(34);
    expect(to.getSeconds()).to.equal(43);
  });

  it('should error if empty input', () => {
    const res = parser.processEntry('');
    expect(res.date).to.be.null;
    expect(res.errors.indexOf('You gotta give me something...') > -1);
  });

  it('should error if invalid date', () => {
    const res = parser.processEntry('some garbage');
    expect(res.date).to.be.null;
    expect(res.errors.indexOf("What kind of a time is 'some garbage'?!" > -1));
  });

});
