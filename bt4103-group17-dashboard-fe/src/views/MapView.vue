/* eslint-disable vue/multi-word-component-names */
<template>
    <div id="map"></div>
</template>

<script>
import mapboxgl from "mapbox-gl";
// eslint-disable-next-line vue/multi-word-component-names
export default {
  name: "MapView",
  mounted() {
    mapboxgl.accessToken = "pk.eyJ1Ijoiam9obm55dGhlc25ha2UxMiIsImEiOiJjbThlbWk2NjUwMzN5MmtvOWZoMXlyNGhlIn0.v6H0va5rhqStvQrriP-J6Q"; // Replace with your token

    const map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/dark-v11", 
      center: [105, 10], 
      zoom: 5,
    });

    map.on("load", () => {

      map.addSource("purchases", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [
            { type: "Feature", geometry: { type: "Point", coordinates: [103.8198, 1.3521] } }, // Singapore
            { type: "Feature", geometry: { type: "Point", coordinates: [100.5018, 13.7563] } }, // Bangkok
            { type: "Feature", geometry: { type: "Point", coordinates: [106.660172, 10.762622] } }, // Ho Chi Minh
            { type: "Feature", geometry: { type: "Point", coordinates: [101.6869, 3.139] } }, // Kuala Lumpur
            { type: "Feature", geometry: { type: "Point", coordinates: [120.9842, 14.5995] } }, // Manila
          ],
        },
      });

      map.addLayer({
        id: "heatmap",
        type: "heatmap",
        source: "purchases",
        paint: {
          "heatmap-weight": 1,
          "heatmap-intensity": 2,
          "heatmap-radius": 30,
          "heatmap-opacity": 0.8,
          "heatmap-color": [
            "interpolate",
            ["linear"],
            ["heatmap-density"],
            0, "rgba(33,102,172,0)",
            0.2, "rgb(103,169,207)",
            0.4, "rgb(209,229,240)",
            0.6, "rgb(253,219,199)",
            0.8, "rgb(239,138,98)",
            1, "rgb(178,24,43)",
          ],
        },
      });
    });
  },
};
</script>
<style scoped>
#map {
  width: 100%;
  height: 500px;
}
</style>
