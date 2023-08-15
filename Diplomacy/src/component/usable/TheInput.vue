<script setup lang='ts'>
import { onActivated, ref } from 'vue';

const props = defineProps({
    description: String,
    sizeMax: Number,
    type: {
        type: String,
        default: 'text'
    },
    focus: {
        type: Boolean,
        default: true
    },
    name: {
        type: String,
        required: true
    }
})

const isAPasswordType = ref(false)
if (props.type === 'password') {
    isAPasswordType.value = true;
}
/* their parents get the information like that
const username = ref()
const usernameValidation = ref(false)

function userProps(arg1: string, arg2: any) {
    username.value = computed(() => arg1)
    usernameValidation.value = arg2
} 
*/

const emit = defineEmits<{
    (e: 'value', name: string, inputValue: string): void
    (e: 'enter', name: string, inputValueLenght: number): void
    (e: 'text', name: string): void
}>()

const inputValue = ref('');
const input = ref<HTMLInputElement | null>(null)

onActivated(() => {
    input.value?.focus()
})

//passe les champs mot de passe en texte
const convertToText = function () {
    emit('text', props.name)
    input.value?.focus()
}
</script>

<template>
    <section class="banniere">
        <input ref='input' @keyup="emit('value', name, inputValue)" class="value" v-model='inputValue' :type='type'
            :maxlength='sizeMax' @keydown.enter="emit('enter', name, inputValue.length)" :placeholder="description">
        <div v-if='isAPasswordType' @click="convertToText()" class="showPassword">👁</div>
    </section>
</template>

<style scoped lang='scss'>
@use '../../assets/base.scss' as *;

.banniere {
    position: absolute;
    z-index: 5;
    padding-top: 2vh;
    padding-bottom: 2vh;
    padding-left: 38vw;
    width: 61vw;
    opacity: 1;

    border-radius: 3px;
}

.value {
    border: Opx;
    background-color: rgba(255, 255, 255, 0);
    border: none;
    outline: none;
    color: white;
    font-size: 20px;
    width: 25vw;
    text-align: center;
}

.value:focus {
    border: Opx;
    background-color: rgba(255, 255, 255, 0);
    border: none;
}

.showPassword {
    position: absolute;
    top: 2vh;
    left: 65vw;
    color: rgb(179, 179, 179);
}

.showPassword:hover {
    color: white;
}
</style>