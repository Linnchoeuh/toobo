<script setup lang="ts">
import { ref } from 'vue'
import type { CityDataResponse } from "@/stores/CityDataStore"
import { useCityDataStore } from "@/stores/CityDataStore"
import SearchPart from '@/components/search_bar/SearchPart.vue'
import CityInfoPart from './CityInfoPart.vue'
import clearImg from "@/assets/clear.png"
import searchImg from "@/assets/search.png"
import favTabImg from "@/assets/fav_tab.png"
import starEmpty from "@/assets/star_empty.png"
import starFilled from "@/assets/star_filled.png"

import TestComponent from "@/components/TestComponent.vue"

const prompt = ref('');
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

</script>

<template>
    <div class="top-bar">
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

    background: linear-gradient(180deg, var(--bg-start-color), transparent);
    height: 100px;
    z-index: 1;
}
@media (max-width:1000px) {
    .top-bar {
        grid-template-columns: 100%;
        height: 160px;
    }
}


.cities-bloc {
    padding-left: 15px;
}

.cities-bloc > div {
    display: inline-block;
    vertical-align: middle;
}



</style>
