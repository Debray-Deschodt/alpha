<script setup lang="ts">
import { inject, reactive, ref, watch, type Ref, onMounted } from 'vue';
import axios from 'axios'

import Nicknames from './nicknames/TheNicknames.vue'

const emit = defineEmits<{
    (e: 'done', from: string): void
    (e: 'username', username: string): void
    (e: 'admin', admin: boolean): void
    (e: 'deconnection'): void
}>()

const newEmail = ref('')
const newMDP = ref('')

const email = ref('')
const mDP = ref('')

const nickname = ref('')

const connectionError = ref('')
const registerError = ref('')

const stateActive = reactive({
    connected: false,
    connection: true,
    register: false,
    nicknames: false
})

function manager(from: string) {
    switch (from) {
        case 'nicknames':
            stateActive.nicknames = true
            document.querySelector('#nicknamesButton')?.setAttribute('style', 'background: #212121; color: white')
            break
    }
}

function register(name: string, password: string) {
    if (name == '') {
        registerError.value = 'T\'as pas de nom'
    } else if (password == '') {
        registerError.value = 'Faut mettre un mot de passe'
    } else if (password.length < 8) {
        registerError.value = 'Un mot de passe de plus de 8 caractère c\'est mieux'
    } else {
        axios.post('/users', {
            email: name,
            password: password
        })
            .then((res) => {
                if (res.data.error) {
                    registerError.value = res.data.error
                } else {
                    connect(name, password)
                }
            })
            .catch((e) => console.log(e))
    }
}

function connect(name: string, password: string) {
    axios.post('/auth', {
        email: name,
        password: password
    }).then((res) => {
        if (res.data.error) {
            connectionError.value = res.data.error
        } else {
            emit('username', name)
            emit('admin', res.data.admin)
        }
    }).catch((e) => console.log(e))
}

function deconnection() {
    axios.delete('/auth').then((res) => console.log(res)).catch((e) => console.log(e))
    emit('deconnection')
    emit('username', '')
}

function setNickname(newUsername: string) {
    nickname.value = newUsername
}

const username = inject<Ref<string>>('username')
nickname.value = username!.value

onMounted(() => {
    if (username?.value == '' || username == undefined) {
        stateActive.connected = false
    } else {
        stateActive.connected = true
    }
})

watch(() => username?.value, () => {
    if (username?.value == '' || username == undefined) {
        stateActive.connected = false
    } else {
        stateActive.connected = true
    }
})

</script>

<template>
    <section class="conponent-full">

        <section class="banner border-bottom"
            style="justify-content: space-between; border-bottom: 0.1vw solid rgb(190, 186, 186);">
            <h1>Uchronie
                <h2 v-show="stateActive.connected">Bienvenue {{ nickname }}</h2>
            </h1>
            <button @click="manager('nicknames')" id="nicknamesButton">Dico des surnoms</button>
            <button v-if="stateActive.connected" @click="emit('done', 'connect')">Jouer</button>
            <button @click="deconnection()">Déconnection</button>
        </section>

        <Nicknames v-if="stateActive.nicknames" @nickname="setNickname" />

        <section class="banner">
            <button v-show="!stateActive.connected" @click="stateActive.connection = true; stateActive.register = false">se
                connecter</button>
            <button v-show="!stateActive.connected"
                @click="stateActive.connection = false; stateActive.register = true">s'inscrire</button>
        </section>

        <section v-show="!stateActive.connected" class="flex">
            <div v-show="stateActive.register">
                <h2>S'inscrire</h2>
                <p>{{ registerError }}</p>
                <h3>Nom d'utilsateur</h3> <input v-model="newEmail" />
                <h3>Mot de passe</h3> <input type="password" v-model="newMDP" />
                <button @click="register(newEmail, newMDP)">Inscription</button>
            </div>
            <div v-show="stateActive.connection">
                <h2>Se connecter</h2>
                <p>{{ connectionError }}</p>
                <h3>Nom d'utilsateur</h3> <input v-model="email" />
                <h3>Mot de passe</h3> <input type="password" v-model="mDP" />
                <button @click="connect(email, mDP)">Connection</button>
            </div>
        </section>
    </section>
</template>

<style scoped lang="scss">
@use '../../assets/base.scss' as *;

h1 {
    color: rgb(77, 76, 76);
    font-weight: 400;
    margin: 0;

    & h2 {
        font-size: 1vw;
        margin: 0;
    }
}

button {
    height: 3vw;

    &:hover {
        letter-spacing: 0.2vw;
    }
}

.component-full {
    position: absolute;
    top: 0;
    left: 0;
}

.banner {
    position: sticky;
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin: 0 0 5vh 1vw;

    & button {
        border: none
    }
}

.flex {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 90vw;
    gap: 10vh;
}

div {
    padding: 0.5vw 2vw 1vw 2vw;
    width: 10vw
}

p {
    width: 40vw;
}
</style>