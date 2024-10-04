<template>
  <div class="container">
    <h1 class="mt-3">Daily weather graph</h1>
    <current-information />
    <div class="row gy-3">
      <div class="col-lg-6">
        <h2 class="mt-2">Daily precipitation chance</h2>
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
        <h2 class="mt-2">Daily temperature</h2>
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

let xLabels = ref([]);
const temperatureUnit = localStorage.getItem("temperatureUnit");

function getHourlyWeather() {
  const apiUrl =
    "https://api.open-meteo.com/v1/forecast?latitude=36.71&longitude=3&daily=temperature_2m_max,precipitation_probability_max&timezone=auto&forecast_days=16";
  axios.get(apiUrl).then(
    (response) => {
      xLabels.value = response.data.daily.time;
      let temperature_2m = response.data.daily.temperature_2m_max;
      const precipitation_probability =
        response.data.daily.precipitation_probability_max;

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
              label: "Precipitation",
              fill: false,
              lineTension: 0,
              backgroundColor: "rgba(0,0,255,1.0)",
              borderColor: "rgba(0,0,255,0.5)",
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

      // Making the chart 2
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
