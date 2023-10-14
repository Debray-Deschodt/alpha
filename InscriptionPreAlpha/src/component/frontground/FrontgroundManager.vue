<script setup lang='ts'>
/* manage wich poster is active or not */
import PosterBlog from './PosterBlog.vue'
import PosterRegister from './PosterRegister.vue'
import PosterAbout from './PosterAbout.vue'
import PosterRules from './PosterRules.vue'
import { ref, watch } from 'vue';

const emit = defineEmits<{
    (e: 'done', from: string): void
}>()

const props = defineProps({
    loaded: Boolean,
    title: Boolean
})

const isItAvailable = ref(true)
const titleSwitch = ref(true)

watch(() => props.title, () => {
    setTimeout(() => {
        titleSwitch.value = false
    }, 500)
})
</script>

<template>
    <section v-show="props.loaded">
        <Transition name="fadeOut" enterActiveClass="">
            <h1 v-show="titleSwitch">Uchronie</h1>
        </Transition>
        <PosterRegister :available="isItAvailable" @busy="isItAvailable = false" @free="isItAvailable = true" />
        <PosterBlog @done="emit('done', 'goBlog')" @doneFromLabel="emit('done', 'goBlog')" :available="isItAvailable"
            @busy="isItAvailable = false" @free="isItAvailable = true" />
        <PosterRules :available="isItAvailable" @busy="isItAvailable = false" @free="isItAvailable = true" />
        <PosterAbout :available="isItAvailable" @busy="isItAvailable = false" @free="isItAvailable = true" />
        <button @click="emit('done', 'menu')" style="top: 91vh; left: 5vw">Quitter</button>
        <!-- <button style="top: 91vh; left: 43vw">Lancer une partie</button> -->
        <button style="top: 91vh; left: 85vw">Réglages</button>
    </section>
</template>

<style scoped lang='scss'>
@use '../../assets/base.scss' as *;
@use '../../assets/animation.scss' as *;

h1 {
    position: absolute;
    top: 30vh;
    height: 25vw;
    width: 90vw;
    margin: 5vw;
    padding: 0;
    z-index: 1;
    color: rgb(49, 44, 44);
    text-align: center;
    font-family: 'Open Sans', sans-serif;
    font-size: 8vw;
    font-weight: 100;
    letter-spacing: 0.3vw;
}

button {
    position: absolute;
}

.fadeOut-leave-active {
    animation: fadeOut 1s;
}
</style>
