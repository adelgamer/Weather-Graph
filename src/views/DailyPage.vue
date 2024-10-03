<template>
  <div class="container">
    <h1 class="mt-3">Daily weather graph</h1>
    <current-information />
    <canvas id="daily-weather-graph"></canvas>
  </div>
</template>
<script setup>
import CurrentInformation from "@/components/CurrentInformation.vue";
</script>
