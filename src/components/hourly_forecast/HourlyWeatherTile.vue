<script setup lang="ts">
import { useCityDataStore } from "@/stores/CityDataStore"
import waterDrop from "@/assets/water_drop.png"

const props = defineProps({
  imageUrl: String
})

// const waterDrop: string = ;
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
            <p></p>
            <img class="rain-prob-img" :src="waterDrop" />
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
    background-color: var(--tile-color);
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
    overflow-x: scroll;

}
.temp-div {
    position: relative;
    font-size: 20px;

}

.feels-like-div {
    position: relative;
    font-size: 13px;
}

.rain-prob-img {
    position: relative;
    width: 16px;
    top: 10px;
    left: calc(50% - 20px);
}

.rain-prob-div {
    position: relative;
    width: 16px;
    top: -16px;
    left: 50%;
}

</style>
