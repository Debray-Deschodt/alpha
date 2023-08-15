<script setup lang='ts'>

const emit = defineEmits<{
    (e: 'done', from: String): void
}>()

</script>

<template>
    <body>
        <h1>Didactitiel Video</h1>
        <p @click="emit('done', 'tutorial')">retour menu</p>
    </body>
</template>

<style scoped lang='scss'>
@use '../../assets/base.scss' as *;

body {
    height: 100vh;
    width: 100vw;
    background-color: white;
    margin: 0px;
}
</style>