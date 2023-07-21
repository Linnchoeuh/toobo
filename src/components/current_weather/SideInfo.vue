<script setup lang="ts">

import SideInfoTile from "@/components/current_weather/SideInfoTile.vue"
import SunriseSunset from "@/components/current_weather/SunriseSunset.vue"
import humidityImg from "@/assets/water_humidity.png"
import windImg from "@/assets/wind.png"
import { useCSSResponsiveStore } from "@/stores/CSSResponsiveStore"
import { useCityDataStore } from "@/stores/CityDataStore"

const sunImgPath: string = "//cdn.weatherapi.com/weather/128x128/day/113.png";


const CSSRespStore = useCSSResponsiveStore();
const store = useCityDataStore();

function objectNotEmpty(target: object)
{
    for(var prop in target)
        return true;
    return false;
}

</script>

<template>

<div class="side-info">
    <div>
        <SideInfoTile :image-url="sunImgPath">
            <template #title> UV Level </template>
            {{ store.currentWeather.current.uv }}
        </SideInfoTile>
    </div>
    <div>
        <SideInfoTile :image-url="humidityImg">
            <template #title> Humidity </template>
            {{ store.currentWeather.current.humidity }}%
        </SideInfoTile>
    </div>
    <div>
        <SideInfoTile :image-url="windImg">
            <template #title> Wind </template>
            {{ store.currentWeather.current.wind_kph }} km/h
        </SideInfoTile>
    </div>
    <div>
        <SunriseSunset v-if="objectNotEmpty(store.forecast)">
            <template #sunrise> {{ store.forecast.forecast.forecastday[0].astro.sunrise }} </template>
            <template #sunset> {{ store.forecast.forecast.forecastday[0].astro.sunset }} </template>
        </SunriseSunset>
    </div>
</div>

</template>

<style scoped>

.side-info {
    display: grid;
    height: 100%;
    grid-template-columns: 50% 50%;
}

.side-info > div {
    /* width: 50%;
    display: inline-block; */
    /* height: 163px; */
}

</style>
