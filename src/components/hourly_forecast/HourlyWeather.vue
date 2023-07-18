<script setup lang="ts">
import { ref } from 'vue'
import { useCityDataStore } from "@/stores/CityDataStore"
import HourlyWeatherTile from "@/components/hourly_forecast/HourlyWeatherTile.vue"

const store = useCityDataStore();

const listo = ref<Array<number>>([]);

for (let i = 0; i < 100; ++i) {
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
    <div v-if="objectNotEmpty(store.currentWeather)" class="hourly-weather-block">
        <div class="title">
            <div class="title-sub">
                <h1>Next 24 hours forecast</h1>
            </div>
        </div>
        <div class="tile-list">
            <HourlyWeatherTile v-for="elem in store.forecastHourly" :image-url="elem.condition.icon">
                <template #time> {{ elem.time.split(' ')[1] }} </template>
                <template #weather> {{ elem.condition.text }} </template>
                <template #temp> {{ elem.temp_c }}°C / </template>
                <template #feels-like> {{ elem.feelslike_c }}°C </template>
                <template #rain-prob> {{ elem.chance_of_rain }}% </template>
            </HourlyWeatherTile>
        </div>
    </div>
</template>

<style scoped>

.hourly-weather-block {
    position: relative;
    margin-bottom: 30px;
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
    top: 5px;
    left: 5px;
    width: 99vw;
    height: 250px;
    overflow-x: auto;
    white-space: nowrap;
}

.tile-list div {
    display: inline-block;
    vertical-align: middle;
}

</style>
