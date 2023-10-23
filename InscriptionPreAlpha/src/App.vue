<script setup lang="ts">
import PaperStackManager from './component/paperStack/StackManager.vue'
import ShadowManager from './component/paperStack/shadow/ShadowManager.vue'
import Loader from './component/loader/LoaderPrelude.vue'
import FrontgroundManager from './component/frontground/FrontgroundManager.vue'
import Blog from './component/blog/TheBlog.vue'
import Fullscreen from './component/usable/FullscreenButton.vue'
import AudioReader from './component/audioReader/AudioReader.vue'
import Register from './component/connection/TheRegister.vue'
import AdminPanel from './component/admin/AppAdmin.vue'
import Settings from './component/settings/TheSettings.vue'

import { onMounted, provide, reactive, ref } from 'vue';

const stateActive = reactive({
  interface: false,
  register: true,
  loader: false,
  menu: {
    if: false,
    show: true
  },
  title: true,
  blog: false
})

const username = ref('')
const admin = ref(false)
const setUsername = (usernameValue: string) => username.value = usernameValue
const setadmin = (isAdmin: boolean) => { admin.value = isAdmin; console.log(admin.value) }
const musicVolume = ref(0.7)
const fxVolume = ref(0.5)
const fullscreenButtonColorBlack = ref(false)

function manager(from: string) {
  switch (from) {
    case 'goBlog': stateActive.blog = true; fullscreenButtonColorBlack.value = true; stateActive.menu.show = false; break
    case 'blog': stateActive.blog = false; stateActive.menu.show = true; break
    case 'goMenu': stateActive.menu.if = true; stateActive.title = false; fullscreenButtonColorBlack.value = true; stateActive.loader = false; break
    case 'menu': stateActive.menu.if = false; stateActive.title = true; fullscreenButtonColorBlack.value = false; stateActive.register = true; stateActive.interface = false; break
    case 'startMenu': stateActive.menu.if = true; break
    case 'connect': stateActive.loader = true; stateActive.interface = true; stateActive.register = false; break
    case 'exit': stateActive.interface = false; stateActive.register = true; stateActive.loader = false; stateActive.menu.if = false; stateActive.menu.show = true; stateActive.title = true; stateActive.blog = false; fullscreenButtonColorBlack.value = false; break
  }
}

function setVolumeMusic(value: number) {
  musicVolume.value = value
}

function setVolumeFx(value: number) {
  fxVolume.value = value
}

function parseCookie(str: string) {
  const cookies = str.split('; ').map((v) => v.split('='))
  return cookies;
}

provide('username', username)
provide('admin', admin)
// const username = inject<any>('username')

onMounted(() => {
  if (document.cookie) {
    switch (parseCookie(document.cookie)[0][0]) {
      case 'music': musicVolume.value = parseInt(parseCookie(document.cookie)[0][1]) / 100; break
      case 'fx': fxVolume.value = parseInt(parseCookie(document.cookie)[0][1]) / 100; break
    }
    switch (parseCookie(document.cookie)[1][0]) {
      case 'music': musicVolume.value = parseInt(parseCookie(document.cookie)[1][1]) / 100; break
      case 'fx': fxVolume.value = parseInt(parseCookie(document.cookie)[1][1]) / 100; break
    }
  }
})

</script>

<template >
  <section id='menu' class="component-full" v-if="stateActive.menu.if" v-show="stateActive.menu.show">
    <ShadowManager :loaded="!stateActive.loader" />
    <PaperStackManager :loaded="!stateActive.loader" draggable="true" @dragstart.prevent />
    <FrontgroundManager @done="manager" :loaded="!stateActive.loader" :title="stateActive.title" draggable="true"
      @dragstart.prevent />
  </section>

  <Transition name="fade" enter-active-class="">
    <Loader @done="manager('goMenu')" v-if="stateActive.loader" @started="manager" />
  </Transition>

  <Blog v-if="stateActive.blog" @done="manager" />

  <Settings @done="manager" v-if="stateActive.interface" @volumeMusic="setVolumeMusic" @volumeFx="setVolumeFx"
    :music="musicVolume" :fx="fxVolume" />
  <KeepAlive>
    <Fullscreen :black="fullscreenButtonColorBlack" v-if="stateActive.interface" />
  </KeepAlive>

  <AudioReader :blog="stateActive.blog" :menu="stateActive.menu.if && stateActive.menu.show" :music="musicVolume"
    :fx="fxVolume" />

  <Register v-if="stateActive.register && !admin" @done="manager" @username="setUsername" @admin="setadmin" />
  <AdminPanel v-if="admin && stateActive.register" @done="manager" @username="setUsername" @admin="setadmin"
    @deconnection="admin = false" />
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