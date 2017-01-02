const expect = require('chai').expect;

const icsDataGenerator = require('../lib/icsDataGenerator');

describe('ics data generator', () => {

  it('should generate events with supplied date/times', () => {
    const icsData = icsDataGenerator.generate(
      {
        from: new Date(2016, 11, 29, 1, 31),
        to: new Date(2016, 11, 29, 1, 35)
      }
    );

    const events = extractEvents(icsData);
    expect(events).to.have.length.of(1);

    const eventData = events[0];

    const startDates = extractStartDates(eventData);
    expect(startDates).to.have.length.of(1);
    expect(startDates).to.include({
      timezone: 'Europe/London',
      datetime: '20161229T013100'});

    const endDates = extractEndDates(eventData);
    expect(endDates).to.have.length.of(1);
    expect(endDates).to.include({
      timezone: 'Europe/London',
      datetime: '20161229T013500'});
  });

});

function extractEvents(icsData) {
  return icsData.match(/^BEGIN:VEVENT[\s\S]+?END:VEVENT$/gm);
}

function extractStartDates(icsEventData) {
  return extractTimezoneDateTime(icsEventData, 'DTSTART');
}

function extractEndDates(icsEventData) {
  return extractTimezoneDateTime(icsEventData, 'DTEND');
}

function extractTimezoneDateTime(icsEventData, key) {
  const regex = new RegExp('^' + key + '(?:;TZID=)?(.*)?:(.*)$', 'gm');
  const entries = matchAndExtractCaptureGroups(icsEventData, regex);
  return entries.map(entry => {
    return {
      timezone: entry[0],
      datetime: entry[1]
    }
  });
}

function matchAndExtractCaptureGroups(data, regex) {
  let captureGroups = [];

  let match = null;
  do {
    match = regex.exec(data);
    if (match !== null) {
      captureGroups.push(match.slice(1));
    }
  }
  while (match !== null);

  return captureGroups;
}