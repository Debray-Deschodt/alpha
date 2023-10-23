<script setup lang="ts">
import { ref, type Ref } from 'vue';
import type { AnimalInterface, AdjectiveInterface, NicknameInterface } from '../../../interface/nickname.interface'
import axios, { type AxiosResponse } from 'axios'

const emit = defineEmits<{
    (e: 'nickname', nickname: string): void
}>()
const newAnimal = ref({ name: '', sex: false })
const newAdjective = ref({ adjM: '', adjF: '' })

const animals = (ref([]) as Ref<AnimalInterface[]>)
const adjectives = (ref([]) as Ref<AdjectiveInterface[]>)

const newUsername = ref('')

function refresh() {
    axios.get('/nickname').then((document: AxiosResponse<NicknameInterface>) => {
        animals.value = document.data.animals.reverse()
        adjectives.value = document.data.adjectives.reverse()
    }).catch((e) => console.log(e))
}

function postAnimals() {
    axios.post('/nickname/animal', { name: newAnimal.value.name, sex: newAnimal.value.sex })
    animals.value.unshift({
        name: newAnimal.value.name.substring(0, 1).toUpperCase() + newAnimal.value.name.substring(1, newAnimal.value.name.length).toLowerCase(),
        sex: newAnimal.value.sex
    })
    newAnimal.value = { name: '', sex: false }
}

function deleteAnimal(nameDeleted: string) {
    axios.put('/nickname/animal', { name: nameDeleted }).then(() => {
        animals.value = animals.value.filter((animal) => animal.name != nameDeleted)
    })

}

function postAdjective() {
    axios.post('/nickname/adjective', { adjM: newAdjective.value.adjM, adjF: newAdjective.value.adjF })
    adjectives.value.unshift({
        adjM: newAdjective.value.adjM.substring(0, 1).toUpperCase() + newAdjective.value.adjM.substring(1, newAdjective.value.adjM.length).toLowerCase(),
        adjF: newAdjective.value.adjF.substring(0, 1).toUpperCase() + newAdjective.value.adjF.substring(1, newAdjective.value.adjF.length).toLowerCase()
    })
    newAdjective.value = { adjM: '', adjF: '' }
}

function deleteAdjective(adjMDeleted: string) {
    axios.put('/nickname/adjective', { adjM: adjMDeleted }).then(() => {
        adjectives.value = adjectives.value.filter((adj) => adj.adjM != adjMDeleted)
    })
}

function usernameCreate() {
    let i = Math.floor(Math.random() * animals.value.length)
    newUsername.value = animals.value[i].name
    let j = Math.floor(Math.random() * adjectives.value.length)
    if (animals.value[i].sex == false) {
        newUsername.value = newUsername.value + ' ' + adjectives.value[j].adjM
    } else {
        newUsername.value = newUsername.value + ' ' + adjectives.value[j].adjF
    }
    emit('nickname', newUsername.value)
}

refresh()
</script>

<template>
    <section>
        <div style=" display: flex ; justify-content: center;">
            <button @click="usernameCreate()">Generer un surnom</button>
        </div>
        <div class="animals">
            <h2>Animaux ({{ animals.length }})</h2>
            <div class="banner">
                <input v-model="newAnimal.name" />
                <h3>Feminin :</h3>
                <input type="checkbox" v-model="newAnimal.sex" style="height: 2vw; width: 2vw; margin-left: -3vw;" />
                <button @click="postAnimals()"> valider </button>
            </div>
            <section v-for="animal in animals" :key="animal.name" style="margin-left: 2vw;">
                <TransitionGroup>
                    <p class="content" @click.stop="deleteAnimal(animal.name)">{{ animal.name }}</p>
                </TransitionGroup>
            </section>
        </div>

        <div class="adjectives">
            <h2>Adjectifs ({{ adjectives.length }})</h2>
            <div class="banner">
                <h3>Masculin :<input v-model="newAdjective.adjM" /></h3>

                <h3>Feminin :<input v-model="newAdjective.adjF" /></h3>
                <button @click="postAdjective()"> valider </button>
            </div>

            <section v-for="adjective in adjectives" :key="adjective.adjM" style="margin-left: 2vw;">
                <TransitionGroup>
                    <p class="content" @click.stop="deleteAdjective(adjective.adjM)">{{ adjective.adjM }} / {{
                        adjective.adjF }}</p>
                </TransitionGroup>
            </section>
        </div>
    </section>
</template>

<style scoped lang="scss">
@use '../../../assets/base.scss' as *;

h2 {
    color: rgb(122, 120, 120);
}

h3 {
    color: rgb(105, 105, 105);
}

section {
    display: flex;
}

input {
    align-self: center;
    font-family: 'Roboto', sans-serif;
    font-size: 1.5vw;
    margin: 0;
    margin-left: 1vw;
    padding: 0.5vw;
    width: 10vw;
    height: 2vw;
}

p {
    font-family: 'Roboto', sans-serif;
    font-size: 1vw;
    border-radius: 1vw;
    padding: 1vw;
    width: 50%;
    color: white;
    background: rgb(48, 121, 231);
    transition: all 0.2s;
    overflow: hidden;

    &:hover {
        margin-left: 2vw;
    }
}

.adjectives,
.animals {
    width: 50%;
    background: rgb(238, 237, 237);
    border-radius: 1vw;
    margin: 2vw;
    padding: 1vw;
    padding-bottom: 100vh;

    & section {
        display: flex;
        justify-content: space-between;
        padding: 0.5vh 2vw 0 4vw;
    }

    & button {
        border: none;
        color: rgb(121, 120, 120);

        &:hover {
            color: white;
            letter-spacing: 0.2vw;
        }
    }
}

.adjectives {
    width: 50%;
}

.banner {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    margin-bottom: 5vh;
}
</style>