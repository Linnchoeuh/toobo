<script setup lang="ts">
import { ref } from 'vue'
import type { CityDataResponse } from "@/stores/CityDataStore"
import { useCityDataStore } from "@/stores/CityDataStore"
import SideInfo from "@/components/SideInfo.vue"
import MainInfo from "@/components/MainInfo.vue"

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
        <MainInfo/>
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
    margin-bottom: 30px;
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

.side-info > div {
    width: 50%;
    display: inline-block;
    height: 163px;
}




</style>
