const expect = require('chai').expect;

const icsDataGenerator = require('../lib/icsDataGenerator');

describe('ics data generator', () => {

  it('should generate single event data', () => {
    const icsData = icsDataGenerator.generate(
      [{
        from: new Date(2016, 12, 29, 1, 31),
        to: new Date(2016, 12, 29, 1, 35)
      }]
    );

    const eventEntries = icsData.match(/BEGIN:VEVENT[\s\S]*END:VEVENT/);
    expect(eventEntries).to.have.length.of(1);

    const eventEntry = eventEntries[0];

    const startDates = eventEntry.match(/^DTSTART.*$/m);
    const endDates = eventEntry.match(/^DTSTART.*$/m);

    expect(startDates).to.have.length.of(1);
    expect(startDates).to.include('DTSTART;TZID=Europe/London:20170129T013100');

    expect(endDates).to.have.length.of(1);
    expect(endDates).to.include('DTSTART;TZID=Europe/London:20170129T013100');
  });

  it('should generate multi event data', () => {
    const icsData = icsDataGenerator.generate(
      [
        {
          from: new Date(2016, 12, 29, 1, 31),
          to: new Date(2016, 12, 29, 1, 35)
        },
        {
          from: new Date(2016, 12, 29, 1, 55),
          to: new Date(2016, 12, 29, 1, 58)
        }
      ]
    );

    const eventEntries = icsData.match(/BEGIN:VEVENT[\s\S]*END:VEVENT/);
    expect(eventEntries).to.have.length.of(2);

    const firstEventEntry = eventEntries[0];

    const firstEventStartDates = firstEventEntry.match(/^DTSTART.*$/m);
    const firstEventEndDates = firstEventEntry.match(/^DTSTART.*$/m);

    expect(firstEventStartDates).to.have.length.of(1);
    expect(firstEventStartDates).to.include('DTSTART;TZID=Europe/London:20170129T013100');

    expect(firstEventEndDates).to.have.length.of(1);
    expect(firstEventEndDates).to.include('DTSTART;TZID=Europe/London:20170129T013100');

    const secondEventEntry = eventEntries[0];

    const secondEventStartDates = secondEventEntry.match(/^DTSTART.*$/m);
    const secondEventEndDates = secondEventEntry.match(/^DTSTART.*$/m);

    expect(secondEventStartDates).to.have.length.of(1);
    expect(secondEventStartDates).to.include('DTSTART;TZID=Europe/London:20170129T015500');

    expect(secondEventEndDates).to.have.length.of(1);
    expect(secondEventEndDates).to.include('DTSTART;TZID=Europe/London:20170129T015800');
  });

});