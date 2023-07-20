<script setup lang="ts">
import { ref } from 'vue'
import type { CityDataResponse } from "@/stores/CityDataStore"
import { useCityDataStore } from "@/stores/CityDataStore"
import SideInfo from "@/components/current_weather/SideInfo.vue"
import MainInfo from "@/components/current_weather/MainInfo.vue"
import SunriseSunset from "@/components/current_weather/SunriseSunset.vue"
import humidityImg from "@/assets/water_humidity.png"
import windImg from "@/assets/wind.png"

const store = useCityDataStore();
const sunImgPath: string = "//cdn.weatherapi.com/weather/128x128/day/113.png";

function objectNotEmpty(target: object)
{
    for(var prop in target)
        return true;
    return false;
}

</script>

<template>
    <div v-if="objectNotEmpty(store.currentWeather)" class="current-weather-block">
        <MainInfo/>
        <div class="side-info">
            <div>
                <SideInfo :image-url="sunImgPath">
                    <template #title> UV Level </template>
                    {{ store.currentWeather.current.uv }}
                </SideInfo>
            </div>
            <div>
                <SideInfo :image-url="humidityImg">
                    <template #title> Humidity </template>
                    {{ store.currentWeather.current.humidity }}%
                </SideInfo>
            </div>
            <div>
                <SideInfo :image-url="windImg">
                    <template #title> Wind </template>
                    {{ store.currentWeather.current.wind_kph }} km/h
                </SideInfo>
            </div>
            <div>
                <SunriseSunset v-if="objectNotEmpty(store.forecast)">
                    <template #sunrise> {{ store.forecast.forecast.forecastday[0].astro.sunrise }} </template>
                    <template #sunset> {{ store.forecast.forecast.forecastday[0].astro.sunset }} </template>
                </SunriseSunset>
            </div>
        </div>
    </div>
</template>

<style scoped>

.current-weather-block {
    margin-bottom: 30px;
}

.current-weather-block > div {
    width: 50%;
    display: inline-block;
    vertical-align: middle;
}
@media (max-width:1500px) {
    .current-weather-block > div {
        width: 100%;
    }
}

.side-info {
    height: 327px;
}

.side-info > div {
    width: 50%;
    display: inline-block;
    height: 163px;
}




</style>
