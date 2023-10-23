<script setup lang='ts'>
import { onMounted, ref } from 'vue';
import type { PostItInterface } from '../../interface/postIt.interface'

const props = defineProps<{
    data: PostItInterface,
}>()

let flat = ref(props.data.flat)

onMounted(() => {
    if (!props.data.flat) {
        document.querySelector('#postIt' + props.data.index)!.children[2].setAttribute('style', 'transform: rotateX(7deg) perspective(80vw); background-color: #' + props.data.color)
        document.querySelector('#postIt' + props.data.index)!.children[4].setAttribute('style', 'transform: rotateX(7deg) perspective(80vw)')
    } else {
        document.querySelector('#postIt' + props.data.index)!.children[2].setAttribute('style', 'animation: none; background-color: #' + props.data.color)
        document.querySelector('#postIt' + props.data.index)!.children[4].setAttribute('style', 'animation: none;')
    }
})
</script>

<template>
    <section class="postIt" :id="'postIt' + data.index"
        :style="'z-index:' + data.index + '; top:' + data.top + 'vw; left:' + data.left + 'vw'" :draggable="true"
        @dragstart.prevent>
        <div v-show="!flat" class="shadow" />
        <div class="postItTop" :style="'background-color: #' + data.color" />
        <textarea :style="'background-color: #' + data.color" :value="data.text" />
        <div class="filtreTop" />
        <div class="filtreBot" />
    </section>
</template>

<style scoped lang='scss'>
@use '../../assets/base.scss' as *;
@use '../../assets/animation.scss' as *;

%rotate {
    position: absolute;
    transform-style: preserve-3d;
    transform-origin: 50% 0%;
}

%top {
    position: absolute;
    height: 1.3vw;
    width: 12vw;
    border-radius: 3px 3px 0 0;
}

%bot {
    position: absolute;
    top: 1.2vw;
    height: 8.8vw;
    width: 10vw;
    padding: 1vw;
    border-radius: 0 0 3px 3px;
    // border-bottom-right-radius: 40% 1%;
    border-bottom-left-radius: 2% 70%;
    animation: 8s ease-in-out infinite alternate windy2;
}

.postIt {
    @extend %rotate;
    height: 11.1vw;
    width: 12vw;
    transform: rotateY(338deg) perspective(80vw);
}

.postItTop {
    @extend %top;
}

textarea {
    @extend %rotate;
    @extend %bot;
    background-color: transparent;
    overflow: hidden;
    font-family: 'Caveat', cursive;
    font-size: 1.11vw;
    line-height: 1vw;
    border: none;
    resize: none;
    outline: none;
}

.shadow {
    @extend %bot;
    height: 9.5vw;
    width: 10.05vw;
    background-color: rgba(0, 0, 0, 0.1);
    animation: 8s ease-in-out infinite alternate windyShadow;
    transform-origin: 50% 0%;
}

.filtreTop {
    @extend %top;
    height: 1.3vw;
    background: linear-gradient(to bottom, rgba(123, 123, 123, 0), 25%, rgba(67, 67, 67, 0.17));
}

.filtreBot {
    @extend %rotate;
    @extend %bot;
    background: linear-gradient(to bottom, rgba(123, 123, 123, 0), rgba(67, 67, 67, 0.17));
}
</style>