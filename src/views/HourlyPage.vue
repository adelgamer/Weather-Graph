<template>
  <div class="container">
    <h1 class="mt-3">Hourly weather graph</h1>
    <!-- Time, date and location -->
    <CurrentInformation />
    <div class="row gy-3">
      <div class="col-lg-6">
        <h2 class="mt-2">Hourly Humidity, cloud cover and precipitation</h2>
        <canvas id="hourly-weather-graph"></canvas>
        <div
          v-if="xLabels.length === 0"
          class="d-flex justify-content-center align-items-center"
          style="height: 300px"
        >
          <div class="spinner-grow text-primary"></div>
        </div>
      </div>
      <div class="col-lg-6">
        <h2 class="mt-2">Hourly temperature</h2>
        <canvas id="hourly-weather-graph-temperature"></canvas>
        <div
          v-if="xLabels.length === 0"
          class="d-flex justify-content-center align-items-center"
          style="height: 300px"
        >
          <div class="spinner-grow text-primary"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import CurrentInformation from "@/components/CurrentInformation.vue";
import axios from "axios";
import { Chart } from "chart.js/auto";
import { ref } from "vue";
import { getLocalStorageCoordinate } from "@/utilities/utils";

let xLabels = ref([]);
const temperatureUnit = localStorage.getItem("temperatureUnit");

function getHourlyWeather() {
  // get the lat and lon from localstorage
  const coordinates = getLocalStorageCoordinate();
  const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${coordinates.lat}&longitude=${coordinates.lon}&hourly=temperature_2m,relative_humidity_2m,precipitation_probability,cloud_cover&timezone=auto&forecast_days=1`;
  axios.get(apiUrl).then(
    (response) => {
      xLabels.value = response.data.hourly.time.map((elements) =>
        elements.substring(11)
      );
      const cloud_cover = response.data.hourly.cloud_cover;
      const relative_humidity_2m = response.data.hourly.relative_humidity_2m;
      let temperature_2m = response.data.hourly.temperature_2m;
      const precipitation_probability =
        response.data.hourly.precipitation_probability;

      // Converting temperature to the selected unit
      if (temperatureUnit === "fahrenheit") {
        temperature_2m = temperature_2m.map((element) => {
          return (element * 9) / 5 + 32;
        });
      }

      // Making the chart 1
      new Chart("hourly-weather-graph", {
        type: "line",
        data: {
          labels: xLabels.value,
          datasets: [
            {
              label: "Humidty",
              fill: false,
              lineTension: 0,
              backgroundColor: "rgba(0,0,255,1.0)",
              borderColor: "rgba(0,0,255,0.5)",
              data: relative_humidity_2m,
            },
            {
              label: "Cloud",
              fill: false,
              lineTension: 0,
              backgroundColor: "rgba(0,255,0,1.0)",
              borderColor: "rgba(0,255,0,0.5)",
              data: cloud_cover,
            },
            {
              label: "Precipitation",
              fill: false,
              lineTension: 0,
              backgroundColor: "rgba(255,0,0,1.0)",
              borderColor: "rgba(255,0,0,0.5)",
              data: precipitation_probability,
            },
          ],
        },
        options: {
          legend: { display: false },
          scales: {
            y: {
              max: 100,
              min: 0,
            },
          },
        },
      });

      // Making the chart 1
      new Chart("hourly-weather-graph-temperature", {
        type: "line",
        data: {
          labels: xLabels.value,
          datasets: [
            {
              label: "Temperature",
              fill: false,
              lineTension: 0,
              backgroundColor: "rgba(255,0,0,1.0)",
              borderColor: "rgba(255,0,0,0.5)",
              data: temperature_2m,
            },
          ],
        },
        options: {
          legend: { display: false },
          scales: {
            y: {
              min: 0,
            },
          },
        },
      });
    },
    (error) => {
      console.log(error);
    }
  );
}
getHourlyWeather();
</script>
