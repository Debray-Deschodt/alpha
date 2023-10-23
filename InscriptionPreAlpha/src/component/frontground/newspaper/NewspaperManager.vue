<script setup lang='ts'>
//manage which newspaper the client show
import { ref } from 'vue';
import First from './NewspaperFirst.vue'

const open = ref(false)

</script>

<template>
    <section>
        <Transition name="fadeOut" mode="out-in">
            <div v-if="open" class="scroll" style="position: absolute; z-index: 9;">
                <section class="component-full" />
                <div @click="open = false" class="button-close">X</div>
                <First :style="'position: absolute; top:0vh; left:0vw; transform: rotate(1deg)'" />
            </div>
            <First v-else @click="open = true"
                :style="'position: absolute; top:78vh; left:47vw; transform: rotate(357deg); filter: brightness(1.25);'" />
        </Transition>
    </section>
</template>

<style scoped lang='scss'>
@use '../../../assets/base.scss' as *;

.component-full {
    background: rgba(109, 109, 109, 0.26);
    height: 60vw;
}

@keyframes fadeOut {
    0% {
        opacity: 1;
    }

    100% {
        opacity: 0;
    }
}

.fadeOut-enter-active {
    animation: fadeOut reverse 0.2s;
}

.fadeOut-leave-active {
    animation: fadeOut 0.2s;
}
</style>
