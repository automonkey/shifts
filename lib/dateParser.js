const chrono = require('chrono-node');

module.exports.processEntry = function(entry) {
  var results = chrono.parse(entry);

  return {
    from: results[0].start.date(),
    to: results[0].end.date()
  };
};
