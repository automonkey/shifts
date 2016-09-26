module.exports.generateIcsString = function(date) {
  return '' +
    date.getFullYear() +
    zeroPaddedStr((date.getMonth() + 1)) +
    zeroPaddedStr(date.getDate()) +
    'T' +
    zeroPaddedStr(date.getHours()) +
    zeroPaddedStr(date.getMinutes()) +
    zeroPaddedStr(date.getSeconds());
};

function zeroPaddedStr(val) {
  const width = 2;

  val = val + '';
  return val.length >= width ?
    val :
    new Array(width - val.length + 1).join('0') + val;
};
