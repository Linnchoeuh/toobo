<script setup lang="ts">
import { ref } from 'vue'
import { useCityDataStore } from "@/stores/CityDataStore"
import NextDaysWeatherTile from "@/components/day_forecast/NextDaysWeatherTile.vue"

const store = useCityDataStore();

const listo = ref<Array<number>>([]);

for (let i = 0; i < 5; ++i) {
    listo.value.push(3);
}


function objectNotEmpty(target: object)
{
    for(var prop in target)
        return true;
    return false;
}


</script>

<template>
    <div v-if="objectNotEmpty(store.forecast)" class="hourly-weather-block">
        <div class="title">
            <div class="title-sub">
                <h1>Next days forecast</h1>
            </div>
        </div>
        <div class="tile-list">
            <NextDaysWeatherTile v-for="day in store.forecast.forecast.forecastday"
            :image-url="day.day.condition.icon">
                <template #max-temp> {{ day.day.maxtemp_c }}</template>
                <template #min-temp> {{ day.day.mintemp_c }}</template>
                <template #date> {{ day.date }}</template>
                <template #avg-humidity> {{ day.day.avghumidity }}</template>
                <template #uv> {{ day.day.uv }}</template>
                <template #max-wind-spd> {{ day.day.maxwind_kph }}</template>
                <template #sunrise> {{ day.astro.sunrise }}</template>
                <template #sunset> {{ day.astro.sunset }}</template>
            </NextDaysWeatherTile>
        </div>
    </div>
</template>

<style scoped>

.hourly-weather-block {
    position: relative;
    margin-bottom: 100px;
}

.title {
    padding: 15px;
}

.title-sub {
    border-radius: 15px;
    padding: 15px;
    background-color: var(--tile-color);
}

.title-sub h1 {
    font-size: 50px;
}
@media (max-width:560px) {
    .title-sub h1 {
        font-size: 30px;
    }
}

.tile-list {
    position: relative;
}


</style>
