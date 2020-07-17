# vis-final-project-frontend

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### 中国地理数据处理

地理边界数据来自全能地图下载器，导出的为各省的地理边界坐标的txt文件，所以要对数据进行整合处理

```js
var fs = require('fs');
var readLine = require('readline');
var async = require('async');
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
  '中国台湾',
  '中国香港',
  '中国澳门',
];
var ChinaCoordinates = {};
function readFileToArr(fReadName, cb) {
  var arr = [];
  var readObj = readLine.createInterface({
    input: fs.createReadStream(fReadName),
  });
  readObj.on('line', function (line) {
    arr.push([parseFloat(line.split(',')[1]), parseFloat(line.split(',')[0])]);
  });
  readObj.on('close', function () {
    console.log('readLine close....');
    cb(arr);
  });
}
// readFileToArr('浙江省.txt', function (arr) {
//   console.log(arr);
//   var str = JSON.stringify(arr);
//   fs.writeFile('zhejiang.json', str, function (err, data) {
//     if (err) {
//       console.error(err);
//     }
//     console.log('----------新增成功-------------');
//   });
// });
async.eachSeries(
  provinces,
  function (item, callback) {
    ChinaCoordinates[item] = {
      name: item,
      coordinates: [],
    };
    readFileToArr('省级边界数据/' + item + '.txt', function (arr) {
      ChinaCoordinates[item].coordinates = arr;
      callback(null, item);
    });
  },
  function (err) {
    var str = JSON.stringify(ChinaCoordinates);
    fs.writeFile('ChinaCoordinates.json', str, function (err, data) {
      if (err) {
        console.error(err);
      }
      console.log('----------新增成功-------------');
    });
  }
);

```

