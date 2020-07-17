var datadata = require('../public/data/DXYArea-TimeSeries.json');
var data = new Object(datadata);
var provinces = [
  '北京市',
  '河北省',
  '山西省',
  '辽宁省',
  '吉林省',
  '黑龙江省',
  '江苏省',
  '浙江省',
  '安徽省',
  '福建省',
  '江西省',
  '山东省',
  '河南省',
  '湖北省',
  '湖南省',
  '广东省',
  '海南省',
  '四川省',
  '贵州省',
  '云南省',
  '陕西省',
  '甘肃省',
  '青海省',
  '天津市',
  '上海市',
  '重庆市',
  '内蒙古自治区',
  '广西壮族自治区',
  '西藏自治区',
  '宁夏回族自治区',
  '新疆维吾尔自治区',
  '台湾',
  '香港',
  '澳门',
];
var getCountryBasic = function (req, res) {
  let start = req.query.start;
  let end = req.query.end;

  let resdata = {
    status: 200,
    all_confirmed: 0,
    all_death: 0,
    all_cure: 0,
    country_data: [],
  };

  if (Date.parse(end) < Date.parse('2020/3/15')) {
    let datas = data.filter(
      (item) =>
        item.updateTime >= Date.parse(start) &&
        item.updateTime < Date.parse(end) + 86400000
    );
    let obj = {};
    let tempobj = {};
    for (let i = 0; i < provinces.length; i++) {
      let datat = datas.filter((item) => item.provinceName === provinces[i]);
      let datad = datat.map(function (d) {
        let temp = {
          pro_confirmed: d.confirmedCount,
          pro_death: d.deadCount,
          pro_cure: d.curedCount,
          time: new Date(d.updateTime).toDateString(),
        };
        return temp;
      });
      let datam = {};
      datad.forEach(function (d) {
        if (!datam[d.time]) {
          datam[d.time] = d;
        }
        if (!obj[d.time]) {
          obj[d.time] = '1';
        }
      });

      tempobj[provinces[i]] = datam;
    }

    let tempArr = [];
    for (let dat of Object.keys(obj)) {
      let citem = {
        time: dat,
        confirmed: 0,
        death: 0,
        cure: 0,
      };
      for (let i = 0; i < provinces.length; i++) {
        if (tempobj[provinces[i]][dat]) {
          citem.confirmed += tempobj[provinces[i]][dat]['pro_confirmed'];
          citem.death += tempobj[provinces[i]][dat]['pro_death'];
          citem.cure += tempobj[provinces[i]][dat]['pro_cure'];
        }
      }
      tempArr.push(citem);
    }
    resdata.country_data = tempArr.sort(function (a, b) {
      return Date.parse(a.time) > Date.parse(b.time) ? 1 : -1;
    });
    resdata.all_confirmed =
      resdata.country_data[resdata.country_data.length - 1].confirmed;
    resdata.all_death =
      resdata.country_data[resdata.country_data.length - 1].death;
    resdata.all_cure =
      resdata.country_data[resdata.country_data.length - 1].cure;
  } else if (Date.parse(start) >= Date.parse('2020/3/15')) {
    let datas2 = data.filter(
      (item) =>
        item.updateTime >= Date.parse(start) &&
        item.updateTime < Date.parse(end) + 86400000
    );
    let datat2 = datas2.filter((item) => item.provinceName === '中国');
    let datad2 = datat2.map(function (d) {
      let temp = {
        confirmed: d.confirmedCount,
        death: d.deadCount,
        cure: d.curedCount,
        time: new Date(d.updateTime).toDateString(),
      };
      return temp;
    });

    let datam2 = [];
    let obj2 = {};
    datad2.forEach(function (d) {
      if (!obj2[d.time]) {
        obj2[d.time] = 'lap';
        datam2.push(d);
      }
    });
    resdata.country_data = datam2.sort(function (a, b) {
      return Date.parse(a.time) > Date.parse(b.time) ? 1 : -1;
    });
    resdata.all_confirmed =
      resdata.country_data[resdata.country_data.length - 1].confirmed;
    resdata.all_death =
      resdata.country_data[resdata.country_data.length - 1].death;
    resdata.all_cure =
      resdata.country_data[resdata.country_data.length - 1].cure;
  } else {
    let datas = data.filter(
      (item) =>
        item.updateTime >= Date.parse(start) &&
        item.updateTime < Date.parse('2020/3/15')
    );
    let obj = {};
    let tempobj = {};
    for (let i = 0; i < provinces.length; i++) {
      let datat = datas.filter((item) => item.provinceName === provinces[i]);
      let datad = datat.map(function (d) {
        let temp = {
          pro_confirmed: d.confirmedCount,
          pro_death: d.deadCount,
          pro_cure: d.curedCount,
          time: new Date(d.updateTime).toDateString(),
        };
        return temp;
      });
      let datam = {};
      datad.forEach(function (d) {
        if (!datam[d.time]) {
          datam[d.time] = d;
        }
        if (!obj[d.time]) {
          obj[d.time] = '1';
        }
      });

      tempobj[provinces[i]] = datam;
    }

    let tempArr = [];
    for (let dat of Object.keys(obj)) {
      let citem = {
        time: dat,
        confirmed: 0,
        death: 0,
        cure: 0,
      };
      for (let i = 0; i < provinces.length; i++) {
        if (tempobj[provinces[i]][dat]) {
          citem.confirmed += tempobj[provinces[i]][dat]['pro_confirmed'];
          citem.death += tempobj[provinces[i]][dat]['pro_death'];
          citem.cure += tempobj[provinces[i]][dat]['pro_cure'];
        }
      }
      tempArr.push(citem);
    }

    let datas2 = data.filter(
      (item) =>
        item.updateTime >= Date.parse('2020/3/15') &&
        item.updateTime < Date.parse(end) + 86400000
    );
    let datat2 = datas2.filter((item) => item.provinceName === '中国');
    let datad2 = datat2.map(function (d) {
      let temp = {
        confirmed: d.confirmedCount,
        death: d.deadCount,
        cure: d.curedCount,
        time: new Date(d.updateTime).toDateString(),
      };
      return temp;
    });

    let datam2 = [];
    let obj2 = {};
    datad2.forEach(function (d) {
      if (!obj2[d.time]) {
        obj2[d.time] = 'lap';
        datam2.push(d);
      }
    });
    resdata.country_data = tempArr.concat(datam2).sort(function (a, b) {
      return Date.parse(a.time) > Date.parse(b.time) ? 1 : -1;
    });
    resdata.all_confirmed =
      resdata.country_data[resdata.country_data.length - 1].confirmed;
    resdata.all_death =
      resdata.country_data[resdata.country_data.length - 1].death;
    resdata.all_cure =
      resdata.country_data[resdata.country_data.length - 1].cure;
  }
  res.send(resdata);
};
module.exports = getCountryBasic;
