<script setup lang="ts">
import { inject, reactive, ref, watch, type Ref, onMounted } from 'vue';
import axios from 'axios'

import Home from './TheHome.vue'

const emit = defineEmits<{
    (e: 'done', from: string): void
    (e: 'username', username: string): void
    (e: 'admin', admin: boolean): void
}>()

//username key in the database is email so the user email will be mail for now. 
const newEmail = ref('')
const newMDP = ref('')
const email = ref('')
const mDP = ref('')
const report = ref({
    title: '',
    text: ''
})
const connectionError = ref('')
const registerError = ref('')
const reportError = ref('')
const nickname = ref('')
const mail = ref('')
const newMail = ref('')
const newUsername = ref('')

const stateActive = reactive({
    connected: false,
    connection: false,
    register: false,
    nicknames: false,
    about: false,
    home: true,
    account: false,
    report: false
})

function manager(from: string) {
    setActiveFalse()
    switch (from) {
        case 'nicknames':
            stateActive.nicknames = true
            document.querySelector('#nicknamesButton')?.setAttribute('style', 'background: #212121; color: white')
            break
        case 'connection':
            stateActive.connection = true
            document.querySelector('#connectionButton')?.setAttribute('style', 'background: #212121; color: white')
            break
        case 'register':
            stateActive.register = true
            document.querySelector('#registerButton')?.setAttribute('style', 'background: #212121; color: white')
            break
        case 'account':
            stateActive.account = true
            document.querySelector('#accountButton')?.setAttribute('style', 'background: #212121; color: white')
            break
        case 'report':
            stateActive.report = true
            document.querySelector('#reportButton')?.setAttribute('style', 'background: #212121; color: white')
            break
        case 'about':
            stateActive.about = true
            document.querySelector('#aboutButton')?.setAttribute('style', 'background: #212121; color: white')
            break
        case 'home':
            stateActive.home = true

    }
}
function setActiveFalse() {
    stateActive.home = false;
    stateActive.about = false;
    document.querySelector('#aboutButton')?.setAttribute('style', '')
    stateActive.connection = false
    document.querySelector('#connectionButton')?.setAttribute('style', '')
    stateActive.nicknames = false;
    document.querySelector('#nicknamesButton')?.setAttribute('style', '')
    stateActive.register = false
    document.querySelector('#registerButton')?.setAttribute('style', '')
    stateActive.account = false;
    document.querySelector('#accountButton')?.setAttribute('style', '')
    stateActive.report = false;
    document.querySelector('#reportButton')?.setAttribute('style', '')
}

function auth() {
    axios.get('/auth').then((res) => {
        emit('username', res.data.username)
        emit('admin', res.data.admin)
        mail.value = res.data.mail
    }).catch((e) => console.log(e))
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
            email: name.substring(0, 1).toUpperCase() + name.substring(1, name.length).toLowerCase(),
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
    name = name.substring(0, 1).toUpperCase() + name.substring(1, name.length).toLowerCase()
    console.log(name)
    axios.post('/auth', {
        email: name,
        password: password
    }).then((res) => {
        if (res.data.error) {
            connectionError.value = res.data.error
        } else {
            emit('username', name)
            emit('admin', res.data.admin)
            setActiveFalse()
            stateActive.home = true
        }
    }).catch((e) => console.log(e))
}

function deconnection() {
    axios.delete('/auth').then((res) => console.log(res)).catch((e) => console.log(e))
    emit('username', '')
    setActiveFalse()
    stateActive.home = true
}

function setNickname(newUsername: string) {
    nickname.value = newUsername
}

function reportToServer(title: string, text: string) {
    axios.post('/bug', { title: title, text: text, username: username?.value })
        .then(() => {
            reportError.value = 'Le bug a bien été pris en considération. Merci de votre contribution.'
            report.value = { title: '', text: '' }
        }).catch((e) => console.log(e))
}

function userModify(Username: string, Mail: string) {
    Username = Username.substring(0, 1).toUpperCase() + Username.substring(1, Username.length).toLowerCase()
    axios.put('/users', { username: username?.value, newUsername: Username, newMail: Mail }).then(() => {
        newMail.value = ''
        newUsername.value = ''
        if (Username != '') {
            nickname.value = Username
            emit('username', Username)
            username!.value = Username
        }
        if (Mail != '') {
            mail.value = Mail
        }
    }).catch((e) => console.log(e))
}

const username = inject<Ref<string>>('username')


auth()
nickname.value = username!.value


onMounted(() => {
    if (username?.value == '' || username == undefined) {
        stateActive.connected = false
    } else {
        console.log(username.value)
        stateActive.connected = true
    }

})

watch(() => username?.value, () => {
    if (username?.value == '' || username == undefined) {
        stateActive.connected = false
    } else {
        console.log(username.value)
        stateActive.connected = true
        nickname.value = username!.value
    }
})

</script>
<template>
    <section class="component-full" style="overflow-y: auto;">
        <!-- nav part -->
        <section class="banner border-bottom">
            <h1 @click="manager('home')">Uchronie</h1>
            <button v-if="stateActive.connected" @click="emit('done', 'connect')">Jouer</button>
            <button v-if="stateActive.connected" id="reportButton" @click="manager('report')">Signaler un bug</button>
            <div v-show="stateActive.connected" style="display: flex; width:auto;">
                <button id="accountButton" @click="manager('account')">{{ nickname }}</button>
                <button @click="deconnection()">Déconnection</button>
            </div>
            <div v-show="!stateActive.connected" style="display: flex; width:auto;">
                <button id="connectionButton" @click="manager('connection')">
                    Connexion</button>
                <button id="registerButton" @click="manager('register')">Inscription</button>
            </div>
        </section>

        <!-- auth part -->
        <div v-show="stateActive.register" class="flex">
            <input v-model="newEmail" placeholder="Nom" @keyup.enter="register(newEmail, newMDP)" />
            <input type="password" v-model="newMDP" placeholder="Mot de passe" @keyup.enter="register(newEmail, newMDP)" />
            <p>{{ registerError }}</p>
            <button class="button-next" @click="register(newEmail, newMDP)">→</button>

        </div>
        <div v-show="stateActive.connection" class="flex">
            <input v-model="email" placeholder="Nom" @keyup.enter="connect(email, mDP)" />
            <input type="password" v-model="mDP" placeholder="Mot de passe" @keyup.enter="connect(email, mDP)" />
            <p>{{ connectionError }}</p>
            <button class="button-next" @click="connect(email, mDP)">→</button>
        </div>

        <!-- report bug part -->
        <div v-show="stateActive.report" class="flex report">
            <input type="text" v-model="report.title" placeholder="Titre" />
            <textarea v-model="report.text" placeholder="Un petit text explicatif..." />
            <button class="button-next" @click="reportToServer(report.title, report.text)">→</button>
        </div>

        <!-- account part -->
        <div v-show="stateActive.account" class="flex">
            <input type="text" v-model="newUsername" :placeholder="username"
                @keyup.enter="userModify(newUsername, newMail)">
            <input type="text" v-model="newMail" :placeholder="mail" @keyup.enter="userModify(newUsername, newMail)" />
            <input disabled="true" placeholder="Nouveau mot de passe" />
            <button class="button-next" @click="userModify(newUsername, newMail)">→</button>
        </div>
        <Home v-show="stateActive.home" :connected="stateActive.connected" @done="emit('done', 'connect')"
            @manager="manager" />
        <Nicknames v-if="stateActive.nicknames" @nickname="setNickname" />
    </section>
</template>

<style scoped lang="scss">
@use '../../assets/base.scss' as *;


p {
    width: 40vw;
}

div {
    padding: 0.5vw 2vw 1vw 2vw;
    width: 10vw
}

h1 {
    color: rgb(77, 76, 76);
    font-weight: 400;
    margin: 0;
    font-size: 3vw;
    margin-left: 1vw;
    font-weight: 300;

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

input {
    box-sizing: border-box;
    background: white;
    width: 20vw;
    height: 3vw;
    padding: 0 1.5vw;
    font-size: 1.2vw;
    font-family: 'Roboto', sans-serif;
    border: 0.1vw solid black;
}

::placeholder {
    color: rgba(71, 71, 71, 0.678);
    text-align: center;
    font-size: 1.2vw;
    font-family: 'Roboto', sans-serif;
    letter-spacing: 0.2vw;
}

.component-full {
    background: radial-gradient(ellipse at bottom, rgb(247, 244, 248), rgb(255, 254, 253)) !important;
}

.banner {
    position: sticky;
    top: 0;
    z-index: 2;
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-bottom: 5vh;
    background: white;
    justify-content: space-between;
    border-bottom: 0.1vw solid rgb(190, 186, 186);
    transition: all 0.4s;
    height: 4vw;

    &:hover {
        height: 5vw;
    }

    & button {
        border: none
    }
}

.flex {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100vw;
    gap: 1.5vh;
    margin-top: 15vh;

    & button {
        margin-top: 7vh;
    }
}

.report {
    display: flex;

    & input {
        width: 35vw;
    }

    & textarea {
        box-sizing: border-box;
        width: 35vw;
        height: 20vw;
        padding: 2vw;
        font-size: 1.2vw;
        font-family: 'Roboto', sans-serif;
        border: 0.1vw solid black;

        &::placeholder {
            text-align: left;
        }
    }

}
</style>