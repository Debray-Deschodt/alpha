<script setup lang='ts'>
import { reactive } from 'vue';
import First from './FirstStepContent.vue'

const props = defineProps({
    open: Boolean,
})

const state = reactive({
    active: {
        close: {
            top: false,
            bot: false,
        },
    }
})


</script>

<template>
    <section class='component'>
        <div class='mid component-full'>
            <First class='child' />
        </div>

        <Transition name="foldBot" @before-enter="state.active.close.bot = false"
            @after-leave="state.active.close.bot = true">
            <div class='bot component-full' v-show="props.open">
                <First class='child' />
            </div>
        </Transition>

        <div class='bot component-full bot-close' v-show="state.active.close.bot">
            <First class='child' />
        </div>

        <Transition name="foldTop" @before-enter="state.active.close.top = false"
            @after-leave="state.active.close.top = true">
            <div class='top component-full' v-show="props.open">
                <First class='child' />
            </div>
        </Transition>

        <div class='top component-full top-close' v-show="state.active.close.top">
            <First class='child' />
        </div>
    </section>
</template>


<style scoped lang='scss'>
@use "../../../assets/base.scss" as *;
@use "../../../assets/animation.scss" as *;

%sized {
    height: 30vw;
    width: 64.22vw;
    // background: linear-gradient(to bottom, white, rgb(245, 245, 245));
    background: linear-gradient(to bottom, white, rgb(220, 220, 220));
}

.top {
    @extend %sized;
    left: 10vw;
    transform-origin: 50% 100%;
    transform: perspective(90vw);

    &-close {
        transform: rotateX(-170deg);
        color: rgba(255, 255, 255, 0);
    }
}

.top .child {
    @extend %sized;
}

.mid {
    @extend %sized;
    left: 10vw;
    top: 30vw;
}

.mid .child {
    @extend %sized;
    height: 60vw;
    top: -30vw;
}

.bot {
    @extend %sized;
    left: 10vw;
    top: 60vw;
    transform-origin: 50% 0%;
    transform: perspective(90vw);

    &-close {
        transform: rotateX(179.99deg);
        color: rgba(255, 255, 255, 0);
    }
}

.bot .child {
    @extend %sized;
    height: 90vw;
    top: -60vw;
}
</style>