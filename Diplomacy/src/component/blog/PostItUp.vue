<script setup lang='ts'>
import type { PostItInterface } from '../../interface/postIt.interface'

defineProps<{
    data: PostItInterface,
}>()


</script>

<template>
    <section class="postIt" :style="'z-index:' + data.index">
        <div class="shadow" :style="'top: ' + data.top + 'vw; left:' + data.left + 'vw'">
        </div>
        <div class="postItTop"
            :style="'background-color: #' + data.color + '; top: calc(' + data.top + 'vw - 1.2vw); left:' + data.left + 'vw'">
        </div>
        <div class="postItContent"
            :style="'background-color: #' + data.color + '; top:' + data.top + 'vw; left:' + data.left + 'vw'">
            {{ data.text }}
        </div>
        <div class="filtreTop" :style="'top: calc(' + data.top + 'vw - 1.2vw); left:' + data.left + 'vw'">
        </div>
        <div class="filtreBot" :style="'top:' + data.top + 'vw; left:' + data.left + 'vw'">
        </div>
    </section>
</template>

<style scoped lang='scss'>
@use '../../assets/base.scss' as *;

.postIt {
    position: absolute;
    transform-style: preserve-3d;
    transform: rotateY(334deg)
}

.postItTop {
    position: absolute;
    height: 1.3vw;
    width: 12vw;
}

.postItContent {
    position: absolute;
    height: 8vw;
    width: 10vw;
    padding: 1vw;
    overflow: hidden;
    font-size: 1vw;
    font-family: 'Caveat', cursive;
    transform-origin: 50% 0%;
    transform-style: preserve-3d;
    transform: rotateX(7deg) perspective(80vw);
}

.shadow {
    position: absolute;
    height: 8.5vw;
    width: 10.1vw;
    padding: 1vw;
    background-color: rgba(0, 0, 0, 0.1);
}

.filtreTop {
    position: absolute;
    height: 1.2vw;
    width: 12vw;
    background: linear-gradient(to bottom, rgba(123, 123, 123, 0), 25%, rgba(67, 67, 67, 0.17));
}

.filtreBot {
    position: absolute;
    height: 10vw;
    width: 12vw;
    background: linear-gradient(to top, rgba(123, 123, 123, 0), rgba(67, 67, 67, 0.077));
    transform-origin: 50% 0%;
    transform-style: preserve-3d;
    transform: rotateX(7deg) perspective(80vw);
}
</style>