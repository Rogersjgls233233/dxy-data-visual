var wordsData = require('../public/data/News_Time.json');
var getWordList = function (req, res) {
  let start = req.query.start;
  let end = req.query.end;
  let data = {
    status: 200,
    news_pro: [],
  };
  var dx = wordsData
    .filter(
      (item) =>
        item.pubDate >= Date.parse(start) &&
        item.pubDate < Date.parse(end) + 86400000 &&
        !item.provinceName
    )
    .sort(function (a, b) {
      return a.pubDate > b.pubDate ? 1 : -1;
    });
  dx.forEach(function (d) {
    let ni = {};
    ni.news_words = d.wordList;
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

  let dateTemp = '';
  let dateIcon = -1;

  data.news_pro = datam.map(function (item) {
    let tempItem = { ...item };
    if (new Date(tempItem.news_time).toDateString() !== dateTemp) {
      dateTemp = new Date(tempItem.news_time).toDateString();
      dateIcon++;
      tempItem['dateNum'] = dateIcon;
    } else {
      tempItem['dateNum'] = dateIcon;
    }
    // console.log(tempItem);

    return tempItem;
  });

  res.send(data);
};
module.exports = getWordList;
