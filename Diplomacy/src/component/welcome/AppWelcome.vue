<script setup lang="ts">
import { reactive, ref } from 'vue';
import news from '../news/TheNews.vue'
import postalCard from './PostaleCard.vue'
import Fullscreen from './FullscreenButton.vue'

const state = reactive({
  active: {
    info: true,
    postalCard: true,
  }
})

const emit = defineEmits<{
  (e: 'done', from: string): void
  (e: 'usernameValue', value: string): void
  (e: 'passwordValue', value: string): void
}>()

function emitUsername(value: string) {
  emit('usernameValue', value)
}

function emitPassword(value: string) {
  emit('passwordValue', value)
}

function done(from: string) {
  switch (from) {
    case 'welcome': state.active.postalCard = false; console.log(state.active.postalCard); setTimeout(() => { emit('done', 'welcome') }, 2000); break
    case 'news': state.active.info = false; break
  }
}

</script>

<template>
  <section class="absolute">
    <Transition name="fadeOut">
      <news v-show='state.active.info' @click="state.active.info = false" />
    </Transition>
    <Transition name="fadeOut2">
      <postalCard v-show="state.active.postalCard" @passwordValue="emitPassword" @usernameValue="emitUsername"
        @done="done" />
    </Transition>

    <Fullscreen />
  </section>
</template>

<!--  -->
<style scoped lang="scss">
@use '../../assets/base.scss' as *;

body {
  // background: linear-gradient(to left, black, rgb(41, 26, 3));
  background-color: black;
}

.absolute {
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
}

@keyframes fadeOut {
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
}

.fadeOut-leave-active {
  animation: fadeOut 0.5s
}

.fadeOut2-leave-active {
  animation: fadeOut 2s
}
</style>
