<script setup lang="ts">
import { ref } from 'vue'
import type { CityDataResponse } from "@/stores/CityDataStore"
import { useCityDataStore } from "@/stores/CityDataStore"

const store = useCityDataStore();

console.log(store.currentWeather);

function objectNotEmpty(target: object)
{
    for(var prop in target)
        return true;
    return false;
}

</script>

<template>
    <div v-if="objectNotEmpty(store.currentWeather)" class="current-weather-block">
        <div class="main-info">
                <h1>Current weather</h1>
                <img class="weather-img" :src="store.currentWeather.current.condition.icon">
                <text class="temp"> {{ store.currentWeather.current.temp_c }}°C </text>
                <text class="temp-feels-like"> feels like {{ store.currentWeather.current.feelslike_c }}°C </text>
                <p></p>
                <text class="weather-text"> {{ store.currentWeather.current.condition.text }} </text>
                <p></p>
                <text class="last-update-text"> Last update: {{ store.currentWeather.current.last_updated }} </text>
        </div>
        <div class="side-info">
            <img class="weather-img" :src="store.currentWeather.current.condition.icon">

        </div>
    </div>
</template>

<style scoped>

.current-weather-block {
    width: 100vw;
}

.current-weather-block div {
    width: 47.396%;
    min-width: 500px;
    display: inline-block;
    margin: 25px;
}
.main-info h1 {
    font-size: 50px;
}

.weather-img {
    position: relative;
    width: 128px;
    top: -10px;
}

.temp {
    position: relative;
    top: -50px;
    font-size: 70px;
}
.temp-feels-like {
    position: relative;
    top: -60px;
    font-size: 30px;
    color: #808080
}

.weather-text {
    position: relative;
    top: -45px;
    left: 5px;
    font-size: 20px;
}

.last-update-text {
    position: relative;
    float: right;
    right: 25px;
}

</style>
