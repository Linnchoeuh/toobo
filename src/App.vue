<script setup lang="ts">
import { onMounted } from 'vue'
import TopBar from './components/search_bar/TopBar.vue'
import CurrentWeather from './components/current_weather/CurrentWeather.vue';
import HourlyWeather from './components/hourly_forecast/HourlyWeather.vue';
import NextDaysWeather from './components/day_forecast/NextDaysWeather.vue';
import FavTab from "@/components/fav_tab/FavTab.vue"
import { useCityDataStore } from "@/stores/CityDataStore"
import { useFavCitiesStore } from "@/stores/FavoriteCitiesStore"
import TestComponent from "@/components/TestComponent.vue"

// const store = useCityDataStore();
const favCitiesStore = useFavCitiesStore();
const cityDataStore = useCityDataStore();

</script>

<template>
  <div class="main-div">
    <FavTab v-if="favCitiesStore.showFavTab"></FavTab>
    <div class="weather-app">
      <TopBar />
      <div class="sub-search-bar">
        <CurrentWeather/>
        <HourlyWeather/>
        <NextDaysWeather/>
      </div>
    </div>
  </div>
</template>

<style scoped>

.main-div {
  width: 100vw;
  height: 100vh;
}
/* .main-div > div {
    display: inline-block;
    vertical-align: middle;
} */

.weather-app {
  height: 100vh;
  overflow-y: auto;
}


/* .sub-search-bar {
  position: relative;
  top: 90px;
}
@media (max-width:800px) {
    .sub-search-bar {
      top: 170px;
    }
} */


</style>
