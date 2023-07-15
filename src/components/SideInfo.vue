<script setup lang="ts">
</script>

<template>
    <div class="side-info-block">
        <div class="side-info-sub">
            <div class="left-side">
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
    background-color: rgba(255, 255, 255, 0.03);
}

.side-info-sub > div {
    width: 50%;
    height: 100%;
    display: inline-block;
    vertical-align: middle;
}

.title {
    text-align: center;
    font-weight: bold;
    vertical-align: middle;
}

.info {
    position: relative;
    text-align: center;
}

</style>
