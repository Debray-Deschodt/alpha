<script setup lang="ts">
import { provide, reactive, ref } from 'vue';
import Welcome from './welcome/AppWelcome.vue'
import Menu from './menu/AppMenu.vue'
import Rules from './gamesRules/GamesRules.vue'
import Tutorial from './gamesRules/TheTutorial.vue'

//provide doesn't work with reactive, we needs ref before a future fix.
const username = ref('')
const password = ref('')
function setUsername(usernameValue: string) { state.account.username = usernameValue }
function setPassword(passwordValue: string) { state.account.password = passwordValue }
provide('username', username)
provide('password', password)

const state = reactive({
  active: {
    welcome: false,
    menu: false,
    play: false,
    host: false,
    rules: true,
    tutorial: false,
  },
  account: {
    username: username,
    password: password,
  }
})

//this function prolongs the @done and manages the active components.
function done(from: String) {
  switch (from) {
    //('done', from:string) means you want to close this component
    case 'welcome': state.active.welcome = false; state.active.menu = true; break
    case 'play': state.active.play = false; state.active.menu = true; break
    case 'host': state.active.host = false; state.active.menu = true; break
    case 'rules': state.active.rules = false; state.active.menu = true; break
    case 'tutorial': state.active.tutorial = false; break
    //('done', goTo:string) means you want to go to this component 
    case 'goWelcome': state.active.welcome = true; state.active.menu = false; break
    case 'goPlay': state.active.play = true; state.active.menu = false; break
    case 'goHost': state.active.host = true; state.active.menu = false; break
    case 'goRules': state.active.rules = true; state.active.menu = false; break
    case 'goTutorial': state.active.tutorial = true; state.active.menu = false; break
  }
}
</script>

<template>
  <Welcome v-if="state.active.welcome" @passwordValue="setPassword" @usernameValue="setUsername" @done="done" />
  <Menu v-if="state.active.menu" @done='done' />
  <Rules v-if="state.active.rules" @done='done' />
  <Tutorial v-if="state.active.tutorial" @done='done' />
</template>
