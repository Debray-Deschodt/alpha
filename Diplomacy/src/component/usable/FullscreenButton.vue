<script setup lang='ts'>
function toggleFullScreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    }
}
</script>

<template>
    <section class='Button' @click="toggleFullScreen()"></section>
</template>

<style scoped lang='scss'>
.Button {
    position: fixed;
    top: 90vh;
    left: 93vw;
    padding: 2vw;
    z-index: 3001;
    background-repeat: no-repeat;
    background-size: cover;
    background-image: url(../../img/sound.png);
    filter: invert(1);
    transition: all 0.1s;
    opacity: 0.75;
}

.Button:hover {
    transform-origin: 50% 50%;
    transform: scale(1.1);
    transition: all 0.1s
}
</style>