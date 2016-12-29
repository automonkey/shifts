const dateString = require('./icsDateStringGenerator');

module.exports.generate = dates => {

  const dateStrings = dates.map(x => {
    const from = dateString.generateIcsString(x.from);
    const to = dateString.generateIcsString(x.to);

    return "DTSTART;TZID=Europe/London:" + from  + "\n" +
      "DTEND;TZID=Europe/London:" + to + "\n"
  }).join('');

  return "" +
    "BEGIN:VCALENDAR\n" +
    "VERSION:2.0\n" +
    "PRODID:-//hacksw/handcal//NONSGML v1.0//EN\n" +
    "BEGIN:VEVENT\n" +
    "UID:uid1@example.com\n" +
    "DTSTAMP:19970714T170000Z\n" +
    "ORGANIZER;CN=John Doe:MAILTO:john.doe@example.com\n" +
    dateStrings +
    "SUMMARY:Bastille Day Party\n" +
    "END:VEVENT\n" +
    "END:VCALENDAR";
};
