<script setup lang="ts">

import { useCSSResponsiveStore } from "@/stores/CSSResponsiveStore"

const CSSRespStore = useCSSResponsiveStore();

const props = defineProps({
  imageUrl: String
})

// function repositionSubElems(): boolean
// {
//     let divId: string = "side-info-block";
//     let width: number;

//     try {
//         width = document.getElementById(divId).offsetWidth;
//         if (width <= 300)
//             document.getElementById("side-info-sub").style["grid-template-columns"] = "100%"
//         else
//             document.getElementById("side-info-sub").style["grid-template-columns"] = ""
//     } catch {
//         return false;
//     }
//     return (true);
// }


// CSSRespStore.addFunction(repositionSubElems);

</script>

<template>
    <div class="side-info-block" id="side-info-block">
        <div class="side-info-sub" id="side-info-sub">
            <div class="left-side">
                <img class="src-img" :src="props.imageUrl" />
                <h2 class="title">
                    <slot name="title"></slot>
                </h2>
            </div>
            <div class="right-side">
                <text class="info">
                    <slot></slot>
                </text>
            </div>
        </div>
    </div>
</template>

<style scoped>
.side-info-block {
    padding: 15px;
}

.side-info-sub {
    display: grid;
    grid-template-columns: 140px auto;
    height: 100%;
    border-radius: 15px;
    background-color: var(--tile-color);
}
@media (max-width:900px) {
    .side-info-sub {
        grid-template-columns: 100%;
    }
}

.side-info-sub > div {
    height: 100%;
    vertical-align: middle;
}

.left-side {
    margin-inline: auto;
    vertical-align: middle;
}

.right-side {
    overflow: auto;
    /* white-space: nowrap; */
    text-align: center;
    width: 100%;
}

.title {
    position: relative;
    text-align: center;
    font-weight: bold;
    top: -20px;
}

.info {
    position: relative;
    text-align: center;
    font-weight: bold;
    font-size: 40px;
}

.src-img {
    position: relative;
    margin-inline: auto;
    width: 100px;
}

</style>
