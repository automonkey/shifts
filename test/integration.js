var request = require('supertest');

var app = require('../lib/app');

describe('date entry processing', function() {

  it('should return ics data', function(done) {

    const expectedIcsData =
      "BEGIN:VCALENDAR\n" +
      "VERSION:2.0\n" +
      "PRODID:-//hacksw/handcal//NONSGML v1.0//EN\n" +
      "BEGIN:VEVENT\n" +
      "UID:uid1@example.com\n" +
      "DTSTAMP:19970714T170000Z\n" +
      "ORGANIZER;CN=John Doe:MAILTO:john.doe@example.com\n" +
      "DTSTART:19970714T170000Z\n" +
      "DTEND:19970715T035959Z\n" +
      "SUMMARY:Bastille Day Party\n" +
      "END:VEVENT\n" +
      "END:VCALENDAR";

    request(app())
      .post('/')
      .expect(200)
      .expect(expectedIcsData, done);
  });

});
