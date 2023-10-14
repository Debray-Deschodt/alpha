<script setup lang='ts'>
import { onMounted, reactive, ref } from 'vue';

const emit = defineEmits<{
    (e: 'done'): void
    (e: 'started', from: string): void
}>()

const title = reactive({
    value: '',
    rest: ''
})

const stateActive = reactive({
    present: false,
    continue: false
})

const input = ref<HTMLInputElement | null>(null)
let forIndex = 0

const interval = setInterval(() => {
    switch (forIndex) {
        case 5: title.value = 'First Lemma'.substring(0, forIndex + 1)
            title.rest = 'First Lemma'.substring(forIndex + 1, 12)
            forIndex++
            break
        case 13: stateActive.present = true; break
        case 15: stateActive.continue = true
            clearInterval(interval)
            break;
        default: title.value = 'First Lemma'.substring(0, forIndex)
            title.rest = 'First Lemma'.substring(forIndex, 12)
            break
    }
    forIndex++
}, 350)

setInterval(() => {
    input.value?.focus()
}, 100)

onMounted(() => {
    setTimeout(() => {
        emit('started', 'startMenu')
    }, 50)
})

</script>

<template>
    <section @click="emit('done')" style="background: black" class="component-full">
        <input ref="input" @keydown="emit('done')" id='loaderSkiper' name='loaderSkiper' />
        <h1 id="loaderTitle">{{ title.value }}<a style="color:transparent">{{ title.rest }}</a></h1>
        <Transition name="fade">
            <h2 v-if="stateActive.present" id="present">Present</h2>
        </Transition>
        <Transition name="fade">
            <h3 v-if="stateActive.continue">- Cliquer pour continuer -</h3>
        </Transition>
    </section>
</template>

<style scoped lang='scss'>
@use '../../assets/base.scss' as *;

.component-full {
    background-color: black;
    color: white;
    font-size: 10vw;
    font-family: 'Markazi Text', serif;
    z-index: 9;
}

h1 {
    width: 100vw;
    position: absolute;
    top: 25vh;
    left: 0vw;
    font-size: 10vw;
    text-align: center;
    padding: 0;
    margin: 0;
    letter-spacing: 0.2vw;
}

h2 {
    width: 100vw;
    position: absolute;
    top: 50vh;
    left: 0vw;
    padding: 0;
    margin: 0;
    font-size: 5vw;
    text-align: center;
}

h3 {
    width: 100vw;
    position: absolute;
    top: 90vh;
    left: 0vw;
    padding: 0;
    margin: 0;
    color: rgb(221, 221, 221);
    font-size: 1.2vw;
    text-align: center;
    animation: 2s ease-in-out infinite alternate fadeInOut;
}

#loaderSkiper {
    height: 0;
    width: 0;
    margin-left: -100vw;
}

.fade-enter-active {
    transition: all 2s;
}

.fade-enter-from {
    opacity: 0;
}

@keyframes fadeInOut {
    0% {
        opacity: 0.5;
    }
}
</style>