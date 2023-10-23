<script setup lang='ts'>
import { type Ref, inject, ref } from 'vue';
import axios, { type AxiosResponse } from 'axios';
import Poster from './ThePoster.vue'

const username = inject<Ref<string>>('username')

const props = defineProps({
    available: {
        type: Boolean,
        default: true
    }
})

const emit = defineEmits<{
    (e: 'busy'): void
    (e: 'free'): void
}>()

const buttonName = ref('Envoyer')
const tip = ref()
const text = ref('')
const textSimulation = ref('')
const input = ref<HTMLInputElement | null>(null)

const buttonPressed = () => {
    if (buttonName.value == 'Envoyer') {
        buttonName.value = 'Modifier'
        axios.post('/prealpha', { text: text.value, username: username!.value }).then((res) => {
            tip.value = res.data
        }).catch((e) => console.log(e))
    } else {
        axios.put('/prealpha', { text: text.value, username: username!.value }).then((res) => {
            tip.value = res.data
        }).catch((e) => console.log(e))
    }
}

function isOverflown() {
    if (input.value!.scrollHeight == input.value!.clientHeight) {
        text.value = textSimulation.value
        console.log('no overflow')
    } else {
        textSimulation.value = textSimulation.value.substring(0, textSimulation.value.length - 1);
    }
}

const refresh = async () => {
    axios.get('/prealpha').then((document: AxiosResponse<string>) => {
        text.value = document.data
        textSimulation.value = document.data
        if (text.value != '') {
            buttonName.value = 'Modifier'
        }
    })
}

refresh()

// onMounted(() => {
//     input.value?.focus()
// })
</script>

<template>
    <Poster :name="'Inscription'" :label="'Inscription'" :label-position="5" :button1-name="buttonName" :tip="tip"
        :available="props.available" :shadow-type="2" @done="buttonPressed()" @busy="emit('busy')"
        @free="emit('free'); tip = undefined">

        <div class=" InscriptionContent">
            <textarea disabled="true" @keyup="isOverflown()" @keydown="isOverflown()" name='text'
                placeholder="Un petit message..." class="textTrue" v-model="text" />
            <textarea ref="input" spellcheck="false" @keyup="isOverflown()" @keydown="isOverflown()" name='text'
                class="textSimulation" v-model="textSimulation" />
        </div>
    </Poster>
</template>

<style scoped lang='scss'>
@use '../../../assets/base.scss' as *;

.InscriptionContent {
    background-image: url(../../../img/posterRegister.jpg);
    background-size: cover;
    width: 60vw;
    height: 85vw;
    border-radius: 0.3vw;
}

%text {
    box-sizing: border-box;
    position: absolute;
    top: 35vw;
    left: 9vw;
    width: 42vw;
    height: 22vw;
    font-size: 3vw;
    line-height: 2.5vw;
    padding: 1vw;
    overflow: hidden;
    font-family: 'Caveat', cursive;
    border: none;
    resize: none;
    outline: none;
    background-color: rgba(0, 0, 0, 0);
}

.textTrue {
    @extend %text;
    z-index: 3000;
    color: rgb(73, 71, 84);
}

.textSimulation {
    @extend %text;
    z-index: 3001;
    color: rgba(0, 0, 0, 0);
    caret-color: rgb(67, 67, 67);
}
</style>
