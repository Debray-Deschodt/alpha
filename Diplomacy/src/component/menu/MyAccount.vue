<script setup lang='ts'>
import { inject } from 'vue';

const username = inject<any>('username')
const password = inject<any>('password')
</script>

<template>
    <section class="bannerSettings">
        <h1>Mon compte</h1>
        <h2>Informations générales <button>Enregistrer</button></h2>
        <div class="pan">
            <h3>Nom d'utilisateur</h3><input :value="username" type='text'>
            <h3>Adresse email</h3><input placeholder="Necessaire à la validation du compte" type='email'>
            <h3>Mot de passe</h3><input :value="password" type='password'>
        </div>
        <h2>Liste d'amis</h2>
        <h2>Statistiques</h2>
    </section>
</template>

<style scoped lang='scss'>
@use '../../assets/base.scss' as *;

button {
    background-color: rgba(161, 189, 245, 0.767);
    border: none;
    border-radius: 10px;
    margin-left: 5px;
    color: rgba(248, 248, 248, 0.851);
    font-family: 'Roboto', sans-serif;
    font-size: 1vw;
    margin-left: 1vw
}

h1 {
    font-size: 4vw;
    color: rgba(248, 248, 248, 0.851);
    padding: 0px;
    padding-left: 0px;
    margin-top: 11vh;
    margin-left: 7vw;
}

h2 {
    font-size: 3vh;
    color: rgba(248, 248, 248, 0.851);
    padding: 0px;
    padding-bottom: 1vh;

    border-bottom: 2px rgba(248, 248, 248, 0.681) solid;

    width: 80%;

    margin-bottom: 3vh;
    margin-top: 6vh;
    margin-left: 5vw;
}

h3 {
    font-size: 2vh;
    color: rgba(248, 248, 248, 0.681);
    padding: 0px;
    margin: 0;
    margin-bottom: 1vh;
}


.bannerSettings {
    margin: 0;

    height: 99.5vh;
    padding-top: 0.5vh;
    padding-bottom: 0vh;

    background-color: rgba(173, 197, 244, 0.737);

    border-radius: 10px 10px 0px 0px;
    overflow: auto;
}

.bannerSettings:hover {
    // background-color: rgba(141, 162, 240, 0.919);
    background-color: white;
}

.bannerSettings:hover button {
    background-color: white;
    color: rgba(187, 178, 153, 0.748);
}

.bannerSettings:hover button:hover {
    background-color: rgba(253, 244, 232, 0.701);
}

.bannerSettings:hover button:active {
    background-color: rgba(230, 221, 210, 0.701);
}

.bannerSettings:hover h1 {
    color: rgba(187, 178, 153, 0.748);
}

.bannerSettings:hover h3 {
    color: rgba(187, 178, 153, 0.541);
}

.bannerSettings:hover h2 {
    color: rgba(187, 178, 153, 0.748);
    border-bottom: 2px rgba(187, 178, 153, 0.748) solid;
}

::-webkit-scrollbar {
    width: 10px;
}

::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0);
}

::-webkit-scrollbar-thumb {
    border-radius: 6px;
    background: rgba(221, 217, 217, 0.714);
}

input {
    align-self: end;
    border: none;
    background-color: rgba(192, 183, 156, 0);
    outline: none;
    width: 18vw;
    font-size: 1vw;
    border-radius: 10px;
    height: 2.5vh;
    font-family: 'Roboto', sans-serif;
    color: rgba(248, 248, 248, 0.851);
    padding-left: 0.5vw;
}

input:hover {
    height: 3vh;
}

input:active {
    border-radius: 50px;
}

input::placeholder {
    color: rgba(233, 233, 233, 0.564);
    font-size: 0.8vw;
    font-family: 'Roboto', sans-serif;
}

.bannerSettings:hover input {
    background-color: rgba(192, 183, 156, 0.412);
    color: white;
}

.bannerSettings:hover input::placeholder {
    color: white;
}

.pan {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 20px;
    padding-left: 5vw;
}
</style>

