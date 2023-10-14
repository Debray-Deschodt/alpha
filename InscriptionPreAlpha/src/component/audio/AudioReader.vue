<script setup lang='ts'>
import blogSong from '../../audio/blogSong.mp3'
import { watch } from 'vue';

const props = defineProps({
    // loader: {
    //     type: Boolean,
    //     required: true
    // },
    // menu: {
    //     type: Boolean,
    //     required: true
    // },
    blog: {
        type: Boolean,
        required: true
    },
})

const audio = [new Audio(blogSong)]
audio[0].loop = true

let RecurcivityOccurence = 1
function soundFadeIn(audio: HTMLAudioElement, time: number) {
    if (RecurcivityOccurence < time) {
        setTimeout(() => {
            audio.volume += (1 / time)
            RecurcivityOccurence++
            soundFadeIn(audio, time)
        }, 25)
    }
}

function soundFadeOut(audio: HTMLAudioElement, time: number) {
    if (RecurcivityOccurence < time) {
        setTimeout(() => {
            audio.volume -= (1 / time)
            RecurcivityOccurence++
            soundFadeOut(audio, time)
        }, 25)
    } else {
        audio.pause()
        audio.currentTime = 0
        console.log(audio.currentTime)
    }
}

watch(() => props.blog, loader => {
    RecurcivityOccurence = 1
    if (loader) {
        audio[0].volume = 0
        audio[0].play()
        soundFadeIn(audio[0], 20)
    } else {
        soundFadeOut(audio[0], 20)
    }
})

</script>

<template>
    <section>
        <button>Mute</button>
        <button>Unmute</button>
    </section>
</template>

<style scoped lang='scss'>
@use '../../assets/base.scss' as *;
</style>
