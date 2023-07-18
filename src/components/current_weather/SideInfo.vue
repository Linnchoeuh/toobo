<script setup lang="ts">

const props = defineProps({
  imageUrl: String
})

</script>

<template>
    <div class="side-info-block">
        <div class="side-info-sub">
            <div class="left-side">
                <img class="src-img" :src="props.imageUrl" />
                <h2 class="title">
                    <slot name="title"></slot>
                </h2>
            </div>
            <div>
                <h3 class="info">
                    <slot></slot>
                </h3>
            </div>
        </div>
    </div>
</template>

<style scoped>
.side-info-block {
    padding: 15px;
}

.side-info-sub {
    height: 100%;
    border-radius: 15px;
    background-color: var(--tile-color);
}

.side-info-sub > div {
    /* width: 50%; */
    height: 100%;
    display: inline-block;
    vertical-align: middle;
    margin-inline: 20px;
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
@media (max-width:1700px) {
    .info {
        font-size: 30px;
    }
}
@media (max-width:1500px) {
    .info {
        font-size: 40px;
    }
}
@media (max-width:800px) {
    .info {
        font-size: 30px;
    }
}
@media (max-width:700px) {
    .info {
        font-size: 20px;
    }
}
@media (max-width:600px) {
    .info {
        font-size: 15px;
    }
    .side-info-sub > div {
        margin-inline: 2px;
    }
}

.src-img {
    position: relative;
    display: block;
    margin-inline: auto;
    width: 100px;
}

</style>
