<template>
  <div class="container">
    <h1 class="mt-3">Current weather</h1>
    <current-information />
    <div class="w-100">
      <div class="row mt-5">
        <div class="col-6 h4">
          <i class="bi bi-thermometer-half"></i> Temperature
        </div>
        <div class="col-6 h6 text-end">
          <div
            v-if="temperature_2m === ''"
            class="spinner-grow text-primary float-end"
          ></div>
          <div v-if="temperature_2m !== ''" class="float-end">
            {{ temperature_2m }}C
          </div>
        </div>
      </div>
      <div class="row mt-5">
        <div class="col-6 h4"><i class="bi bi-droplet"></i> Humidity</div>
        <div class="col-6 h6 text-end">
          <div
            v-if="relative_humidity_2m === ''"
            class="spinner-grow text-primary float-end"
          ></div>
          <div v-if="relative_humidity_2m !== ''" class="float-end">
            {{ relative_humidity_2m }}%
          </div>
        </div>
      </div>
      <div class="row mt-5">
        <div class="col-6 h4">
          <i class="bi bi-cloudy"></i> Cloud percentage
        </div>
        <div class="col-6 h6 text-end">
          <div
            v-if="cloud_cover === ''"
            class="spinner-grow text-primary float-end"
          ></div>
          <div v-if="cloud_cover !== ''" class="float-end">
            {{ cloud_cover }}%
          </div>
        </div>
      </div>
      <div class="row mt-5">
        <div class="col-6 h4"><i class="bi bi-cloud-drizzle"></i> Rain</div>
        <div class="col-6 h6 text-end">
          <div
            v-if="precipitation === ''"
            class="spinner-grow text-primary float-end"
          ></div>
          <div v-if="precipitation !== ''" class="float-end">
            {{ precipitation }}mm
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// Imports
import axios from "axios";
import { ref, onMounted } from "vue";
import CurrentInformation from "@/components/CurrentInformation.vue";

export default {
  components: { CurrentInformation },
  setup() {
    // Defining reactive variables
    const temperature_2m = ref("");
    const relative_humidity_2m = ref("");
    const cloud_cover = ref("");
    const precipitation = ref("");

    // Get the current weather conditions
    function RequestCurrentWeather() {
      const apiUrl =
        "https://api.open-meteo.com/v1/forecast?latitude=36.71&longitude=3&current=temperature_2m,relative_humidity_2m,precipitation,cloud_cover&timezone=auto&forecast_days=1";
      axios.get(apiUrl).then(
        (response) => {
          const result = response.data;

          temperature_2m.value = result.current.temperature_2m;
          relative_humidity_2m.value = result.current.relative_humidity_2m;
          cloud_cover.value = result.current.cloud_cover;
          precipitation.value = result.current.precipitation;
        },
        (error) => {
          console.log(error);
        }
      );
    }

    onMounted(() => {
      // Calling the function to request weather data
      RequestCurrentWeather();
    });

    return {
      temperature_2m,
      relative_humidity_2m,
      cloud_cover,
      precipitation,
    };
  },
};
</script>
