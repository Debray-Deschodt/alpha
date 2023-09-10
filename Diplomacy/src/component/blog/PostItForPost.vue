<script setup lang='ts'>
import type { PostItInterface } from '@/interface/postIt.interface';

defineProps<{
    data: PostItInterface,
}>()

</script>

<template>
    <section class="container">
        <div class="post" :style="'background-color:#' + data.color" />
    </section>
</template>

<style scoped lang='scss'>
@use '../../assets/base.scss' as *;

.container {
    display: flex;
    justify-content: center;
    padding-top: 10vh;
    width: 100vw;
}

.post {
    height: 40vw;
    width: 40vw;
    box-shadow:
        2.8px 2.8px 2.2px rgba(0, 0, 0, 0.02),
        6.7px 6.7px 5.3px rgba(0, 0, 0, 0.028),
        12.5px 12.5px 10px rgba(0, 0, 0, 0.035),
        22.3px 22.3px 17.9px rgba(0, 0, 0, 0.042),
        41.8px 41.8px 33.4px rgba(0, 0, 0, 0.05),
        100px 100px 80px rgba(0, 0, 0, 0.07);
}
</style>