<script setup lang="ts">
import { ref } from 'vue'
import type { CityDataResponse } from "@/stores/CityDataStore"
import { useCityDataStore } from "@/stores/CityDataStore"
import SearchPart from '@/components/search_bar/SearchPart.vue'
import CityInfoPart from './CityInfoPart.vue'
import { useCSSResponsiveStore } from "@/stores/CSSResponsiveStore"

const CSSRespStore = useCSSResponsiveStore();

function repositionSubElems(): boolean
{
    let divId: string = "top-bar";
    let width: number;

    try {
        width = document.getElementById(divId).offsetWidth;
    } catch {
        return (false);
    }
    if (width <= 1000)
        document.getElementById(divId).style["grid-template-columns"] = "100%"
    else
        document.getElementById(divId).style["grid-template-columns"] = ""
    return (true);
}

CSSRespStore.addFunction(repositionSubElems);

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
