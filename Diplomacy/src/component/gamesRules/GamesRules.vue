<script setup lang="ts">
import { reactive } from 'vue'
import FirstStep from '../usable/letter/TheLetter.vue'

const emit = defineEmits<{
    (e: 'done', from: string): void
}>()

const state = reactive({
    first: {
        active: true,
        open: true
    },
    second: {
        active: false
    }
})
</script>

<template>
    <button @click="emit('done', 'rules')">Retour menu</button>
    <button @click="state.first.open = !state.first.open">fermer/ouvrir</button>
    <FirstStep :size="0.7" :open="state.first.open" v-show="state.first.active" />
</template>

<style scoped lang="scss">
@use '../../assets/base.scss' as *;

button {
    margin: 10vw 0 0 80vw;
}
</style>
