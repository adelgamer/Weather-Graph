<template>
  <div class="container">
    <h1 class="mt-3">Settings</h1>
    <h5 class="h5 mt-4">Choose a temperature unit:</h5>
    <select
      v-model="temperatureUnit"
      class="form-select"
      aria-label="Default select example"
    >
      <option value="celsius">Celsius</option>
      <option value="fahrenheit" selected>Fernheit</option>
    </select>
  </div>
</template>
<script setup>
import { ref, watch } from "vue";
let temperatureUnit = ref("celsius");

// Trying to get the current temperature unit from local storage
if (localStorage.getItem("temperatureUnit")) {
  temperatureUnit.value = localStorage.getItem("temperatureUnit");
} else {
  localStorage.setItem("temperatureUnit", "celsius");
}

// Function to set the temperature unit
function setTemperatureUnit() {
  localStorage.setItem("temperatureUnit", temperatureUnit.value);
}

watch(temperatureUnit, setTemperatureUnit);
</script>
