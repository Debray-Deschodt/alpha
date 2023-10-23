<script setup lang='ts'>
import blogSong from '../../audio/blogSong.mp3'
import menuSong from '../../audio/menuSong.mp3'
import { watch } from 'vue';

const props = defineProps({
    menu: {
        type: Boolean,
        required: true
    },
    blog: {
        type: Boolean,
        required: true
    },
    music: {
        type: Number,
        default: 0.7
    },
    fx: {
        type: Number,
        default: 0.2
    }
})

const audio = [new Audio(blogSong), new Audio(menuSong)]
audio[0].loop = true
audio[1].loop = true

let RecurcivityOccurence = 1
function soundFadeIn(audio: HTMLAudioElement, time: number, volume: number) {
    if (RecurcivityOccurence < time) {
        setTimeout(() => {
            audio.volume += (1 / time) * volume
            RecurcivityOccurence++
            soundFadeIn(audio, time, volume)
        }, 25)
    } else {
        audio.volume = volume
    }
}

function soundFadeOut(audio: HTMLAudioElement, time: number, volume: number) {
    if (RecurcivityOccurence < time) {
        setTimeout(() => {
            audio.volume -= (1 / time) * volume
            RecurcivityOccurence++
            soundFadeOut(audio, time, volume)
        }, 25)
    } else {
        audio.volume = 0
        audio.pause()
        audio.currentTime = 0
    }
}

watch(() => props.blog, active => {
    RecurcivityOccurence = 1
    if (active) {
        audio[0].volume = 0
        audio[0].play()
        soundFadeIn(audio[0], 20, props.music)
    } else {
        soundFadeOut(audio[0], 20, props.music)
    }
})

watch(() => props.menu, active => {
    RecurcivityOccurence = 1
    if (active) {
        audio[1].volume = 0
        audio[1].play()
        soundFadeIn(audio[1], 20, props.fx)
    } else {
        soundFadeOut(audio[1], 20, props.fx)
    }
})

watch(() => props.music, value => {
    audio[0].volume = value
})

watch(() => props.fx, value => {
    audio[1].volume = value
})
</script>

<template>
    <section>
    </section>
</template>

<style scoped lang='scss'>
@use '../../assets/base.scss' as *;
</style>
