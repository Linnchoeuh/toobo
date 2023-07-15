<script setup lang="ts">
import TheWelcome from './components/TheWelcome.vue'
import SearchBar from './components/SearchBar.vue'
import CurrentWeather from './components/CurrentWeather.vue';
import { useCityDataStore } from "@/stores/CityDataStore"

const store = useCityDataStore();

store.refreshWeatherWithIp();
</script>

<template>

  <!-- <header>
    <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />
    </div>
  </header> -->

  <div class="sub-search-bar">
    <CurrentWeather></CurrentWeather>
    <!-- <TheWelcome /> -->
  </div>
  <SearchBar />
</template>

<style scoped>

.sub-search-bar {
  left: 0px;
  position: absolute;
  top: 100px;
}

</style>

<!-- <style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style> -->
