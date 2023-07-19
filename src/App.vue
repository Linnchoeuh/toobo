<script setup lang="ts">
import TopBar from './components/search_bar/TopBar.vue'
import CurrentWeather from './components/current_weather/CurrentWeather.vue';
import HourlyWeather from './components/hourly_forecast/HourlyWeather.vue';
import NextDaysWeather from './components/day_forecast/NextDaysWeather.vue';
import { useCityDataStore } from "@/stores/CityDataStore"
import { useFavCitiesStore } from "@/stores/FavoriteCitiesStore"

// const store = useCityDataStore();
const favCitiesStore = useFavCitiesStore();
const cityDataStore = useCityDataStore();

cityDataStore.refreshWeatherWithIp();
</script>


<template>
  <div class="main-div">
    <div v-if="favCitiesStore.showFavTab" class="fav-list">

    </div>
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

.fav-list {
  float: left;
  /* position: relative; */
  width: 200px;
  height: 100%;
  background: black;
  z-index: 2;
    /* background: linear-gradient(180deg, black, transparent); */
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
