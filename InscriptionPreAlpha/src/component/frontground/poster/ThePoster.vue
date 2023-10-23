<script setup lang='ts'>
/* manage the blog poster position and its state (stored or not)*/
import { onMounted, ref, watch } from 'vue';
import Letter from '../../usable/letter/TheLetter.vue'
import Filter from '../../usable/letter/filtersLetter.vue'

const props = defineProps({
    name: {
        type: String,
        required: true
    },
    label: {
        type: String,
        required: true
    },
    labelPosition: {
        type: Number,
        required: true
    },
    available: { // check if another one is not open
        type: Boolean,
        default: true
    },
    button1Name: {
        type: String,
        required: false
    },
    tip: {
        type: String,
        required: false
    },
    shadowType: {
        type: Number,
        default: 0
    }
})

const emit = defineEmits<{
    (e: 'done'): void
    (e: 'doneFromLabel'): void
    (e: 'busy'): void
    (e: 'free'): void
}>()

const closedOpenedPlayed = ref(1)
const setterClosed = () => {
    closedOpenedPlayed.value = 1
}
const setterOpened = () => {
    closedOpenedPlayed.value = 3
}
const setterOpen = () => {
    if (closedOpenedPlayed.value == 1 && props.available == true) {
        emit('busy')
        closedOpenedPlayed.value = 4
    }
}

const setterClose = () => {
    closedOpenedPlayed.value = 2
    emit('free')
}

function store() {
    const blog = document.querySelector("#" + props.name)
    blog!.setAttribute('style', 'top: 5vh; left: 20vw;')
    setTimeout(() => {
        blog!.setAttribute('style', 'top: 5vh; left: 100vw;')
    }, 1)
}

function play() {
    const blog = document.querySelector("#" + props.name)
    blog!.setAttribute('style', 'top: 5vh; left: 100vw;')
    setTimeout(() => {
        blog!.setAttribute('style', 'top: 5vh; left: 20vw;')
        setTimeout(() => {
            closedOpenedPlayed.value = 5
        }, 1500)
    }, 1)
}

// set the first position
onMounted(() => {
    const blog = document.querySelector("#" + props.name)
    blog!.setAttribute('style', 'top: 5vh; left: 100vw;')
})

watch(() => closedOpenedPlayed.value, (state) => {
    switch (state) {
        case 1: store(); break
        case 3: play(); break
    }
})

</script>

<template>
    <Transition name="fade">
        <div v-if="closedOpenedPlayed == 5" class="background component-full">
            <div @click="setterClose()" class="button-close">X</div>
        </div>
    </Transition>
    <Letter :name="props.name" :state="closedOpenedPlayed" :close="setterClosed" :open="setterOpened">
        <slot />
        <div class="label" :style="'top:' + labelPosition + 'vh'" @click.left="setterOpen()"
            @click.right.prevent="emit('doneFromLabel')">{{ label }}</div>
        <Filter :shadow-type="shadowType" />
    </Letter>
    <button v-if="button1Name && closedOpenedPlayed == 5" @click="emit('done')">{{ button1Name }}</button>
    <p v-if="tip && closedOpenedPlayed == 5" class="tip"> {{ tip }}</p>
</template>

<style scoped lang='scss'>
@use '../../../assets/base.scss' as *;

.background {
    background: rgba(109, 109, 109, 0.342);
    z-index: 49;
}

button {
    position: absolute;
    top: 80vh;
    left: 5vw;
    z-index: 52;
    border: 1px solide black;
    font-size: 1.5vw;
}

.tip {
    top: 86vh;
    left: 5.5vw;
    font-size: 1vw;
}

.label {
    box-sizing: border-box;
    padding-left: 2vw;
    padding-top: 0.3vw;
    position: absolute;
    transform-origin: 100% 50%;
    transform: rotateY(2deg);
    background-color: rgba(255, 255, 255, 0.61);
    left: -12vw;
    width: 15vw;
    height: 3vw;
    transition: all 0.3s;
    box-shadow:
        0px 2.7px 5.3px rgba(0, 0, 0, 0.028),
        0px 8.9px 17.9px rgba(0, 0, 0, 0.042),
        0px 40px 80px rgba(0, 0, 0, 0.07);

    &:hover {
        transform: rotateY(0deg);
    }
}

.fade-enter-active {
    transition: all 1s;
}

.fade-leave-active {
    transition: all 0.3s;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
