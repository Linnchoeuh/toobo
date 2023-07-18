<script setup lang="ts">
import { ref } from 'vue'
import type { CityDataResponse } from "@/stores/CityDataStore"
import { useCityDataStore } from "@/stores/CityDataStore"
import sunriseSunset from "@/assets/sunrise_sunset.png"
import windImg from "@/assets/wind.png"

const store = useCityDataStore();

function objectNotEmpty(target: object)
{
    for(var prop in target)
        return true;
    return false;
}

</script>

<template>
        <div class="side-info-block">
            <div class="side-info-sub">
                <div class="top-side">
                    <div>
                        <h2>Sunrise</h2>
                        <h3><slot name="sunrise"></slot></h3>
                    </div>
                    <div>
                        <h2>Sunset</h2>
                        <h3><slot name="sunset"></slot></h3>
                    </div>
                </div>
                <div class="bottom-side">
                    <img class="src-img" :src="sunriseSunset" />
                </div>
            </div>
        </div>
</template>

<style scoped>

.side-info-block {
    position: relative;
    padding: 15px;
    top: -20px;
    height: 163px;
}

.side-info-sub {
    padding: 15px;
    height: 100%;
    border-radius: 15px;
    background-color: var(--tile-color);
}

.src-img {
    position: relative;
    display: block;
    margin-inline: auto;
    height: 50px;
    top: -10px;
}

.top-side > div {
    display: inline-block;
    vertical-align: middle;
    width: 50%;
}

.top-side h2 {
    text-align: center;
}

.top-side h3 {
    text-align: center;
    font-weight: bold;
}

@media (max-width:600px) {
    .src-img {
        height: 30px;
        top: 15px;
    }
}

</style>
