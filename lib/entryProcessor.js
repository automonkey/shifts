const dateParser = require('./dateParser');
const icsDataGenerator = require('./icsDataGenerator');

module.exports.generateIcsData = entry => {
  const response = dateParser.processEntry(entry);

  let data = null;
  if (response.errors.length === 0) {
    data = icsDataGenerator.generate(response.dates);
  }

  return {
    data: data,
    errors: response.errors
  }
};
