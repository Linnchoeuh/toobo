<script setup lang="ts">
import SearchBar from './components/search_bar/SearchBar.vue'
import CurrentWeather from './components/current_weather/CurrentWeather.vue';
import HourlyWeather from './components/hourly_forecast/HourlyWeather.vue';
import NextDaysWeather from './components/day_forecast/NextDaysWeather.vue';
import { useCityDataStore } from "@/stores/CityDataStore"

const store = useCityDataStore();

store.refreshWeatherWithIp();
</script>

<template>
  <div class="sub-search-bar">
    <CurrentWeather/>
    <HourlyWeather/>
    <NextDaysWeather/>
    <!-- <TheWelcome /> -->
  </div>
  <SearchBar />
</template>

<style scoped>

.sub-search-bar {
  left: 0px;
  position: absolute;
  top: 90px;
}
@media (max-width:800px) {
    .sub-search-bar {
      top: 170px;
    }
}

</style>
