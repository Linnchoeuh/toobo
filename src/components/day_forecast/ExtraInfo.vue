<template>

<div class="extra-info-div">
    <h3 class="extra-info">

        <slot name="pre-text"></slot>
        <slot name="text"></slot>
        <slot name="post-text"></slot>
    </h3>
</div>

</template>

<style scoped>

.extra-info-div {
    position: relative;
    /* height: 60px; */
    display: inline-block;
    vertical-align: middle;
    margin-inline: 20px;
    top: -18px;
}

.extra-info {
    position: relative;
    font-weight: bold;
}


</style>
