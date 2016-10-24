const chrono = require('chrono-node');

module.exports.processEntry = function(entry) {
  if (entry.length === 0) {
    return {
      date: null,
      errors: [ 'No event data supplied' ]
    }
  }

  var results = chrono.parse(entry);

  return {
    date: {
      from: results[0].start.date(),
      to: results[0].end.date()
    },
    errors: null
  };
};
