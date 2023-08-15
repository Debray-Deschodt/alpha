<script setup lang="ts">
import { ref } from 'vue';
import news from '../news/TheNews.vue'
import postalCard from './PostaleCard.vue'
import Fullscreen from './FullscreenButton.vue'

const heKnowsInfo = ref(false);

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
    case 'welcome': emit('done', 'welcome'); break
    case 'news': heKnowsInfo.value = true; break
  }
}

</script>

<template>
  <section>
    <Transition name="fadeOut">
      <news v-show='!heKnowsInfo' @click="heKnowsInfo = true" />
    </Transition>
    <postalCard @passwordValue="emitPassword" @usernameValue="emitUsername" @done="done" />
    <Fullscreen />
  </section>
</template>

<!--  -->
<style lang="scss">
@use '../../assets/base.scss' as *;

body {
  background-color: black;
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
</style>
