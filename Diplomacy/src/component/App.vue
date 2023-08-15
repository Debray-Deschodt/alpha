<script setup lang="ts">

import { provide, reactive, ref } from 'vue';
import Welcome from './welcome/AppWelcome.vue'
import Menu from './menu/AppMenu.vue'
import Rules from './gamesRules/GamesRules.vue'
import Tutorial from './gamesRules/TheTutorial.vue'

const username = ref('')
const password = ref('')

const state = reactive({
  active: {
    welcome: true,
    menu: false,
    play: false,
    host: false,
    rules: false,
    tutorial: false,
  },
  account: {
    username: username,
    password: password,
  }
})


provide('username', username)
provide('password', password)

//this function prolongs the v-on in the menu and manages the active parts.
function done(from: String) {
  switch (from) {
    case 'welcome': state.active.welcome = false
      setTimeout(() => { state.active.menu = true }, 2000)
      break
    //('done', from:string) means you want to close this part
    case 'play': state.active.play = false; state.active.menu = true; break
    case 'host': state.active.host = false; state.active.menu = true; break
    case 'rules': state.active.rules = false; state.active.menu = true; break
    case 'tutorial': state.active.tutorial = false; break
    //('done', gofrom:string) means you want to go to this part 
    case 'goWelcome': state.active.welcome = true; state.active.menu = false; break
    case 'goPlay': state.active.play = true; state.active.menu = false; break
    case 'goHost': state.active.host = true; state.active.menu = false; break
    case 'goRules': state.active.rules = true; state.active.menu = false; break
    case 'goTutorial': state.active.tutorial = true; state.active.menu = false; break
  }
}

function setUsername(usernameValue: string) {
  state.account.username = usernameValue
}
function setPassword(passwordValue: string) {
  state.account.password = passwordValue
}

</script>

<template>
  <Transition name="fade" mode="out-in">
    <Welcome @passwordValue="setPassword" @usernameValue="setUsername" v-if="state.active.welcome" @done="done" />
  </Transition>
  <Menu class='absolute' v-if="state.active.menu" @done='done' />
  <Rules class='absolute' v-if="state.active.rules" @done='done' />
  <Tutorial class='absolute' v-if="state.active.tutorial" @done='done' />
</template>

<style lang="scss">
.absolute {
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
}

@keyframes fade {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}

.fade-enter-active {
  animation: fade 2s;
}

.fade-leave-active {
  animation: fade 2s reverse;
}

body {
  background: linear-gradient(to left, black, rgb(41, 26, 3));
}
</style>
