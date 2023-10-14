<script setup lang='ts'>

defineProps({
    shadowType: {
        type: Number,
        default: 0
    }
})

</script>

<template>
    <section v-if="shadowType == 1">
        <div class="filtre1" />
        <div class="filtre2" />
    </section>

    <section v-else-if="shadowType == 2">
        <div class="filtre3" />
    </section>

    <section v-else>
        <div class="filtre1" />
    </section>
</template>

<style scoped lang='scss'>
@use '../../../assets/base.scss' as *;

.filtre1 {
    position: absolute;
    top: 0;
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0) 25%, rgba(0, 0, 0, 0.1) 50%, rgba(0, 0, 0, 0) 50.2%);
    height: 100%;
    width: 100%;
}

.filtre2 {
    position: absolute;
    top: 0;
    left: 0;
    background: linear-gradient(to right, rgba(0, 0, 0, 0) 49.5%, rgba(0, 0, 0, 0.096) 50%, rgba(0, 0, 0, 0) 75%);
    height: 100%;
    width: 100%;
}

.filtre3 {
    position: absolute;
    top: 0;
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0) 7%, rgba(0, 0, 0, 0.1) 33%, rgba(0, 0, 0, 0) 33.2%, rgba(0, 0, 0, 0) 58%, rgba(0, 0, 0, 0.1) 66%, rgba(0, 0, 0, 0) 66.2%);
    height: 100%;
    width: 100%;
}
</style>
