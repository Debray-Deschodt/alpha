<script setup lang="ts">
import Settings from './TheSettings.vue'
import MyAccount from './MyAccount.vue'
import Catalog from './catalog/AppCatalog.vue'
import { inject, reactive } from 'vue';

const emit = defineEmits<{
    (e: 'done', from: String): void
}>()

const state = reactive({
    active: {
        content: true,
        catalog: false,
        settings: false,
        account: false,

    }
})

const username = inject<any>('username')


// Same methode than the App one. some operation are their only for unify the process.
// It prolongs the v-on in the menu and manages the active parts.
function done(from: String) {
    switch (from) {
        case 'all': state.active.account = false; state.active.settings = false; break
        case 'settings': state.active.account = false; break
        case 'account': state.active.account = false; break
        case 'catalog': state.active.catalog = false; state.active.content = true; break
        case 'goSettings': state.active.settings = true; state.active.account = false; break
        case 'goAccount': state.active.account = true; state.active.settings = false; break
        case 'goCatalog': state.active.catalog = true; state.active.content = false; state.active.account = false; state.active.settings = false; break
    }

}

</script>


<template>
    <section class="component menu" @click="done('all')">
        <section v-if="state.active.content" class="banner">
            <h1>Confit</h1>
            <h2 @click.stop="emit('done', 'goPlay')">Jouer</h2>
            <h2 @click.stop="emit('done', 'goHost')">Héberger une partie</h2>
            <h2 @click.stop="emit('done', 'goTutorial')">Didacticiel</h2>
            <h2 @click.stop="emit('done', 'goRules')">Règle du jeu</h2>
            <h2 @click.stop="done('goCatalog')">Catalogue</h2>
            <h2 @click.stop="done('goSettings')">Options</h2>
            <h2 @click.stop="done('goAccount')">Mon compte ({{ username }})</h2>
        </section>
        <KeepAlive>
            <Transition name="appearAbsoluteRight">
                <Settings @click.stop='' class='absoluteRight' v-if="state.active.settings" />
                <MyAccount @click.stop='' class='absoluteRight' v-else-if="state.active.account" />
            </Transition>
        </KeepAlive>
        <Catalog @done="done" class='absolute' v-if="state.active.catalog" />
    </section>
</template>


<style scoped lang="scss">
@use '../../assets/base.scss' as *;

h1 {
    font-size: 8vw;
    margin: 0px;
}

.menu {
    background-image: url(../../img/menu.jpg);
    color: white;
    margin-top: 0px;
    margin-left: 0px;
    padding-top: 5vh;
    padding-left: 5vw;
    height: 95vh;
    width: 95vw;
}

.banner {
    width: 17vw;
}

h2 {
    font-size: 3vh;
    padding-left: 1vw;
    padding-top: 0.25vw;
    padding-bottom: 0.25vw;
    border-radius: 2px;
}

h2:hover {
    background-color: rgba(213, 177, 192, 0.111);
}

.absoluteRight {
    position: absolute;
    z-index: 1;
    top: 0vh;
    left: 45vw;
    width: 40vw;
    height: 99.5vh;
}

@keyframes appearAbsoluteRightEnter {
    0% {
        opacity: 0;
        left: 52vw;
    }

    100% {
        opacity: 1;
        left: 45vw;
    }
}

@keyframes appearAbsoluteRightLeave {
    0% {
        opacity: 1;
    }

    100% {
        opacity: 0;
    }
}

.appearAbsoluteRight-enter-active {
    animation: appearAbsoluteRightEnter 1.5s;
}

.appearAbsoluteRight-leave-active {
    animation: appearAbsoluteRightLeave 0.4s;
}
</style>
