<script setup lang='ts'>
import { ref } from 'vue';

const muted = ref(true);

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
    position: absolute;
    top: 88vh;
    left: 93vw;
    padding: 3vw;
    background-position-x: 50%;
    background-repeat: no-repeat;
    background-image: url(../../img/sound.png);
    background-size: 5vw 4vw;
}

.Button:hover {
    top: 87.5vh;
    left: 92.5;
    background-size: 6vw 5vw;
}
</style>