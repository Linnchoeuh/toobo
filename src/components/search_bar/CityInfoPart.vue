<script setup lang="ts">
import { ref } from 'vue'
import type { CityDataResponse } from "@/stores/CityDataStore"
import { useCityDataStore } from "@/stores/CityDataStore"
import favTabImg from "@/assets/fav_tab.png"
import starEmpty from "@/assets/star_empty.png"
import starFilled from "@/assets/star_filled.png"
import { useFavCitiesStore } from "@/stores/FavoriteCitiesStore"

const favCitiesStore = useFavCitiesStore();

const store = useCityDataStore();

</script>

<template>

<div class="cities-bloc">
    <div class="cities-bloc-buttons">
        <input class="fav-tab-button" type="image" alt="Fav list"
        :src="favTabImg" @click="favCitiesStore.toggleFavTab()">
        <input v-if="!favCitiesStore.currentCityFaved"
        class="fav-button" type="image" alt="Fav"
        :src="starEmpty" @click="favCitiesStore.addFavorite(store.cityFav)">
        <input v-if="favCitiesStore.currentCityFaved"
        class="fav-button" type="image" alt="Unfav"
        :src="starFilled" @click="favCitiesStore.removeFavorite(store.cityFav.name, store.cityFav.region, store.cityFav.country)">
    </div>
    <div class="city-name-div">
        <text class="city-name"> {{ store.cityName }} </text>
    </div>
</div>
</template>

<style scoped>

.cities-bloc {
    display: grid;
    grid-template-columns: 150px auto;
    padding: 10px;
}

.city-name {
    position: relative;
    padding-left: 10px;
    font-size: 40px;
}

.city-name-div {
    overflow: auto;
    white-space: nowrap;
    text-overflow: clip;

}

input[type='image'] {
    position: relative;
    width: 50px;
    height: 50px;
    margin-inline: 10px;
    vertical-align: middle;
}

</style>
