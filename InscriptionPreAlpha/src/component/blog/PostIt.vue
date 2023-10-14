<script setup lang='ts'>
import { onMounted, ref } from 'vue';
import type { PostItInterface } from '../../interface/postIt.interface'
import type { PostItDragInterface } from '@/interface/postitdrag.interface';

const props = defineProps<{
    data: PostItInterface,
    lastIndex: {
        LastIndexValue: number,
        SetLastIndex: () => void
    }
}>()

const emit = defineEmits<{
    (e: 'needViewer'): void
}>()

const drag = ref<PostItDragInterface>({
    shiftX: 0,
    shiftY: 0,
    selected: null,
    top: 0,
    left: 0,
    lastPageY: 0,
    lastPageX: 0
})

let borderScrollInterval = 0
let maxScroll = 0
let flat = ref(props.data.flat)



function selectPostIt(event: MouseEvent) {
    unFlat()
    drag.value.selected = (event.target as HTMLElement).parentElement
    drag.value.selected!.style.zIndex = (2000 + props.lastIndex.LastIndexValue) + ''
    props.lastIndex.SetLastIndex()

    let rectangle = drag.value.selected!.getBoundingClientRect();
    drag.value.shiftX = event.pageX - rectangle.left;
    drag.value.shiftY = event.pageY - rectangle.top;

    (document.querySelector('#blog') as HTMLElement).addEventListener('mousemove', move);
    (document.querySelector('#blog') as HTMLElement).addEventListener('scroll', scroll);
    borderScrollInterval = setInterval(borderScroll, 10)
    maxScroll = document.querySelector('#blog')!.scrollHeight - document.querySelector('#blog')!.clientHeight
    move(event)
}

function scroll() {
    drag.value.top = (drag.value.lastPageY - drag.value.shiftY + document.querySelector('#blog')!.scrollTop) * 100 / document.querySelector('#blog')!.clientWidth
    drag.value.selected!.style.top = drag.value.top + 'vw';
}

function mouseup() {
    (document.querySelector('#blog') as HTMLElement).removeEventListener('mousemove', move);
    (document.querySelector('#blog') as HTMLElement).removeEventListener('scroll', scroll);
    clearInterval(borderScrollInterval)
}

function move(event: MouseEvent) {
    drag.value.top = (event.pageY - drag.value.shiftY + document.querySelector('#blog')!.scrollTop) * 100 / document.querySelector('#blog')!.clientWidth
    drag.value.left = (event.pageX - drag.value.shiftX) * 100 / document.querySelector('#blog')!.clientWidth
    drag.value.selected!.style.left = drag.value.left + 'vw';
    drag.value.selected!.style.top = drag.value.top + 'vw';
    drag.value.lastPageX = event.pageX
    drag.value.lastPageY = event.pageY
}

function borderScroll() {
    if (drag.value.lastPageY * 100 / document.querySelector('#blog')!.clientHeight < 20) {
        document.querySelector('#blog')!.scrollTo(0, document.querySelector('#blog')!.scrollTop - 5)
    }
    if (drag.value.lastPageY * 100 / document.querySelector('#blog')!.clientHeight > 80 && document.querySelector('#blog')!.scrollTop < maxScroll) {
        document.querySelector('#blog')!.scrollTo(0, document.querySelector('#blog')!.scrollTop + 5)
    }
}

function unFlat() {
    if (flat.value === 1) {
        flat.value = 0
        document.querySelector('#postIt' + props.data.index)!.children[2].setAttribute('style', 'transform: rotateX(7deg) perspective(80vw); background-color: #' + props.data.color)
        document.querySelector('#postIt' + props.data.index)!.children[4].setAttribute('style', 'transform: rotateX(7deg) perspective(80vw)')
    }
}

onMounted(() => {
    (document.querySelector('#blog') as HTMLElement).addEventListener('mouseup', mouseup)
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
        :style="'z-index:' + data.index + '; top:' + data.top + 'vw; left:' + data.left + 'vw'" @mousedown="selectPostIt"
        @click.right.prevent="emit('needViewer')" draggable="true" @dragstart.prevent>
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