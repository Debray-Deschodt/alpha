<script setup lang='ts'>
import type { PostItInterface } from '@/interface/postIt.interface';
import { onMounted, ref } from 'vue';

defineProps<{
    data: PostItInterface,
}>()

const emit = defineEmits<{
    (e: 'text', text: string): void
    (e: 'cancel'): void
    (e: 'send'): void
}>()

const text = ref("")
const textSimulation = ref("")
const input = ref<HTMLInputElement | null>(null)

onMounted(() => {
    input.value?.focus()
    text.value = ""
    textSimulation.value = ""
})

function isOverflown() {
    const element = document.querySelector("#textPostItSimulation")
    if (element!.scrollHeight == element!.clientHeight) {
        text.value = textSimulation.value
    } else {
        textSimulation.value = textSimulation.value.substring(0, textSimulation.value.length - 1);
    }
    emit('text', text.value)
}

</script>

<template>
    <section class="post" :style="'background-color:#' + data.color">
        <div class="button">
            <button @click="emit('send')">Poster</button>
            <button @click="emit('cancel')">Annuler</button>
        </div>
        <textarea disabled="true" @keyup="isOverflown()" @keydown="isOverflown()" id='textPostIt' name='text'
            placeholder="Un petit message..." class="textTrue" v-model="text" />
        <textarea ref="input" spellcheck="false" @keyup="isOverflown()" @keydown="isOverflown()" id='textPostItSimulation'
            name='text' class="textSimulation" v-model="textSimulation" />
    </section>
</template>

<style scoped lang='scss'>
@use '../../assets/base.scss' as *;

.button {
    width: 95%;
    position: absolute;
    display: flex;
    justify-content: right;
    margin: 1vw;
}

button {
    font-size: 1vw;
    border: none;
}

%text {
    position: absolute;
    top: 10vh;
    left: 6vh;
    width: 85%;
    height: 85%;
    font-size: 7.55vh;
    line-height: 8vh;
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

.post {
    position: sticky;
    z-index: 3000;
    left: 30vw;
    top: 18vh;
    width: 80vh;
    height: 80vh;
    display: flex;
    justify-content: center;
    border-radius: 0.25vw;
    box-shadow:
        2.8px 2.8px 2.2px rgba(0, 0, 0, 0.02),
        6.7px 6.7px 5.3px rgba(0, 0, 0, 0.028),
        12.5px 12.5px 10px rgba(0, 0, 0, 0.035),
        22.3px 22.3px 17.9px rgba(0, 0, 0, 0.042),
        41.8px 41.8px 33.4px rgba(0, 0, 0, 0.05),
        100px 100px 80px rgba(0, 0, 0, 0.07);
}
</style>