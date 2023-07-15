<script setup lang="ts">
import TheWelcome from './components/TheWelcome.vue'
import SearchBar from './components/SearchBar.vue'
import CurrentWeather from './components/CurrentWeather.vue';
import HourlyWeather from './components/HourlyWeather.vue';
import NextDaysWeather from './components/NextDaysWeather.vue';
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
  top: 120px;
}
@media (max-width:800px) {
    .sub-search-bar {
      top: 220px;
    }
}

</style>
