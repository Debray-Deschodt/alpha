<script setup lang="ts">
import PaperStackManager from './component/paperStack/StackManager.vue'
import ShadowManager from './component/paperStack/shadow/ShadowManager.vue'
import Loader from './component/loader/LoaderPrelude.vue'
import FrontgroundManager from './component/frontground/FrontgroundManager.vue'
import Blog from './component/blog/TheBlog.vue'
import Fullscreen from './component/usable/FullscreenButton.vue'
import AudioReader from './component/audio/AudioReader.vue'
import Register from './component/connection/TheRegister.vue'

import { provide, reactive, ref } from 'vue';

const stateActive = reactive({
  interface: false,
  register: true,
  loader: false,
  menu: false,
  title: true,
  blog: false
})

const username = ref('')
const setUsername = (usernameValue: string) => username.value = usernameValue

const fullscreenButtonColorBlack = ref(false)

function manager(from: string) {
  switch (from) {
    case 'goBlog': stateActive.blog = true; fullscreenButtonColorBlack.value = true; break
    case 'blog': stateActive.blog = false; break
    case 'goMenu': stateActive.menu = true; stateActive.title = false; fullscreenButtonColorBlack.value = true; stateActive.loader = false; break
    case 'menu': stateActive.menu = false; stateActive.title = true; fullscreenButtonColorBlack.value = false; stateActive.register = true; stateActive.interface = false; break
    case 'startMenu': stateActive.menu = true; break
    case 'connect': stateActive.loader = true; stateActive.interface = true; stateActive.register = false; break
  }
}

provide('username', username)
// const username = inject<any>('username')
</script>

<template >
  <section id='menu' class="component-full" v-if="stateActive.menu">
    <ShadowManager :loaded="!stateActive.loader" />
    <PaperStackManager :loaded="!stateActive.loader" draggable="true" @dragstart.prevent />
    <FrontgroundManager @done="manager" :loaded="!stateActive.loader" :title="stateActive.title" draggable="true"
      @dragstart.prevent />
  </section>

  <Transition name="fade" enter-active-class="">
    <Loader @done="manager('goMenu')" v-if="stateActive.loader" @started="manager" />
  </Transition>

  <Blog v-if="stateActive.blog" @done="manager" />

  <KeepAlive>
    <Fullscreen :black="fullscreenButtonColorBlack" v-if="stateActive.interface" />
  </KeepAlive>
  <AudioReader :blog="stateActive.blog" v-if="stateActive.interface" />

  <Register v-if="stateActive.register" @done="manager" @username="setUsername" />
</template>

<style scoped lang="scss">
@use './assets/base.scss' as *;

.component-full {
  background: radial-gradient(ellipse at bottom, rgb(255, 255, 255), var(--background));
  overflow: hidden;
}

.fade-leave-active {
  transition: all 1s ease;
}

.fade-leave-to {
  opacity: 0;
}
</style>