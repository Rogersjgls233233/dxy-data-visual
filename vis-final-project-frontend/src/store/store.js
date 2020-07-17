import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import { Message } from 'element-ui';
Vue.use(Vuex);
const store = new Vuex.Store({
  state: {
    startTime: '2020/1/23',
    endTime: '2020/4/1',
    // 0表示全国模式，1表示省模式
    mode: 0,
    timeSignal: 1,
    provinceSingal: 1,
    // 全国数据
    news_cn: [],
    // 省名
    provinceName: '',
    // 省新闻
    news_pro: [],
    // 各省的基本数据
    basic_pro: [],
    // 全国的每日数据
    basic_cn: {

    },
    // 男女确诊人数
    gender: [],
    testNum: 1,
  },
  getters: {
    test(state) {
      return state.testNum;
    },
    // 对象数组
    line_origin(state) {
      if (state.mode === 0) {
        let result = state.basic_cn.country_data;
        // 修改日期格式
        result.forEach((item) => {
          let t = new Date(item.time);
          item.time = t.toLocaleDateString();
        });
        return result;
      }
      else if (state.mode === 1) {
        // 挑选当前的省数据
        let result = state.basic_pro.find(function (curr) {
          return curr.pro_name === state.provinceName;
        });
        result.pro_data.forEach((item) => {
          let t = new Date(item.time);
          item.time = t.toLocaleDateString();
        });
        // console.log('line_origin', result.pro_data)
        return result.pro_data;
      }
    },
    line_name(state) {
      if (state.mode === 0) {
        return '全国';
      } else {
        return state.provinceName;
      }
    },
    histogram_origin(state) {
      if (state.mode === 0) {
        let result = state.basic_pro.map((item) => {
          let obj = {};
          obj.pro_name = item.pro_name;
          obj.whole_confirmed = item.pro_whole.confirmed;
          obj.whole_death = item.pro_whole.death;
          obj.whole_cure = item.pro_whole.cure;
          obj.confirmed_areaRate = obj.whole_confirmed / item.pro_area;
          obj.death_areaRate = obj.whole_death / item.pro_area;
          obj.cure_areaRate = obj.whole_cure / item.pro_area;
          obj.confirmed_populationRate =
            obj.whole_confirmed / item.pro_population;
          obj.death_populationRate = obj.whole_death / item.pro_population;
          obj.cure_populationRate = obj.whole_cure / item.pro_population;
          return obj;
        });
        return result;
      } else {
        // 挑选当前省的数据
        let result = state.basic_pro.find(function (curr) {
          return curr.pro_name === state.provinceName;
        });
        return result.pro_city;
      }
    },
    pie_origin(state) {
      let result = state.gender;
      result.maleArr = [];
      result.femaleArr = [];
      for (let i = 0; i < 10; i++) {
        let obj1 = {};
        let obj2 = {};
        obj1.value = state.gender.data['male'][i];
        obj2.value = state.gender.data['female'][i];
        obj1.name = state.gender.age[i];
        obj2.name = state.gender.age[i];

        result.maleArr.push(obj1);
        result.femaleArr.push(obj2);
      }

      return result;
    },
    num_origin(state) {
      if (state.mode === 0) {
        let result = {}
        result.confirmed = state.basic_cn.all_confirmed
        result.cure = state.basic_cn.all_cure
        result.death = state.basic_cn.all_death
        return result
      } else {
        let result = {}
        let res = state.basic_pro.find(function (curr) {
          return curr.pro_name === state.provinceName;
        });
        result.confirmed = res.pro_whole.confirmed
        result.cure = res.pro_whole.cure
        result.death = res.pro_whole.death
        return result
      }
    }
  },
  mutations: {
    testM(state) {
      state.testNum++;
    },
    timeChange(state, time) {
      state.startTime = time[0];
      state.endTime = time[1];
      state.timeSignal *= -1;
    },
    provinceChange(state, name) {
      state.provinceName = name;
      state.provinceSingal *= -1;
      state.mode = 1;
    },
    // 中国全国新闻数据
    news_cnChange(state, data) {
      state.news_cn = data;
    },
    // 某个省的新闻数据
    news_proChange(state, data) {
      state.news_pro = data;
    },
    // 省的具体数据
    basic_proChange(state, data) {
      state.basic_pro = data;
    },
    // 中国的每日数据
    basic_cnChange(state, data) {
      state.basic_cn = data;
    },
    // 全国的男女确诊人数
    genderChange(state, data) {
      state.gender = data;
    },
  },
  actions: {
    // 获取全国新闻数据
    async getCountryNewsCN() {
      const { data: newsData } = await axios.get(
        'http://127.0.0.1:3000/getCountryNewsCN',
        {
          params: {
            start: this.state.startTime,
            end: this.state.endTime,
          },
        }
      );
      console.log('调用了getCountryNewsCN接口:', newsData.news_pro);
      if (newsData.status !== 200) {
        // this.$message.error("出错了");
        Message.error('出错了');
      } else {
        this.commit('news_cnChange', newsData.news_pro);
      }
    },
    // 获取某省的新闻数据
    async getProvinceNewsCN() {
      const { data: newsData } = await axios.get(
        'http://127.0.0.1:3000/getProvinceNewsCN',
        {
          params: {
            province: this.state.provinceName,
            start: this.state.startTime,
            end: this.state.endTime,
          },
        }
      );
      console.log('调用了getProvinceNewsCN接口:', newsData.news_cn);
      if (newsData.status !== 200) {
        // this.$message.error("出错了");
        Message.error('出错了');
      } else {
        this.commit('news_proChange', newsData.news_cn);
      }
    },
    // 获取省的具体数据
    async getAllProvinceBasic() {
      const { data: provinceData } = await axios.get(
        'http://127.0.0.1:3000/getAllProvinceBasic',
        {
          params: {
            start: this.state.startTime,
            end: this.state.endTime,
          },
        }
      );
      console.log('调用了getAllProvinceBasic接口:', provinceData);
      if (provinceData.status !== 200) {
        // this.$message.error("出错了");
        Message.error('出错了');
      } else {
        this.commit('basic_proChange', provinceData.province);
      }
    },
    // 获取国家的具体数据
    async getCountryBasic() {
      const { data: countryData } = await axios.get(
        'http://127.0.0.1:3000/getCountryBasic',
        {
          params: {
            start: this.state.startTime,
            end: this.state.endTime,
          },
        }
      );
      console.log('调用了getCountryBasic接口:', countryData);
      if (countryData.status !== 200) {
        // this.$message.error("出错了");
        Message.error('出错了');
      } else {
        this.commit('basic_cnChange', countryData);
      }
    },
    // 获取全国的确诊男女人数
    async getCountryGender() {
      const { data: gender } = await axios.get(
        'http://127.0.0.1:3000/getGender'
        // ,
        // {
        //     params: {
        //         start: this.state.startTime,
        //         end: this.state.endTime
        //     }
        // }
      );
      console.log('调用了getGender接口:', gender);
      // if (gender.status !== 200) {
      //     Message.error('eee出错了')
      // } else {
      this.commit('genderChange', gender);
      // }
    },
  },
});
export default store;
