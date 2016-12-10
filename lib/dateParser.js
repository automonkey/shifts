const chrono = require('chrono-node');

module.exports.processEntry = function(entry) {
  if (entry.length === 0) {
    return {
      date: null,
      errors: [ 'You gotta give me something...' ]
    }
  }

  const parsedDates = chrono.parse(entry);
  if (parsedDates.length === 0) {
    return {
      date: null,
      errors: [ invalidEntryError(entry) ]
    };
  }

  return {
    date: {
      from: parsedDates[0].start.date(),
      to: parsedDates[0].end.date()
    },
    errors: []
  };

  function invalidEntryError(entry) {
    return "What kind of a time is '" + entry + "'?!";
  }
};
