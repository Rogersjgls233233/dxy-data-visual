
<template>
  <el-card class="box-card map" body-style="height:80%;padding:0">
    <div id="map"></div>
  </el-card>
</template>

<script>
import * as L from "leaflet";
import ChinaCoordinates from "../assets/data/ChinaCoordinates.json";
export default {
  data() {
    return {
      msg: "welcome to ",
      map: null
    };
  },
  mounted() {
    this.loadmap();
    this.drawProvinces();
  },
  methods: {
    loadmap() {
      this.map = L.map("map", {
        minZoom: 3,
        maxZoom: 14,
        // center: [38.240018034923, 110.13066322374],
        center: [34, 110.13066322374],
        zoom: 3,
        zoomControl: false,
        attributionControl: false,
        crs: L.CRS.EPSG3857
      });

      L.tileLayer(
        "http://webrd0{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}",
        {
          subdomains: ["1", "2", "3", "4"],
          attribution: "高德"
        }
      ).addTo(this.map);
    },
    drawProvinces() {
      var that = this;
      Object.keys(ChinaCoordinates).forEach(function(d) {
        var lg = L.polygon(ChinaCoordinates[d].coordinates, {
          color: "gray",
          fillColor: "black",
          fillOpacity: 0.1
        }).addTo(that.map);
        lg.on("click", function(e) {
          // 向vuex进行推送
          that.$store.commit("provinceChange", d);

          console.log("省改变为", that.$store.state.provinceName);
          that.map.flyTo(e.latlng, 5);
        });
        lg.on("mouseover", function(d) {ss
          d.sourceTarget.setStyle({
            color: "gray",
            weight: 5
          });
        }).on("mouseout", function(d) {
          d.sourceTarget.setStyle({
            color: "gray",
            weight: 3
          });
        });
      });
    }
  }
};
</script>

<style scoped>
#map {
  width: 100%;
  /* height: 300px; */
  height: 126%;
}
.map {
  width: 60%;
  height: 90%;
  /* display: flex;
  justify-content: center;
  align-items: center; */
}
.leaflet-container {
  /* overflow: visible; */
}
</style>