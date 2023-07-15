<script setup lang="ts">
import { useCityDataStore } from "@/stores/CityDataStore"

const store = useCityDataStore();

</script>

<template>
    <div class="tile-block">
        <div class="tile-block-sub">
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
    height: 100%;
    border-radius: 15px;
    background-color: rgba(255, 255, 255, 0.03);
}

</style>
