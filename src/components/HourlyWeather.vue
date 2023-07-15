<script setup lang="ts">
import { ref } from 'vue'
import { useCityDataStore } from "@/stores/CityDataStore"
import HourlyWeatherTile from "@/components/HourlyWeatherTile.vue"

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

console.log("oh");

</script>

<template>
    <div v-if="objectNotEmpty(store.currentWeather)" class="hourly-weather-block">
        <div class="title">
            <div class="title-sub">
                <h1>Hourly weather</h1>
            </div>
        </div>
        <div class="tile-list">
            <HourlyWeatherTile  v-for="elem in listo">
                <text> hi </text>
            </HourlyWeatherTile>
        </div>
    </div>
</template>

<style scoped>

.title {
    padding: 15px;
}

.title-sub {
    border-radius: 15px;
    padding: 15px;
    background-color: rgba(255, 255, 255, 0.03);
}

.title-sub h1 {
    font-size: 40px;
}

.tile-list {
    position: relative;
    top: 5px;
    left: 5px;
    width: 100vw;
    overflow-x: auto;
    white-space: nowrap;
}

.tile-list div {
    display: inline-block;
    vertical-align: middle;
}

</style>
