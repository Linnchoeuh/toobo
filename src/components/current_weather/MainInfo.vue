<script setup lang="ts">
import { useCityDataStore } from "@/stores/CityDataStore"
import { useCSSResponsiveStore } from "@/stores/CSSResponsiveStore"

const store = useCityDataStore();
const CSSRespStore = useCSSResponsiveStore();

function resizeSubElems()
{
    let divId: string = "main-info";
    let width: number;

    try {
        width = document.getElementById(divId).offsetWidth;
        if (width <= 375) {
            document.getElementById("title").style["font-size"] = "30px";
            document.getElementById("weather-img").style["width"] = "64px";
            document.getElementById("weather-img").style["top"] = "-15px";
            document.getElementById("temp").style["top"] = "-35px";
            document.getElementById("temp").style["font-size"] = "30px";
            document.getElementById("temp-feels-like").style["top"] = "-35px";
            document.getElementById("temp-feels-like").style["font-size"] = "13px";
            document.getElementById("weather-text").style["top"] = "-30px";
            document.getElementById("weather-text").style["font-size"] = "20px";
        } else if (width <= 600) {
            document.getElementById("title").style["font-size"] = "40px";
            document.getElementById("weather-img").style["width"] = "64px";
            document.getElementById("weather-img").style["top"] = "-15px";
            document.getElementById("temp").style["top"] = "-30px";
            document.getElementById("temp").style["font-size"] = "40px";
            document.getElementById("temp-feels-like").style["top"] = "-35px";
            document.getElementById("temp-feels-like").style["font-size"] = "20px";
            document.getElementById("weather-text").style["top"] = "-30px";
            document.getElementById("weather-text").style["font-size"] = "20px";
        }
        else {
            document.getElementById("title").style["font-size"] = "";
            document.getElementById("weather-img").style["width"] = "";
            document.getElementById("weather-img").style["top"] = "";
            document.getElementById("temp").style["top"] = "";
            document.getElementById("temp").style["font-size"] = "";
            document.getElementById("temp-feels-like").style["top"] = "";
            document.getElementById("temp-feels-like").style["font-size"] = "";
            document.getElementById("weather-text").style["top"] = "";
            document.getElementById("weather-text").style["font-size"] = "";
        }
    } catch {
        return false;
    }
    return (true);
}

CSSRespStore.addFunction(resizeSubElems);

</script>

<template>

<div class="main-info" id="main-info">
    <div class="main-info-sub">
        <h1 id="title">Current weather</h1>
        <img class="weather-img" id="weather-img" :src="store.currentWeather.current.condition.icon">
        <text class="temp" id="temp"> {{ store.currentWeather.current.temp_c }}°C </text>
        <text class="temp-feels-like" id="temp-feels-like"> feels like {{ store.currentWeather.current.feelslike_c }}°C </text>
        <h4 class="weather-text" id="weather-text"> {{ store.currentWeather.current.condition.text }} </h4>
        <h4 class="last-update-text" id="last-update-text"> Last update: {{ store.currentWeather.current.last_updated }} </h4>
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
    font-size: 30px;
}

.last-update-text {
    position: relative;
    float: right;
    top: -15px;
}

@media (max-width:540px) {
    /* .main-info h1 {
        font-size: 40px;
    } */
    /* .weather-img {
        width: 64px;
        top: -15px;
    } */
    /* .temp {
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
    } */
}

</style>
