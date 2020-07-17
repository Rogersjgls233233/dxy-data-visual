var Newsdata = require('../public/data/DXYNews-TimeSeries.json');
var getCountryNewsCN = function (req, res) {
  let start = req.query.start;
  let end = req.query.end;
  let data = {
    status: 200,
    news_pro: [],
  };
  var dx = Newsdata.filter(
    (item) =>
      item.provinceName === '全国' &&
      item.pubDate >= Date.parse(start) &&
      item.pubDate < Date.parse(end) + 86400000
  ).sort(function (a, b) {
    return a.pubDate > b.pubDate ? 1 : -1;
  });
  dx.forEach(function (d) {
    let ni = {};
    ni.news_id = d.id;
    ni.news_link = d.sourceUrl;
    ni.news_title = d.title;
    ni.news_time = d.pubDate;
    ni.news_owner = d.infoSource;
    data.news_pro.push(ni);
  });
  let datam = [];
  let obj = {};
  data.news_pro.forEach(function (d) {
    if (!obj[d.news_id]) {
      obj[d.news_id] = 'lap';
      datam.push(d);
    }
  });
  data.news_pro = datam;
  res.send(data);
};
module.exports = getCountryNewsCN;
