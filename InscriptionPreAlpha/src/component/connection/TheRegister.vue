<script setup lang="ts">
import { inject, reactive, ref, watch, type Ref, onMounted } from 'vue';
import axios from 'axios'

const emit = defineEmits<{
    (e: 'done', from: string): void
    (e: 'username', username: string): void
}>()

const newEmail = ref('')
const newMDP = ref('')

const email = ref('')
const mDP = ref('')

const connectionError = ref('')
const registerError = ref('')

const stateActive = reactive({
    connected: false,
    connection: true,
    register: false
})

// function setCookies() {
//     axios.get('/cookies').then(() => {
//         console.log(document.cookie)
//     })
// }

function auth() {
    axios.get('/auth').then((res) => {
        emit('username', res.data)
    })
}

function register(name: string, password: string) {
    if (name == '') {
        registerError.value = 'T\'as pas de nom'
    } else if (password == '') {
        registerError.value = 'Faut mettre un mot de passe'
    } else if (password.length < 8) {
        registerError.value = 'un mot de passe de plus de 8 caractère c\'est mieux'
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
        }
    }).catch((e) => console.log(e))
}

function deconnection() {
    axios.delete('/auth').then((res) => console.log(res)).catch((e) => console.log(e))
    emit('username', '')
}

auth()
const username = inject<Ref<string>>('username')

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

        <section class="banner" style="justify-content: space-around">
            <h1>Uchronie</h1>
            <h2 v-show="stateActive.connected"> compte : {{ username }}
                <button @click="deconnection()">Déconnection</button>
            </h2>
        </section>

        <section class="banner">
            <button v-if="stateActive.connected" @click="emit('done', 'connect')">Jouer</button>
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

.component-full {
    position: absolute;
    top: 0;
    left: 0;
}

.banner {
    display: flex;
    justify-content: space-evenly;
    margin-bottom: 5vh;
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