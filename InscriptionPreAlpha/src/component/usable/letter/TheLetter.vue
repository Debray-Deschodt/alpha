<script setup lang='ts'>
import { watch } from 'vue';

/* manage the three state of a letter :  closed, close, open, opened and played */

const props = defineProps<{
    state: number; // 1:close, 2:closed, 3:open, 4:opened, 5:played
    close: () => void;
    open: () => void;
    name: string;
}>()

watch(() => props.state, (state) => {
    switch (state) {
        case 2: props.close(); break
        case 4: props.open(); break
    }
})
</script>

<template>
    <div v-show="props.state !== 5" class="letter" :id="props.name">
        <slot />
    </div>
    <!-- viewer part -->
    <section v-if='props.state == 5'>
        <div class="playedLetter">
            <slot />
        </div>
        <div class="footer" />
    </section>
</template>

<style scoped lang='scss'>
@use '../../../assets/base.scss' as *;

section {
    box-sizing: border-box;
    position: absolute;
    top: 0vh;
    left: 6vw;
    z-index: 50;
    height: 100vh;
    width: 75vw;
    overflow-y: auto;
    overflow-x: hidden;
}

.playedLetter {
    box-sizing: border-box;
    position: absolute;
    height: 85vw;
    width: 60vw;
    font-size: 2vw;
    margin-top: 5vh;
    margin-left: 14vw;
    transform-origin: 0% 0%;
    transition: all 1.5s;
    perspective: 80vw;
}

.letter {
    box-sizing: border-box;
    position: absolute;
    height: 85vw;
    width: 60vw;
    font-size: 2vw;
    transform-origin: 0% 0%;
    transition: all 1.5s;
    perspective: 80vw;
    z-index: 8;
}

.footer {
    position: absolute;
    top: 85vw;
    height: 5vw;
    width: 60vw;
}
</style>
