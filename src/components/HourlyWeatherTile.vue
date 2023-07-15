<script setup lang="ts">
import { useCityDataStore } from "@/stores/CityDataStore"

const props = defineProps({
  imageUrl: String
})

const store = useCityDataStore();

</script>

<template>
    <div class="tile-block">
        <div class="tile-block-sub">
            <h1 class="time-div">
                    <slot name="time"></slot>
            </h1>
            <img class="weather-img" :src="props.imageUrl" />
            <h3 class="weather-div">
                    <slot name="weather"></slot>
            </h3>
            <text class="temp-div">
                    <slot name="temp"></slot>
            </text>
            <text class="feels-like-div">
                    <slot name="feels-like"></slot>
            </text>
            <h4 class="rain-prob-div">
                    <slot name="rain-prob"></slot>
            </h4>
            
        </div>
    </div>
</template>

<style scoped>

.tile-block {
    width: 130px;
    height: 220px;
    margin: 10px;
}

.tile-block-sub {
    padding: 10px;
    height: 100%;
    border-radius: 15px;
    background-color: rgba(255, 255, 255, 0.03);
}

.time-div {
    top: -5px;
    position: relative;
    text-align: center;
}

.weather-img {
    position: relative;
    display: block;
    margin-inline: auto;
    width: 64px;
    top: -10px;
}

.weather-div {
    position: relative;
    text-align: center;
    top: -10px;

}
.temp-div {
    position: relative;
    font-size: 20px;

}

.feels-like-div {
    position: relative;
    font-size: 13px;

}

</style>
