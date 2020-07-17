var datadata = require('../public/data/DXYArea-TimeSeries.json');
var data = new Object(datadata);
var provinces = [
  {
    pv_name: '北京市',
    pv_population: 2170.7,
    pv_area: 1.68,
  },
  { pv_name: '河北省', pv_population: 7519.52, pv_area: 18.77 },
  { pv_name: '山西省', pv_population: 3702.35, pv_area: 15.63 },
  { pv_name: '辽宁省', pv_population: 4368.9, pv_area: 14.59 },
  { pv_name: '吉林省', pv_population: 2717.43, pv_area: 18.74 },
  { pv_name: '黑龙江省', pv_population: 3788.7, pv_area: 47.3 },
  { pv_name: '江苏省', pv_population: 8029.3, pv_area: 10.26 },
  { pv_name: '浙江省', pv_population: 5657, pv_area: 10.2 },
  { pv_name: '安徽省', pv_population: 6254.8, pv_area: 13.97 },
  { pv_name: '福建省', pv_population: 3911, pv_area: 12.13 },
  { pv_name: '江西省', pv_population: 4622.1, pv_area: 16.7 },
  { pv_name: '山东省', pv_population: 10005.83, pv_area: 15.38 },
  { pv_name: '河南省', pv_population: 9559.13, pv_area: 16.7 },
  { pv_name: '湖北省', pv_population: 5902, pv_area: 18.59 },
  { pv_name: '湖南省', pv_population: 6860.2, pv_area: 21.18 },
  { pv_name: '广东省', pv_population: 11169, pv_area: 18 },
  { pv_name: '海南省', pv_population: 925.76, pv_area: 3.4 },
  { pv_name: '四川省', pv_population: 8302, pv_area: 48.14 },
  { pv_name: '贵州省', pv_population: 3580, pv_area: 17.6 },
  { pv_name: '云南省', pv_population: 4800.5, pv_area: 38.33 },
  { pv_name: '陕西省', pv_population: 3835.44, pv_area: 20.56 },
  { pv_name: '甘肃省', pv_population: 2625.71, pv_area: 45.44 },
  { pv_name: '青海省', pv_population: 598.38, pv_area: 72.23 },
  { pv_name: '天津市', pv_population: 1556.87, pv_area: 1.13 },
  { pv_name: '上海市', pv_population: 2418.33, pv_area: 0.63 },
  { pv_name: '重庆市', pv_population: 3048.43, pv_area: 8.23 },
  { pv_name: '内蒙古自治区', pv_population: 2528.6, pv_area: 118.3 },
  { pv_name: '广西壮族自治区', pv_population: 4885, pv_area: 23.6 },
  { pv_name: '西藏自治区', pv_population: 337.15, pv_area: 122.8 },
  { pv_name: '宁夏回族自治区', pv_population: 681.79, pv_area: 6.64 },
  { pv_name: '新疆维吾尔自治区', pv_population: 2444.67, pv_area: 166 },
  { pv_name: '台湾', pv_population: 2369, pv_area: 3.6 },
  { pv_name: '香港', pv_population: 743, pv_area: 0.1101 },
  { pv_name: '澳门', pv_population: 63.2, pv_area: 0.00328 },
];
var getAllProvinceBasic = function (req, res) {
  let start = req.query.start;
  let end = req.query.end;
  let resdata = {
    status: 200,
    province: [],
  };
  let datas = data.filter(
    (item) =>
      item.updateTime >= Date.parse(start) &&
      item.updateTime < Date.parse(end) + 86400000
  );

  for (let i = 0; i < provinces.length; i++) {
    let pItem = {
      pro_name: provinces[i].pv_name,
      pro_area: provinces[i].pv_area,
      pro_population: provinces[i].pv_population,
      pro_whole: {
        confirmed: '感染总数',
        death: '死亡总数',
        cure: '治愈总数',
      },
      pro_data: [],
      pro_city: [],
    };
    let datat = datas.filter(
      (item) => item.provinceName === provinces[i].pv_name
    );
    let flag = false;
    let cityd = [];
    if (new Object(datat[0]).hasOwnProperty('cities')) {
      cityd = datat[0].cities;
      flag = true;
    }

    let datad = datat.map(function (d) {
      let temp = {
        pro_confirmed: d.confirmedCount,
        pro_death: d.deadCount,
        pro_cure: d.curedCount,
        time: new Date(d.updateTime).toDateString(),
      };
      return temp;
    });
    let datam = [];
    let obj = {};
    datad.forEach(function (d) {
      if (!obj[d.time]) {
        obj[d.time] = 'lap';
        datam.push(d);
      }
    });
    datam.sort(function (a, b) {
      return Date.parse(a.time) > Date.parse(b.time) ? 1 : -1;
    });
    pItem.pro_data = datam;
    for (let l = datam.length - 1; l >= 0; l--) {
      if (datam[l]) {
        pItem.pro_whole.confirmed = datam[l].pro_confirmed;
        pItem.pro_whole.death = datam[l].pro_death;
        pItem.pro_whole.cure = datam[l].pro_cure;
      }
      break;
    }
    if (flag) {
      pItem.pro_city = cityd.map(function (k) {
        let tempcity = {
          city_name: k.cityName,
          city_confirmed: k.confirmedCount,
          city_death: k.deadCount,
          city_cure: k.curedCount,
        };
        return tempcity;
      });
    }

    resdata.province.push(pItem);
  }
  res.send(resdata);
};
module.exports = getAllProvinceBasic;
