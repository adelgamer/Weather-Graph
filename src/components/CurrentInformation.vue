<template>
  <div>
    <div class="row mt-5">
      <div class="col-6 h6"><i class="bi bi-calendar-day"></i> {{ date }}</div>
      <div class="col-6 h6 text-end">
        <i class="bi bi-alarm"></i> {{ time }}
      </div>
    </div>
    <p><i class="bi bi-geo-alt"></i> Alger, Draria</p>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";

export default {
  name: "CurrentInformations",
  setup() {
    // Defining reactive variables
    const date = ref("20/11/2021");
    const time = ref("00:00:00");

    // Function to get the time
    function getTime() {
      let today = new Date();
      let h = (today.getHours() < 10 ? "0" : "") + today.getHours();
      let m = (today.getMinutes() < 10 ? "0" : "") + today.getMinutes();
      time.value = `${h}:${m}`;
    }
    getTime();

    // Function to get the date
    const getDate = () => {
      let today = new Date();
      let dd = (today.getDate() < 10 ? "0" : "") + today.getDate();
      let mm = (today.getMonth() + 1 < 10 ? "0" : "") + (today.getMonth() + 1);
      let yyyy = today.getFullYear();
      date.value = `${dd}/${mm}/${yyyy}`;
    };
    getDate();

    onMounted(() => {
      // Calling the time function every 10 seconds to update the time
      setInterval(() => {
        getTime();
      }, 10000);
    });

    return {
      date,
      time,
    };
  },
};
</script>
