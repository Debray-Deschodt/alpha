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
    <Poster :name="'Blog'" :label="'Blog'" :label-position="25" :button1-name="'Accéder'"
        :tip="'tip: clic droit sur l\'étiquette'" :available="props.available" :shadow-type="1" @busy="emit('busy')"
        @free="emit('free')">
        <div class=" letterContent" />
    </Poster>
</template>

<style scoped lang='scss'>
@use '../../assets/base.scss' as *;

.letterContent {
    background-image: url(../../img/posterBlog.jpg);
    background-size: cover;
    width: 60vw;
    height: 85vw;
    border-radius: 0.3vw;
}
</style>
