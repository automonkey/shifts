const expect = require('chai').expect
    , mockery = require('mockery')
    , sinon = require('sinon');

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

  describe('event id generation', () => {

    let uuidGeneratorStub;
    let stubbedIcsDataGenerator;

    before(() => {
      mockery.enable({
        warnOnReplace: false,
        warnOnUnregistered: false,
        useCleanCache: true
      });

      uuidGeneratorStub = sinon.stub();

      mockery.registerMock('./uuidGenerator', uuidGeneratorStub);
      stubbedIcsDataGenerator = require('../lib/icsDataGenerator');
    });

    after(() => {
      mockery.disable();
    });

    it('should generate events with unique ids', () => {
      uuidGeneratorStub.returns('some-random-event-id');

      const icsData = stubbedIcsDataGenerator.generate(
        {
          from: new Date(2016, 11, 29, 1, 31),
          to: new Date(2016, 11, 29, 1, 35)
        }
      );

      const events = extractEvents(icsData);
      expect(events).to.have.length.of(1);

      const eventIds = extractEventIds(events[0]);
      expect(eventIds).to.have.length.of(1);
      expect(eventIds[0]).to.equal('some-random-event-id@shifts.benyon.io');
    });

  });

});

function extractEvents(icsData) {
  return icsData.match(/^BEGIN:VEVENT[\s\S]+?END:VEVENT$/gm);
}

function extractEventIds(icsEventData) {
  return matchAndExtractCaptureGroups(icsEventData, /^UID:(.*)$/gm)
    .map(entry => {
      return entry[0];
    });
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