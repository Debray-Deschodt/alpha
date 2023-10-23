<script setup lang="ts">
import axios from 'axios';
import { onMounted, reactive, ref, watch } from 'vue';

const emit = defineEmits<{
    (e: 'done', from: string): void
    (e: 'volumeMusic', value: number): void
    (e: 'volumeFx', value: number): void
}>()

const props = defineProps({
    fx: {
        type: Number,
        default: 1
    },
    music: {
        type: Number,
        default: 0.75
    }
})

const stateActive = reactive({
    audio: false
})

const newMusic = ref(0)
const newFx = ref(0)
let date = new Date()
date.setFullYear(date.getFullYear() + 1)

function setCookies() {
    stateActive.audio = !stateActive.audio
    document.cookie = 'music=' + newMusic.value * 100 + '; expires=' + date.toUTCString()
    document.cookie = 'fx=' + newFx.value * 100 + '; expires=' + date.toUTCString()
}

onMounted(() => {
    newMusic.value = props.music
    newFx.value = props.fx
})

watch(() => newMusic.value, value => {
    emit('volumeMusic', value)
})

watch(() => newFx.value, value => {
    emit('volumeFx', value)
})

</script>

<template >
    <footer>
        <button @click="emit('done', 'exit')">Quitter</button>
        <button @click="setCookies()">Audio</button>
        <Transition name="fade">
            <button class="audioSettings" v-if="stateActive.audio">
                <div>
                    Music
                </div>
                <input type="range" v-model="newMusic" min="0" max="1" step="any" />
                <div>
                    Son d'ambiance
                </div>
                <input type="range" v-model="newFx" min="0" max="1" step="any" />
            </button>
        </Transition>
    </footer>
</template>

<style scoped lang="scss">
@use '../../assets/base.scss' as *;

footer {
    position: absolute;
    z-index: 1000;
    left: 3vw;
    top: 91.5vh;
    width: 10vw;
    height: 3vw;
    display: flex;
    justify-content: space-between;

    & button {
        border: none;
    }
}

.audioSettings {
    display: flex;
    align-items: center;
    opacity: 0.9;
    width: 30vw;

    &:hover {
        letter-spacing: 0.2vw;
        opacity: 1;
    }

    & input {
        margin: 0.2vw 2vw 0 0.5vw;
    }
}

@keyframes fade {
    0% {
        opacity: 0;
    }

    100% {
        opacity: 0.9;
    }
}

.fade-enter-active {
    animation: fade 0.2s;
}

.fade-leave-active {
    animation: fade reverse 0.2s;
}
</style>