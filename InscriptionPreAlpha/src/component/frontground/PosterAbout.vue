<script setup lang='ts'>
import Poster from './ThePoster.vue'

const props = defineProps({
    available: {
        type: Boolean,
        default: true
    }
})

const emit = defineEmits<{
    (e: 'busy'): void
    (e: 'free'): void
}>()
</script>

<template>
    <Poster :name="'About'" :label="'À propos'" :label-position="65" @busy="emit('busy')" @free="emit('free')"
        :available="props.available" :shadow-type="2">
        <div class="aboutContent" />
    </Poster>
</template>

<style scoped lang='scss'>
@use '../../assets/base.scss' as *;

.aboutContent {
    background-color: rgb(255, 255, 255);
    width: 60vw;
    height: 80vw;
    border-radius: 0.3vw;
}
</style>
