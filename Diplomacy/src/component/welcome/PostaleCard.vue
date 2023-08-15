Il s'agit de la carte postale afficher dans le WelcomeApp.vue

<script setup lang="ts">
import theBack from './TheBack.vue'
import TheInput from '../usable/TheInput.vue'
import { provide, reactive, ref } from 'vue'


interface Account {
    username: {
        value: string,
        validation: boolean,
    },
    password: {
        value: string,
        validation: boolean,
    },
    turnIt: boolean,
}

const state: Account = reactive({
    username: {
        value: "",
        validation: false
    },
    password: {
        value: '',
        validation: false
    },
    turnIt: false
})

const emit = defineEmits<{
    (e: 'done', from: string): void
    (e: 'usernameValue', value: string): void
    (e: 'passwordValue', value: string): void
}>()

function inputValueEmit(from: String, theInputValue: string) {
    if (from === 'username') {
        state.username.value = theInputValue
        emit('usernameValue', state.username.value)
    } else if (from === 'password') {
        state.password.value = theInputValue
        emit('passwordValue', state.password.value)
    } else {
        console.log('Invalide argument from TheInput in PostaleCard')
    }

}


function inputEnterEmit(from: String, theInputValueLenght: number) {
    if (from === 'username') {
        if (theInputValueLenght > 0) {
            state.username.validation = true;
        }
    } else if (from === 'password') {
        if (theInputValueLenght > 7) {
            state.password.validation = true;
            setTimeout(() => { emit('done', 'welcome') }, 500)
        }
    } else {
        console.log('Invalide argument from TheInput in PostaleCard')
    }
}

function inputModifierEmit(section: String) {
    if (section === 'username') {
        state.username.validation = false
        state.password.validation = false
    } else if (section === 'password') {
        state.username.validation = true
        state.password.validation = false
    } else {
        console.log('emit string incorect from TheBack')
    }
}

const passwordType = ref('password')
function inputTextEmit() {
    if (passwordType.value === 'password') {
        passwordType.value = 'text'
    } else {
        passwordType.value = 'password'
    }
}

</script>

<template>
    <Transition name='appear' mode="out-in">
        <KeepAlive>
            <TheInput v-if='state.turnIt && !state.username.validation' @value='inputValueEmit' name='username'
                description="Nom d'utilisateur" :sizeMax="12" type='text' @enter="inputEnterEmit" />
            <TheInput v-else-if='state.turnIt && !state.password.validation && state.username.validation'
                @value='inputValueEmit' name='password' description='Mot de passe' :sizeMax="22" :type="passwordType"
                @enter="inputEnterEmit" @text="inputTextEmit" />
        </KeepAlive>
    </Transition>

    <Transition name="turnedIt" mode="out-in">
        <section v-if='!state.turnIt' @click='state.turnIt = !state.turnIt' class='postaleCard theFront'>
        </section>
        <section v-else class='postaleCard'>
            <theBack :username=state.username.value :password="state.password.value" @modifier="inputModifierEmit"
                @done="emit('done', 'news')" />
        </section>
    </Transition>

    <Transition name="darkTurn" mode="out-in">
        <section v-if='!state.turnIt' class="box2" @click='state.turnIt = !state.turnIt'></section>
    </Transition>

    <Transition name='timbreAppear' mode="in-out">
        <section v-if='state.password.validation' class="timbre"></section>
    </Transition>
    <Transition name="firstFinger">
        <section v-if='state.password.validation' class='fingerPrint fingerprint1'></section>
    </Transition>
    <Transition name="secondFinger">
        <section v-if='state.password.validation' class='fingerPrint fingerprint2'></section>
    </Transition>
</template>

<style scoped lang="scss">
@use '../../assets/base.scss' as *;

.h1 {
    color: #f8f8f8;
    background-color: aquamarine;
    padding: 5vw;
}

.postaleCard {
    position: absolute;
    top: 0;
    left: 0;
    padding: 0px;
    height: 70vh;
    width: 70vw;
    background-color: #000000;
    margin-top: 15vh;
    margin-left: 15vw;
    padding: 0px;
    border: 0px rgb(164, 139, 172) solid;
    border-radius: 10px;
    box-shadow:
        0px 62.5px 25.6px -6px rgba(255, 255, 255, 0.16),
        0px 499px 93px -6px rgba(255, 255, 255, 0.16);
    rotate: 2deg;

}

.theFront {
    background-image: url(../../img/postaleCard.jpg);
    background-size: 70vw 75vh;
    background-position-x: 50%;
    background-repeat: no-repeat;
    rotate: -3deg;
    text-align: center;
    padding: 0px;
    box-shadow:
        0px 40.5px 25.6px -6px rgba(255, 238, 197, 0.06),
        0px 499px 93px -6px rgba(255, 238, 197, 0.081);
}

.box2,
.box {
    position: absolute;
    top: 0;
    left: 0;
    height: 73vh;
    width: 72vw;
    margin-top: 13vh;
    margin-left: 15vw;
    padding: 0px;
    z-index: 1;
    opacity: 0;
    background: linear-gradient(to left, rgba(255, 0, 0, 0), var(--shadowCard));
    rotate: 2deg;
}

.box2 {
    rotate: -3deg;
}

.timbre {
    position: absolute;
    top: 24vh;
    left: 73vw;
    background-image: url(../../img/timbre.jpg);
    background-size: 8vw 20vh;
    background-position-x: 50%;
    background-repeat: no-repeat;
    padding: 0vh;
    height: 20vh;
    width: 8vw;
    rotate: 1.5
}

.fingerPrint {
    position: absolute;
    z-index: 3;
    background-image: url('../../img/fingerprint.png');
    background-size: cover;
    width: 6vw;
    height: 14vh;
}

.fingerprint1 {
    top: 50vh;
    left: 20vw;
    rotate: 45deg;
    opacity: 0.8
}

.fingerprint2 {
    top: 65vh;
    left: 30vw;
    rotate: 60deg;
    opacity: 0.4
}

.turnedIt-leave-to {
    width: 0vw;
    margin-left: 50vw;
    rotate: 0deg;
    background-size: 0vw 65vh;
    height: 60vh;
    box-shadow:
        0px 40.5px 25.6px -6px rgba(255, 238, 197, 0),
        0px 499px 93px -6px rgba(255, 238, 197, 0);
}

.turnedIt-enter-from {
    width: 0vw;
    margin-left: 50vw;
    rotate: 0deg;
    background-size: 0vw 65vh;
    height: 60vh;
}

.turnedIt-leave-from {
    width: 70vw;
    margin-left: 15vw;
    background-size: 70vw 75vh;
    box-shadow:
        0px 40.5px 25.6px -6px rgba(255, 238, 197, 0.06),
        0px 499px 93px -6px rgba(255, 238, 197, 0.081);
}

.turnedIt-enter-to {
    width: 70vw;
    margin-left: 15vw;
    background-size: 70vw 75vh;
}

.turnedIt-leave-active,
.turnedIt-enter-active {
    transition: all 0.75s;
}

.darkTurn-enter-from {
    opacity: 1;
    width: 0vw;
    margin-left: 50vw;
    rotate: 0deg;
    transform: scaleX(-1);
    height: 62vh;
}

.darkTurn-enter-to {
    opacity: 0;
    width: 72vw;
    transform: scaleX(-1);
}

.darkTurn-enter-active {
    transition: all 0.75s;
}

.darkTurn-leave-from {
    opacity: 0;
    width: 72vw;
}

.darkTurn-leave-to {
    opacity: 1;
    width: 0vw;
    margin-left: 50vw;
    rotate: 0deg;
    height: 62vh;
}

.darkTurn-leave-active {
    transition: all 0.75s;
}

.appear-enter-from {
    opacity: 0;
}

.appear-enter-to {
    opacity: 1;
}

.appear-enter-active {
    transition: all 1.5;
}

.timbreAppear-enter-from {
    opacity: 0;
    height: 60vh;
    width: 24vw;
    background-size: 24vw 60vh;
    left: 70vw;
}

.timbreAppear-enter-to {
    opacity: 1;
    height: 20vh;
    width: 8vw;
    background-size: 8vw 20vh;
    left: 73vw
}

.timbreAppear-enter-active {
    transition: all 0.5s;
}

@keyframes firstFinger {
    0% {
        opacity: 0
    }

    50% {
        opacity: 0
    }

    100% {
        opacity: 0.8
    }
}

@keyframes secondFinger {
    0% {
        opacity: 0;
    }

    90% {
        opacity: 0;
    }

    100% {
        opacity: 0.4
    }
}

.firstFinger-enter-active {
    animation: firstFinger 0.5s
}

.secondFinger-enter-active {
    animation: secondFinger 1.5s
}
</style>