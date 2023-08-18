<script setup lang='ts'>
import { reactive } from 'vue';
import First from './FirstStep.vue'

const emit = defineEmits<{
    (e: 'done', from: String): void
}>()

const state = reactive({
    active: {
        lettre: {
            open: true,
            close: {
                top: false,
                bot: false,
            },
        },
    }
})


function action(toDo: String) {
    //faut faire des fonctions là dedans, ce sera plus pratique pour l'intellicence. Dans le cadre ou action n'est pas appeler par des composant enfant c'est tres bien.
    switch (toDo) {
        case 'close': state.active.lettre.open = false; break
        case 'beforeCloseTop': state.active.lettre.close.top = true; break
        case 'beforeCloseBot': state.active.lettre.close.bot = true; break
        case 'open': state.active.lettre.open = true
            state.active.lettre.close.bot = false
            state.active.lettre.close.top = false
            break
    }
}
</script>



<template>
    <button v-if="state.active.lettre.open" @click="action('close')">Close</button>
    <button v-else @click="action('open')">Open</button>
    <section class='mid component-full'>
        <First class='child' />
    </section>

    <Transition name="foldBot" @after-leave="action('beforeCloseBot')">
        <section class='bot component-full' v-show="state.active.lettre.open">
            <First class='child' />
        </section>
    </Transition>
    <section class='bot component-full bot-close' v-show="state.active.lettre.close.bot">
        <First class='child' />
    </section>

    <Transition name="foldTop" @after-leave="action('beforeCloseTop')">
        <section class='top component-full' v-show="state.active.lettre.open">
            <First class='child' />
        </section>
    </Transition>
    <section class='top component-full top-close' v-show="state.active.lettre.close.top">
        <First class='child' />
    </section>
</template>


<style scoped lang='scss'>
@use '../../assets/base.scss' as *;

@keyframes foldTop {
    25% {
        color: black
    }

    32% {
        color: rgba(255, 255, 255, 0);
    }

    100% {
        -ms-transform: rotateX(-170deg);
        /* IE 9 */
        -moz-transform: rotateX(-170deg);
        /* Firefox */
        -webkit-transform: rotateX(-170deg);
        /* Safari and Chrome */
        -o-transform: rotateX(-170deg);
        /* Opera */
        color: rgba(255, 255, 255, 0);
    }
}

@keyframes foldBot {
    25% {
        color: black
    }

    32% {
        color: rgba(255, 255, 255, 0);
    }

    100% {
        -ms-transform: rotateX(179.999deg);
        /* IE 9 */
        -moz-transform: rotateX(179.999deg);
        /* Firefox */
        -webkit-transform: rotateX(179.999deg);
        /* Safari and Chrome */
        -o-transform: rotateX(179.999deg);
        /* Opera */
        color: rgba(255, 255, 255, 0);
    }
}

.foldBot-enter-active {
    animation: foldBot 1.5s reverse;
}

.foldTop-enter-active {
    animation: foldTop 1s reverse;
}

.foldTop-leave-active {
    animation: foldTop 1.5s;
}

.foldBot-leave-active {
    animation: foldBot 1s;
}

button {
    margin-top: 30vw;
    margin-left: 75vw;
}

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