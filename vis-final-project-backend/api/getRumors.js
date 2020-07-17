var data_origin = require('../public/data/DXYRumors-TimeSeries.json');
var getRumors = function (req, res) {
  let start = req.query.start;
  let end = req.query.end;
  let data = {
    status: 200,
    rumors: [],
  };
  let data_s = data_origin
    .filter(
      (item) =>
        item.crawlTime >= Date.parse(start) &&
        item.crawlTime < Date.parse(end) + 86400000
    )
    .sort((a, b) => {
      a.crawlTime < b.crawlTime ? 1 : -1;
    });
  data.rumors = data_s;
  res.send(data);
};
module.exports = getRumors;
