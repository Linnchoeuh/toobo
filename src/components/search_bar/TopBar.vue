<script setup lang="ts">
import { ref } from 'vue'
import type { CityDataResponse } from "@/stores/CityDataStore"
import { useCityDataStore } from "@/stores/CityDataStore"
import SearchPart from '@/components/search_bar/SearchPart.vue'
import CityInfoPart from './CityInfoPart.vue'

const store = useCityDataStore();
const suggestedCities = ref<Array<CityDataResponse>>([]);

async function getCitySuggestion(prompt: string) {
    suggestedCities.value = [];
    store.resetCityData();
    if (prompt === "")
        return;
    try {
        suggestedCities.value = await store.apiGetSearchCities(prompt);
    } catch (error) {
        console.error(error);
    }
}

function repositionSubElems()
{
    let divId: string = "top-bar";
    let width: number = document.getElementById(divId).offsetWidth;

    if (width <= 1000)
        document.getElementById(divId).style["grid-template-columns"] = "100%"
    else
        document.getElementById(divId).style["grid-template-columns"] = ""
}

function resizeElem()
{
    repositionSubElems();
}

window.onresize = resizeElem;
window.onclick = resizeElem;

</script>

<template>
    <div class="top-bar" id="top-bar">
        <CityInfoPart></CityInfoPart>
        <SearchPart></SearchPart>
    </div>
</template>

<style scoped>

.top-bar {
    display: grid;
    grid-template-columns: 50% 50%;
    position: sticky;
    top: 0px;
    width: 100%;
    margin-bottom: 20px;

    background: linear-gradient(180deg, var(--bg-start-color), transparent);
    z-index: 1;
}


.cities-bloc {
    padding-left: 15px;
}

.cities-bloc > div {
    display: inline-block;
    vertical-align: middle;
}



</style>
