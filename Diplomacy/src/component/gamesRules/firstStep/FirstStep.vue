<script setup lang='ts'>
import { onMounted, reactive } from 'vue';
import First from './FirstStepContent.vue'

const props = defineProps({
    open: Boolean,
    size: {
        type: Number,
        default: 1,
    }
})

const state = reactive({
    active: {
        close: {
            top: true,
            bot: true,
        },
    }
})

onMounted(() => {
    const letters = document.getElementsByClassName("resized")
    const letterStyle = "width:" + props.size * 64.22 + 'vw; height:' + props.size * 30 + 'vw;';
    for (const letter of letters) {
        letter.setAttribute("style", letterStyle)
    }
    state.active.close.top = false

    document.querySelector(".mid")?.setAttribute("style", letterStyle + 'top:' + props.size * 30 + 'vw')
    document.querySelector(".bot")?.setAttribute("style", letterStyle + 'top:' + props.size * 60 + 'vw')
    document.querySelector(".bot .child")?.setAttribute("style", "top: -" + 60 * props.size + "vw; width:" + props.size * 64.22 + "vw; height:" + 90 * props.size + "vw;")
    document.querySelector(".mid .child")?.setAttribute("style", "top: -" + 30 * props.size + "vw; width:" + props.size * 64.22 + "vw; height:" + 60 * props.size + "vw;")
    document.querySelector(".bot-close .child")?.setAttribute("style", "top : -" + 90 * props.size + "vw")
    document.querySelector(".bot-close")?.setAttribute("style", letterStyle + "vw; top:" + 60 * props.size + "vw")
    state.active.close.bot = false

})

</script>

<template>
    <section class='component'>
        <div class='mid component-full'>
            <First :size="props.size" class='child' />
        </div>
        <Transition name="foldBot" @before-enter="state.active.close.bot = false"
            @after-leave="state.active.close.bot = true">
            <div class='bot component-full' v-show="props.open">
                <First :size="props.size" class='child' />
            </div>
        </Transition>
        <div class='bot component-full bot-close resized' v-show="state.active.close.bot">
            <First :size="props.size" class='child' />
        </div>
        <Transition name="foldTop" @before-enter="state.active.close.top = false"
            @after-leave="state.active.close.top = true">
            <div class='top component-full resized' v-show="props.open">
                <First :size="props.size" class='child resized' />
            </div>
        </Transition>
        <div class='top component-full top-close resized' v-show="state.active.close.top">
            <First :size="props.size" class='child resized' />
        </div>
    </section>
</template>


<style scoped lang='scss'>
@use "../../../assets/base.scss" as *;
@use "../../../assets/animation.scss" as *;

%sized {
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

.bot {
    @extend %sized;
    left: 10vw;
    transform-origin: 50% 0%;
    transform: perspective(90vw);

    &-close {
        transform: rotateX(179.99deg);
        color: rgba(255, 255, 255, 0);
        overflow: hidden;
    }
}

.mid {
    left: 10vw;
}

.mid,
.top .child,
.mid .child,
.bot .child {
    @extend %sized;
}
</style>