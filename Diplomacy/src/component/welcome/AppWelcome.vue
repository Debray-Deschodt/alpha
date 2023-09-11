<script setup lang="ts">
import news from './news/TheNews.vue'
import postalCard from './PostaleCard.vue'
import Fullscreen from './FullscreenButton.vue'
import { reactive, ref } from 'vue';

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
  <section class="component-full">

    <Transition name="fadeOut">
      <news v-show='state.active.info' @click="state.active.info = false" />
    </Transition>

    <Transition name="fadeOut2">
      <postalCard class='' v-show="state.active.postalCard" @passwordValue="emitPassword" @usernameValue="emitUsername"
        @done="done" />
    </Transition>

    <Fullscreen />
  </section>
</template>

<!--  -->
<style scoped lang="scss">
@use '../../assets/base.scss' as *;
@use '../../assets/animation.scss' as *;

.component-full {
  background-color: black;
}

.fadeOut-leave-active {
  animation: fadeOut 0.5s
}

.fadeOut2-leave-active {
  animation: fadeOut 2s
}
</style>
