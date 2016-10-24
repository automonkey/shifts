const dateParser = require('./dateParser');
const icsDataGenerator = require('./icsDataGenerator');

module.exports.generateIcsData = function(entry) {
  const date = dateParser.processEntry(entry).date;
  return icsDataGenerator.generate(date);
};
