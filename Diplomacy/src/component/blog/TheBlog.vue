<script setup lang='ts'>
import axios, { type AxiosResponse } from 'axios'
import { reactive, ref } from 'vue';
import PostItUp from './PostItUp.vue'
import PostItFlat from './PostItFlat.vue'
import Post from './PostItForPost.vue'
import type { PostItInterface } from '@/interface/postIt.interface';

const emit = defineEmits<{
    (e: 'done', from: string): void
}>()

const postIts = ref([{
    text: "",
    color: "",
    top: 0,
    left: 0,
    rotate: 0,
    index: -1,
    flat: 1
}])

const postItForPost = ref({
    text: "",
    color: "",
    top: 0,
    left: 0,
    rotate: 0,
    index: -1,
    flat: 1
})

const state = reactive({
    active: {
        post: false
    }
})
const color = ["ff9ff3", "feca57", "ff6b6b", "48dbfb", "1dd1a1"]

function generatePostIt(userText: string) {
    return {
        text: userText,
        color: color[Math.floor(Math.random() * 5)],
        top: Math.floor(Math.random() * 80) + 5,
        left: Math.floor(Math.random() * 90) + 5,
        rotate: Math.floor(Math.random() * 30) - 15,
        index: 2999,
        flat: 0
    }
}
function validatePost() {
    state.active.post = false
    axios.post("/postit", postItForPost.value)
        .then(() => {
            postIts.value.push(postItForPost.value)
        })
        .catch((e) => console.log(e))
}

function refresh() {
    axios.get("/postit")
        .then((documents: AxiosResponse<PostItInterface[]>) => {
            postIts.value = documents.data
        })
        .catch((e) => console.log(e))
}

function prePost() {
    state.active.post = true
    postItForPost.value = (generatePostIt(""))
}

function setTextForPost(text: string) {
    postItForPost.value.text = text
    console.log(postItForPost.value.text)
}

refresh()

</script>

<template>
    <section class="component-full">

        <PostItUp v-for="postIt in postIts.filter((postIt) => postIt.flat === 0)" :data="postIt" :key="postIt.index" />
        <PostItFlat v-for="postIt in postIts.filter((postIt) => postIt.flat === 1)" :data="postIt" :key="postIt.index" />

        <div class="button">
            <button @click.stop="emit('done', 'blog')">MENU</button>
            <button v-if="!state.active.post" @click.stop="prePost()">POST</button>
            <button v-else @click.stop="validatePost()">SEND</button>

        </div>
        <Transition name="posted">
            <div v-if="state.active.post" class="post">
                <Post :data="postItForPost" @text="setTextForPost" />
            </div>
        </Transition>


    </section>
</template>

<style scoped lang='scss'>
@use '../../assets/base.scss' as *;

@keyframes posted {
    100% {
        transform: scale(0.5);
        opacity: 0;
    }
}

.posted-leave-active {
    animation: posted 0.4s;
}

.button {
    position: sticky;
    z-index: 3000;
    top: 5vh;
    left: 45vw;
    width: 10vw;
    display: flex;
    justify-content: space-evenly;
    gap: 1vw
}

.post {
    position: sticky;
    z-index: 3000;
    left: 30vw;
    top: 18vh;
    width: 40vw;
    display: flex;
    justify-content: center;
}
</style>