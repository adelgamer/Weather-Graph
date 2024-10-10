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

        <div
            class="mt-5"
            style="border: 1px solid #dee2e6; border-radius: 5px; padding: 20px"
        >
            <h5 class="h5">Choose a wilaya:</h5>
            <select
                v-model="currentWilaya"
                class="form-select"
                aria-label="Default select example"
            >
                <option
                    :value="wilaya"
                    :key="wilaya"
                    v-for="wilaya in listOfWilaya"
                >
                    {{ wilaya }}
                </option>
            </select>

            <h5 class="h5 mt-4">Choose a Baladia:</h5>
            <select
                v-model="currentCity"
                class="form-select"
                aria-label="Default select example"
            >
                <option v-for="city in listOfCities" :key="city" :value="city">
                    {{ city }}
                </option>
            </select>
            <button
                @click="saveLocation(currentWilaya, currentCity)"
                type="button"
                class="btn btn-success mt-2 w-100"
            >
                <i class="bi bi-floppy2-fill"></i> Save Location
            </button>
        </div>
    </div>
</template>
<script setup>
import { ref, watch } from "vue";
import {
    getWilayaList,
    getBaladiaList,
    getCurrentSetWilaya,
    getCurrentSetCity,
    saveLocation,
    setTemperatureUnit,
} from "../utilities/utils";

let temperatureUnit = ref("celsius");
let listOfWilaya = ref([]);
let listOfCities = ref([]);
let currentWilaya = ref(getCurrentSetWilaya());
let currentCity = ref(getCurrentSetCity());

// Trying to get the current temperature unit from local storage
if (localStorage.getItem("temperatureUnit")) {
    temperatureUnit.value = localStorage.getItem("temperatureUnit");
} else {
    localStorage.setItem("temperatureUnit", "celsius");
}

watch(temperatureUnit, setTemperatureUnit(temperatureUnit.value));
watch(currentWilaya, () => {
    getWilayaList().then((response) => {
        listOfWilaya.value = response;
    });

    getBaladiaList(currentWilaya.value).then((response) => {
        listOfCities.value = response;

        // Preselecting a city
        if (!response.includes(getCurrentSetCity())) {
            currentCity.value = response[0];
        }
    });
});

getWilayaList().then((response) => {
    listOfWilaya.value = response;
});

getBaladiaList(currentWilaya.value).then((response) => {
    listOfCities.value = response;

    // Preselecting a city
    if (!response.includes(getCurrentSetCity())) {
        currentCity.value = response[0];
    }
});
</script>
