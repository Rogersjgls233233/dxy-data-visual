var data_origin = require('../public/data/DXYOverall-TimeSeries.json');
var getWorldBasic = function (req, res) {
  let start = req.query.start;
  let end = req.query.end;
  let data = {
    status: 200,
    worldData: [],
  };
  var data_s = [];
  data_origin.forEach((item) => {
    if (item.globalStatistics) {
      let temp = {
        globalStatistics: item.globalStatistics,
        updateTime: item.updateTime,
      };
      data_s.push(temp);
    }
  });
  var data_m = data_s
    .filter(
      (item) =>
        item.updateTime >= Date.parse(start) &&
        item.updateTime < Date.parse(end) + 86400000
    )
    .sort(function (a, b) {
      return a.updateTime > b.updateTime ? 1 : -1;
    })
    .map(function (item) {
      let temp = {
        globalStatistics: item.globalStatistics,
        updateTime: new Date(item.updateTime).toDateString(),
      };
      return temp;
    });
  let datam = [];
  let obj = {};
  data_m.forEach(function (d) {
    if (!obj[d.updateTime]) {
      obj[d.updateTime] = 'lap';
      datam.push(d);
    }
  });
  data.worldData = datam;
  res.send(data);
};
module.exports = getWorldBasic;
