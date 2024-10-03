<template>
  <div class="container">
    <h1 class="mt-3">Hourly weather graph</h1>
    <CurrentInformation />
    <canvas id="hourly-weather-graph"></canvas>
  </div>
</template>
<script setup>
import CurrentInformation from "@/components/CurrentInformation.vue";
</script>
