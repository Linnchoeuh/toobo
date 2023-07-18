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
        <div class="search-bar-block">
            <div class="search-bar">
                <div>
                    <text class="city-name"> {{ store.cityName }} </text>
                </div>
                <div class="search-bloc">
                    <input class="search-input" v-model="prompt"
                    @keyup="getCitySuggestion(prompt)" @keyup.enter="store.changeCity(prompt)"
                    placeholder="Enter city name" type="text" list="suggested-cities">
                    <datalist id="suggested-cities">
                        <option v-for="cities in suggestedCities" :value="cities.data.name">
                            {{ cities.fixedName }} ({{ cities.data.country }}, {{ cities.data.region }}) </option>
                    </datalist>
                    <input class="clear-button" type="image" alt="Clear"
                    :src="clearImg"
                    @click="prompt=''; store.resetCityData()">
                    <input class="search-button" type="image" alt="Search"
                    :src="searchImg"
                    @click="store.changeCity(prompt)">

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

    background: linear-gradient(180deg, var(--bg-start-color), transparent);
    height: 100px;
}
@media (max-width:800px) {
    .search-bar-block {
        height: 160px;
    }
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
    vertical-align: middle;
    height: 80px;
}
@media (max-width:800px) {
    .search-bar div {
        width: 100%;
    }
}

.city-name {
    position: relative;
    top: -10px;
    padding: 25px;
    font-size: 40px;
}


.search-input {
    position: relative;
    height: 50px;
    width: 60%;
    appearance: none;
	border: none;
	outline: none;
	border-bottom: .2em solid white;
	background: rgba(0, 0, 0, 0);
	border-radius: .2em .2em 0 0;
	padding: .4em;
    margin-inline: 20px;
	color: white;
    font-size: 20px;;
}

input[type='image'] {
    position: relative;
    /* background: white; */
    width: 50px;
    height: 50px;
    margin-inline: 10px;
    vertical-align: middle;
}


/* .search-bar button {
    position: relative;
    left: 50%;
    height: 50px;
    width: 8.5%;
} */


</style>
