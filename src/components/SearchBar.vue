<script setup lang="ts">
import { ref } from 'vue'
import type { CityDataResponse } from "@/stores/CityDataStore"
import { useCityDataStore } from "@/stores/CityDataStore"

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
        <div class="search-bar-block">
            <div class="search-bar">
                <div>
                    <text class="city-name"> {{ store.cityName }} </text>
                </div>
                <div>
                    <input class="search-input" v-model="prompt"
                    @keyup="getCitySuggestion(prompt)" @keyup.enter="store.changeCity(prompt)"
                    placeholder="Enter city name" type="text" list="suggested-cities">
                    <datalist id="suggested-cities">
                        <option v-for="cities in suggestedCities" :value="cities.data.name">
                            {{ cities.fixedName }} ({{ cities.data.country }}, {{ cities.data.region }}) </option>
                    </datalist>
                    <button class="clear-button" @click="prompt=''; store.resetCityData()"> Clear </button>
                    <button class="search-button" @click="store.changeCity(prompt)"> Search </button>
                </div>
            </div>
        </div>
</template>

<style scoped>

.search-bar-block {
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100vw;

    background: linear-gradient(180deg, black, transparent);
    height: 100px;
}

.search-bar {
    position: absolute;
    top: 15px;
    left: 50%;
    transform: translate(-50%, 0%);
    width: 100%;
}

.search-bar div {
    width: 50%;
    display: inline-block;
    min-width: 400px;
}


.city-name {
    position: relative;
    top: -10px;
    padding: 25px;
    font-size: 40px;
}


.search-input {
    height: 50px;
    width: 66%;
}

.clear-button {
    left: 10px;
    height: 30px;
    width: 80px;

}

.search-button {
    left: 20px;
    height: 30px;
    width: 80px;

}

/* .search-bar button {
    position: relative;
    left: 50%;
    height: 50px;
    width: 8.5%;
} */


</style>
