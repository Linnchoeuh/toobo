<script setup lang="ts">
import { ref } from 'vue'
import type { CityFavData } from "@/stores/FavoriteCitiesStore"
import type { TempWeatherObj } from "@/stores/CityDataStore"
import { useFavCitiesStore } from "@/stores/FavoriteCitiesStore"
import { useCityDataStore } from "@/stores/CityDataStore"
import clearImg from "@/assets/clear.png"

const cityDataStore = useCityDataStore();
const favCitiesStore = useFavCitiesStore();
let tmpShortWeatherData: TempWeatherObj = ref({temp: 0, icon: ""});

function changeCity(city: CityFavData): void
{
    cityDataStore.setCityTmpName(city.name);
    cityDataStore.setCityName(city.name);
    cityDataStore.updateAllWeatherData(cityDataStore.latLonToString(city.lat, city.lon));
    cityDataStore.setCityTmpName();
}

</script>

<template>

<div class="fav-list">
    <div class="title-div">
        <div>
            <input class="clear-button" type="image" alt="Clear"
            :src="clearImg" @click="favCitiesStore.setFavTabDisplay(false)">
        </div>
        <div>
            <h1>Favorites</h1>
        </div>
    </div>
    <div class="fav-list-div">
        <div class="fav-elem" v-for="city in favCitiesStore.favList"
        :key="city.name" @click="changeCity(city)">
            <div>
                <img class="weather-img" :src="city.icon">
            </div>
            <div>
                <h1> {{ city.temp }}°C</h1>
            </div>
            <h2>{{ city.name }}</h2>
            <h3> ({{ city.region }}, {{ city.country }})</h3>
        </div>
    </div>
</div>

</template>

<style>

.fav-list {
  float: left;
  width: 300px;
  height: 100%;
  background: black;
  z-index: 2;
}
@media (max-width:600px) {
    .fav-list {
        float: left;
        position: static;
        width: 100%;
    }
}

input[type='image'] {
    position: relative;
    width: 50px;
    height: 50px;
    margin-right: 15px;
    vertical-align: middle;
}


.title-div {
    padding: 10px;
    height: 70px;
    margin-bottom: 10px;
}

.title-div > div {
    display: inline-block;
    vertical-align: middle;
}

.fav-list-div {
    height: calc(100vh - 80px);
    overflow-y: auto;
}

.fav-elem {
    padding: 15px;
}

.fav-elem > div {
    display: inline-block;
    vertical-align: middle;
}

</style>
