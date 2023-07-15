<script setup lang="ts">
import { ref } from 'vue'
import { useCityDataStore } from "@/stores/CityDataStore"
import NextDaysWeatherTile from "@/components/NextDaysWeatherTile.vue"

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
    <div v-if="objectNotEmpty(store.currentWeather)" class="hourly-weather-block">
        <div class="title">
            <div class="title-sub">
                <h1>Next day weather</h1>
            </div>
        </div>
        <div class="tile-list">
            <NextDaysWeatherTile v-for="elem in listo">
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
    background-color: rgba(255, 255, 255, 0.03);
}

.title-sub h1 {
    font-size: 40px;
}

.tile-list {
    position: relative;
}


</style>
