<script setup lang='ts'>
import { ref } from 'vue';
import Stack from './TheStack.vue'
import stackData from '../../data/paperStack.data'

const stacks = ref(stackData)
</script>

<template>
    <section>
        <Stack v-for="stack in stacks" :key="stack.id" :data="stack" />
    </section>
</template>

<style scoped lang='scss'>
@use '../../assets/base.scss' as *;

section {
    background-color: transparent;
}

.fade-leave-active {
    transition: all 1s ease;
}

.fade-leave-to {
    opacity: 0;
}
</style>