<script setup lang="ts">
import { useCityDataStore } from "@/stores/CityDataStore"
import ExtraInfo from "./ExtraInfo.vue";

const store = useCityDataStore();

const props = defineProps({
  imageUrl: String
})

</script>

<template>
    <div class="tile-block">
        <div class="tile-block-sub">
            <img class="weather-img" :src="props.imageUrl" />
            <div class="temp-interval">
                <h4 class="max-temp-div"> Max:
                    <slot name="max-temp"></slot>°C
                </h4>
                <h4 class="min-temp-div"> Min:
                    <slot name="min-temp"></slot>°C
                </h4>
            </div>
            <ExtraInfo>
                <template #text> <slot name="date"></slot> </template>
            </ExtraInfo>
            <ExtraInfo>
                <template #pre-text> Humidity: </template>
                <template #text> <slot name="avg-humidity"></slot> </template>
                <template #post-text>%</template>
            </ExtraInfo>
            <ExtraInfo>
                <template #pre-text> UV: </template>
                <template #text> <slot name="uv"></slot> </template>
            </ExtraInfo>
            <ExtraInfo>
                <template #pre-text> Average wind speed: </template>
                <template #text> <slot name="max-wind-spd"></slot> </template>
                <template #post-text> km/h </template>
            </ExtraInfo>
            <ExtraInfo>
                <template #pre-text> Sunrise: </template>
                <template #text> <slot name="sunrise"></slot> </template>
            </ExtraInfo>
            <ExtraInfo>
                <template #pre-text> Sunset: </template>
                <template #text> <slot name="sunset"></slot> </template>
            </ExtraInfo>
        </div>
    </div>
</template>

<style scoped>

.tile-block {
    margin: 15px;
}

.tile-block-sub {
    height: 100%;
    border-radius: 15px;
    background-color: var(--tile-color);
}

.extra-info-div {
    position: relative;
    /* height: 60px; */
    display: inline-block;
    vertical-align: middle;
    margin-inline: 20px;
    top: -18px;
}

.weather-img {
    position: relative;
    width: 64px;
    top: 8px;
    left: 15px;
    margin-inline: 20px;
}

.temp-interval {
    position: relative;
    display: inline-block;
    vertical-align: middle;
    margin-right: 20px;
    top: -20px;
    left: 15px;
}

</style>
