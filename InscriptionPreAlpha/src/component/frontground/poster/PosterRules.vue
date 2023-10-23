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
    <Poster :name="'Didactitiel'" :label="'Didacticiel'" :label-position="45" @busy="emit('busy')" @free="emit('free')"
        :button1-name="'Accéder'" :tip="'tip: clic droit sur l\'étiquette'" :available="props.available">
        <div class=" letterContent" />
    </Poster>
</template>

<style scoped lang='scss'>
@use '../../../assets/base.scss' as *;

.letterContent {
    background-color: rgb(255, 255, 255);
    width: 60vw;
    height: 80vw;
    border-radius: 0.3vw;
}
</style>
