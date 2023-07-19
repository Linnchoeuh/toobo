<script setup lang="ts">
import { ref } from 'vue'
import type { CityDataResponse } from "@/stores/CityDataStore"
import { useCityDataStore } from "@/stores/CityDataStore"
import clearImg from "@/assets/clear.png"
import searchImg from "@/assets/search.png"

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
    <div class="search-bloc">
        <div class="search-bar-div">
            <input class="search-bar" v-model="prompt"
            @keyup="getCitySuggestion(prompt)" @keyup.enter="store.changeCity(prompt)"
            placeholder="Enter city name" type="text" list="suggested-cities">
            <datalist id="suggested-cities">
                <option v-for="cities in suggestedCities" :value="cities.data.name">
                    {{ cities.fixedName }} ({{ cities.data.country }}, {{ cities.data.region }}) </option>
            </datalist>
        </div>

        <div class="search-buttons">
            <input class="search-button" type="image" alt="Search"
            :src="searchImg" @click="store.changeCity(prompt)">
            <input class="clear-button" type="image" alt="Clear"
            :src="clearImg" @click="prompt=''; store.resetCityData()">
        </div>
    </div>

</template>


<style scoped>

.search-bloc {
    display: grid;
    grid-template-columns: auto 150px;
    padding: 10px;
}

.search-bar-div {
    grid-column: 1;
    grid-row: 1;
}

.search-buttons {
    grid-column: 2;
    grid-row: 1;
}
.search-bar {
    position: relative;
    height: 50px;
    width: 100%;
    appearance: none;
	border: none;
	outline: none;
	border-bottom: .2em solid white;
	background: rgba(0, 0, 0, 0);
	border-radius: .2em .2em 0 0;
	padding: .4em;
	color: white;
    font-size: 20px;
}


input[type='image'] {
    float: right;
    position: relative;
    width: 50px;
    height: 50px;
    margin-inline: 10px;
    vertical-align: middle;
}

</style>
