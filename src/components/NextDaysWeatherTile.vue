<script setup lang="ts">
import { useCityDataStore } from "@/stores/CityDataStore"

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
            <div class="extra-info-div">
                <h3 class="extra-info">
                    <slot name="date"></slot>
                </h3>
            </div>
            <div class="extra-info-div">
                <h3 class="extra-info"> Humidity:
                    <slot name="avg-humidity"></slot>%
                </h3>
            </div>
            <div class="extra-info-div">
                <h3 class="extra-info"> UV:
                    <slot name="uv"></slot>
                </h3>
            </div>
            <div class="extra-info-div">
                <h3 class="extra-info"> Average wind speed:
                    <slot name="max-wind-spd"></slot> km/h
                </h3>
            </div>
            <div class="extra-info-div">
                <h3 class="extra-info"> Sunrise:
                    <slot name="sunrise"></slot>
                </h3>
            </div>
            <div class="extra-info-div">
                <h3 class="extra-info"> Sunset:
                    <slot name="sunset"></slot>
                </h3>
            </div>
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
    background-color: rgba(255, 255, 255, 0.03);
}

.extra-info-div {
    position: relative;
    height: 60px;
    display: inline-block;
    vertical-align: middle;
    margin-inline: 20px;
    top: -15px;
}

.weather-img {
    position: relative;
    width: 64px;
    top: -1px;
    left: 15px;
    margin-inline: 20px;
}

.temp-interval {
    position: relative;
    display: inline-block;
    vertical-align: middle;
    margin-right: 20px;
    top: -30px;
    left: 15px;
}
.extra-info {
    position: relative;
    font-weight: bold;
}

</style>
