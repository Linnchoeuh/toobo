<script setup lang="ts">
import { useCityDataStore } from "@/stores/CityDataStore"

const store = useCityDataStore();

</script>

<template>

<div class="main-info">
    <div class="main-info-sub">
        <h1>Current weather</h1>
        <img class="weather-img" :src="store.currentWeather.current.condition.icon">
        <text class="temp"> {{ store.currentWeather.current.temp_c }}°C </text>
        <text class="temp-feels-like"> feels like {{ store.currentWeather.current.feelslike_c }}°C </text>
        <p></p>
        <text class="weather-text"> {{ store.currentWeather.current.condition.text }} </text>
        <text class="last-update-text"> Last update: {{ store.currentWeather.current.last_updated }} </text>
    </div>
</div>

</template>

<style scoped>

.main-info {
    padding: 15px;
}

.main-info-sub {
    border-radius: 15px;
    padding: 15px;
    background-color: var(--tile-color);
}

.main-info h1 {
    font-size: 50px;
}


.weather-img {
    position: relative;
    width: 128px;
    top: -10px;
}

.temp {
    position: relative;
    top: -50px;
    font-size: 70px;
}
.temp-feels-like {
    position: relative;
    top: -60px;
    font-size: 30px;
    color: var(--color-text-secondary)
}

.weather-text {
    position: relative;
    top: -45px;
    left: 5px;
    font-size: 20px;
}

.last-update-text {
    position: relative;
    float: right;
    top: 10px;
}

@media (max-width:540px) {
    .main-info h1 {
        font-size: 40px;
    }
    .weather-img {
        width: 64px;
        top: -15px;
    }
    .temp {
        top: -30px;
        font-size: 40px;
    }
    .temp-feels-like {
        top: -35px;
        font-size: 20px;
    }

    .weather-text {
        top: -30px;
        font-size: 15px;
    }

    .last-update-text {
        float: right;
        top: 10px;
    }
}

</style>
