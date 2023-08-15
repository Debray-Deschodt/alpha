<script setup lang='ts'>

const emit = defineEmits<{
    (e: 'done', from: String): void
}>()

</script>

<template>
    <section class='background'>
        <section class="gif"></section>
    </section>
</template>

<style scoped lang='scss'>
@use '../../assets/base.scss' as *;

.background {
    background-color: antiquewhite;
    height: 100vh;
    width: 100vw;
    margin: 0px;
    padding: 0px;
}

.gif {
    background-image: url('../../sprite/BérangèreCanard/BerangèreJaune1920vw50is.gif');
    height: 100vh;
    width: 100vw;
    margin: 0px;
    padding: 0px;
    background-size: 100vw 100vh;
}
</style>