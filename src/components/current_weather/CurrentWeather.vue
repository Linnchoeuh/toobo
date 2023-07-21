<script setup lang="ts">
import { ref } from 'vue'
import type { CityDataResponse } from "@/stores/CityDataStore"
import { useCityDataStore } from "@/stores/CityDataStore"
import SideInfo from "@/components/current_weather/SideInfo.vue"
import MainInfo from "@/components/current_weather/MainInfo.vue"
import { useCSSResponsiveStore } from "@/stores/CSSResponsiveStore"

const CSSRespStore = useCSSResponsiveStore();
const store = useCityDataStore();

function objectNotEmpty(target: object)
{
    for(var prop in target)
        return true;
    return false;
}

function repositionSubElems()
{
    let divId: string = "current-weather-block";
    let width: number;

    try {
        width = document.getElementById(divId).offsetWidth;
    } catch {
        return;
    }
    if (width <= 1150)
        document.getElementById(divId).style["grid-template-columns"] = "100%"
    else
        document.getElementById(divId).style["grid-template-columns"] = ""
}


CSSRespStore.addFunction(repositionSubElems);

</script>

<template>
    <div v-if="objectNotEmpty(store.currentWeather)"
    class="current-weather-block" id="current-weather-block">
        <MainInfo/>
        <SideInfo/>
    </div>
</template>

<style scoped>

.current-weather-block {
    margin-bottom: 30px;
    display: grid;
    grid-template-columns: 50% 50%;
}





</style>
