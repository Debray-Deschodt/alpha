<script setup lang='ts'>
import type { PostItInterface } from '@/interface/postIt.interface';
import { onMounted, ref } from 'vue';

defineProps<{
    data: PostItInterface,
}>()

const emit = defineEmits<{
    (e: 'text', text: string): void
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
    <div class="post" :style="'background-color:#' + data.color">
        <textarea disabled="true" @keyup="isOverflown()" @keydown="isOverflown()" id='textPostIt' name='text'
            placeholder="Un petit message..." class="textTrue" v-model="text" />
        <textarea ref="input" @keyup="isOverflown()" @keydown="isOverflown()" id='textPostItSimulation' name='text'
            placeholder="Un petit message..." class="textSimulation" v-model="textSimulation" />
    </div>
</template>

<style scoped lang='scss'>
@use '../../assets/base.scss' as *;

%text {
    position: absolute;
    top: 5vw;
    left: 0vw;
    width: 36vw;
    height: 33vw;
    padding: 0vw 2vw 2vw 2vw;
    font-size: 4vw;
    overflow: hidden;
    font-family: 'Caveat', cursive;
    border: none;
    resize: none;
    outline: none;
    line-height: 4vw;
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
    height: 40vw;
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