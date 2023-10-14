<script setup lang='ts'>
import { onDeactivated } from 'vue';


const props = defineProps({
    black: {
        type: Boolean,
        default: true
    }
})

function toggleFullScreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    }
}

function color(black: Boolean) {
    return (black === true) ? 'filter: invert(1);' : ''
}

onDeactivated(() => {
    if (document.fullscreenElement) {
        document.exitFullscreen()
    }
})

</script>

<template>
    <section class='fullscreenButton' :style='color(props.black)' @click="toggleFullScreen()"></section>
</template>

<style scoped lang='scss'>
.fullscreenButton {
    position: fixed;
    top: 90vh;
    left: 93vw;
    padding: 2vw;
    z-index: 3001;
    background-repeat: no-repeat;
    background-size: cover;
    background-image: url(../../img/sound.png);
    // filter: invert(1);
    transition: all 0.1s;
    opacity: 0.75;

    &:hover {
        transform-origin: 50% 50%;
        transform: scale(1.1);
        transition: all 0.1s
    }
}
</style>