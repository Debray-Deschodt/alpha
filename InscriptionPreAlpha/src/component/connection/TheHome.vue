<script setup lang="ts">
import { onMounted, ref, type Ref } from 'vue';
import datas from '../../data/home.js'
import axios, { type AxiosResponse } from 'axios';
import type { AnimalInterface, AdjectiveInterface, NicknameInterface } from '../../interface/nickname.interface'
import Letter from '../usable/deprecate/letter/TheLetter.vue'

const props = defineProps({
    connected: Boolean
})

const emit = defineEmits<{
    (e: 'manager', to: string): void
    (e: 'done', from: string): void
}>()

const animals = (ref([]) as Ref<AnimalInterface[]>)
const adjectives = (ref([]) as Ref<AdjectiveInterface[]>)
const newUsername = ref('')
let interval = setInterval(() => { })
const letterState = ref(true)

function usernameCreate() {
    let i = Math.floor(Math.random() * animals.value.length)
    newUsername.value = animals.value[i].name
    let j = Math.floor(Math.random() * adjectives.value.length)
    if (animals.value[i].sex == false) {
        return newUsername.value + ' ' + adjectives.value[j].adjM
    } else {
        return newUsername.value + ' ' + adjectives.value[j].adjF
    }
}

function buttonUsername() {
    clearInterval(interval)
    newUsername.value = usernameCreate()
}

onMounted(() => {
    document.querySelector('#hometext3')!.innerHTML = datas[2].text
    document.querySelector('#hometext4')!.innerHTML = datas[3].text
    axios.get('/nickname').then((document: AxiosResponse<NicknameInterface>) => {
        animals.value = document.data.animals.reverse()
        adjectives.value = document.data.adjectives.reverse()
        newUsername.value = usernameCreate()
        clearInterval(interval)
        interval = setInterval(() => {
            newUsername.value = usernameCreate()
        }, 3000)
    }).catch((e) => console.log(e))
})
</script>

<template >
    <section class="home" draggable="true" @dragstart.prevent>
        <div v-for="data in datas" :key="data.index" class="picture">
            <h2 :id="'hometext' + data.index">{{ data.text }}</h2>
            <div />
        </div>
        <h2 style="color:darkcyan">{{ newUsername }}
            <button @click="buttonUsername" style="margin-top: 1vw">clic</button>
        </h2>

        <Letter @click="letterState = !letterState" :open="letterState"
            style="position:absolute; top: 430vh; left: 60vw; transform: scale(0.25);" />

        <section style="position:absolute; top: 540vh; left: 20vw; height: 40vh;">
            <button v-show="props.connected" @click="emit('done', 'connect')">Jouer</button>
            <div style="display:flex; gap:1vw;">
                <button v-show="!props.connected" id="connectionButton" @click="emit('manager', 'connection')">
                    Connexion</button>
                <button v-show="!props.connected" id="registerButton"
                    @click="emit('manager', 'register')">Inscription</button>
            </div>
        </section>
        <section
            style="position:absolute; top: 574vh; left: 5vw; height: 15vh; width: 15vh; border: 0.1vw solid black; border-radius: 15vh; overflow:hidden">
            <section class="berangere" />
        </section>
    </section>
</template>

<style scoped lang="scss">
@use '../../assets/base.scss' as *;

.home {
    position: absolute;
    top: 0;
    left: 0;
    height: 600vh;
    width: 100vw;
    overflow: hidden;
    background: radial-gradient(ellipse at bottom, rgb(247, 244, 248), rgb(255, 254, 253)) !important;

    & :nth-child(1) div {
        background-image: url(../../img/home1.png);
        // need
    }

    & :nth-child(2) {
        flex-direction: row-reverse;

        & div {
            background-image: url(../../img/home2.png);
        }

        & h2 {
            padding-left: 0;
            padding-right: 10vw;
        }
    }

    & :nth-child(3) div {
        background-image: url(../../img/home3.png);
        animation: none;
        transform: rotate(4deg);
    }

    & :nth-child(4) {
        flex-direction: row-reverse;

        & h2 {
            padding-left: 0;
            padding-right: 10vw;
        }
    }

    & :nth-child(6) {
        flex-direction: row-reverse;

        & h2 {
            padding-left: 0;
            padding-right: 10vw;
        }
    }

    &>h2 {
        position: absolute;
        top: 340vh;
        left: 0vw;
        font-family: 'Caveat', cursive;
    }
}


h2 {
    font-family: 'Roboto', sans-serif;
    font-size: 3vw;
    width: 40vw;
    font-weight: 400;
    box-sizing: border-box;
    padding-left: 10vw;
    color: rgb(48, 47, 47);
}

.picture {
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;

    & h2 {
        width: 50%;
    }

    & div {
        margin: auto;
        width: 50%;
        background-size: cover;
        width: 60vh;
        height: 60vh;
        transform-origin: 46.5% 0%;
        animation: 4s ease-in-out infinite alternate rotate;
    }
}

.berangere {
    position: absolute;
    top: -14vh;
    left: 3.5vw;
    width: 5vw;
    height: 8vw;
    background-size: cover;
    background-image: url(../../img/BérangèreCanard/jaune400vw50is.gif);
    animation: 6s infinite ease-out fall;
}

@keyframes rotate {
    0% {
        transform: rotate(1deg)
    }

    100% {
        transform: rotate(-1deg)
    }
}

@keyframes fall {
    100% {
        transform: translateY(30vh)
    }
}
</style>