<script setup lang="ts">
import { ref } from 'vue'
import type { CityDataResponse } from "@/stores/CityDataStore"
import { useCityDataStore } from "@/stores/CityDataStore"
import SideInfo from "@/components/SideInfo.vue"

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
            <div class="main-info-sub">
                <h1>Current weather</h1>
                <img class="weather-img" :src="store.currentWeather.current.condition.icon">
                <text class="temp"> {{ store.currentWeather.current.temp_c }}°C </text>
                <text class="temp-feels-like"> feels like {{ store.currentWeather.current.feelslike_c }}°C </text>
                <p></p>
                <text class="weather-text"> {{ store.currentWeather.current.condition.text }} </text>
                <text class="last-update-text"> Last update: {{ store.currentWeather.current.last_updated }} </text>
            </div>
        </div>
        <div class="side-info">
            <SideInfo>
                <template #title> UV Index </template>
                This might work
            </SideInfo>
            <SideInfo>
                <template #title> Humidity </template>
                {{ store.currentWeather.current.humidity }}%
            </SideInfo>
            <SideInfo>
                <template #title> Wind </template>
                {{ store.currentWeather.current.wind_kph }} km/h
            </SideInfo>
            <SideInfo>
                <template #title> Sunrise </template>
                This might work
            </SideInfo>
        </div>
    </div>
</template>

<style scoped>

.current-weather-block {
    width: 100vw;
}

.current-weather-block > div {
    width: 50%;
    display: inline-block;
    vertical-align: middle;
}
@media (max-width:1100px) {
    .current-weather-block > div {
        width: 100%;
    }
}

.main-info {
    padding: 15px;
}

.main-info-sub {
    border-radius: 15px;
    padding: 15px;
    background-color: rgba(255, 255, 255, 0.03);
}


.side-info > div {
    width: 50%;
    display: inline-block;
    height: 163px;
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
    top: 10px;
}

</style>
