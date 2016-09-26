const dateParser = require('./dateParser');
const icsDataGenerator = require('./icsDataGenerator');

module.exports.generateIcsData = function(entry) {
  const dates = dateParser.processEntry(entry);
  return icsDataGenerator.generate(dates);
};
