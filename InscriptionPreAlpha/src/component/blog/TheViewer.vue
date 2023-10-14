<script setup lang='ts'>
import type { PostItInterface } from '@/interface/postIt.interface';
import { onMounted, ref, watch } from 'vue';

const props = defineProps<{
    data: PostItInterface,
}>()

const emit = defineEmits<{
    (e: 'cancel'): void
}>()

const textAntiReadOnly = ref('')

watch(() => props.data, () => {
    textAntiReadOnly.value = props.data.text
})

onMounted(() => {
    textAntiReadOnly.value = props.data.text
})

</script>

<template>
    <section class="post" :style="'background-color:#' + data.color">
        <div class="button">
            <button @click="emit('cancel')">Fermer</button>
        </div>
        <textarea disabled="true" id='textPostIt' name='text' class="text" v-model="textAntiReadOnly"></textarea>
        <!-- <textarea disabled="true" @keyup="isOverflown()" @keydown="isOverflown()" id='textPostIt' name='text'
                placeholder="Un petit message..." class="textTrue" v-model="text" /> -->
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

.text {
    position: absolute;
    z-index: 3000;
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
    color: rgb(73, 71, 84);
    background-color: rgba(0, 0, 0, 0);
}

.post {
    position: sticky;
    z-index: 3000;
    left: 30vw;
    top: 15vh;
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