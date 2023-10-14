<script setup lang='ts'>
import axios, { type AxiosResponse } from 'axios'
import { inject, reactive, ref, type Ref } from 'vue';
import PostIt from './PostIt.vue'
import Post from './PostItForPost.vue'
import Viewer from './TheViewer.vue'
import type { PostItInterface } from '@/interface/postIt.interface';

const username = inject<Ref<string>>('username')

const emit = defineEmits<{
    (e: 'done', from: string): void
}>()

const postIts = ref([{
    text: '',
    color: '',
    top: -100,
    left: 0,
    index: -1,
    flat: 1,
    from: '',
    ip: ''
}])

const postItForPost = ref({
    text: '',
    color: '',
    top: 0,
    left: 0,
    index: -1,
    flat: 1,
    from: username!.value,
    ip: ''
})

const state = reactive({
    active: {
        post: false,
        viewer: false
    }
})

const drag = reactive({
    LastIndexValue: 0,
    SetLastIndex() {
        this.LastIndexValue++
    }
})

const color = ["ff9ff3", "feca57", "ff6b6b", "48dbfb", "1dd1a1"]

function generatePostIt(userText: string) {
    return {
        text: userText,
        color: color[Math.floor(Math.random() * 5)],
        top: Math.floor(Math.random() * 80) + 5,
        left: Math.floor(Math.random() * 80) + 5,
        rotate: Math.floor(Math.random() * 30) - 15,
        index: 2999,
        flat: 0,
        from: username!.value,
        ip: ''
    }
}
function validatePost() {
    state.active.post = false
    console.log('posted')
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
    state.active.viewer = false
    state.active.post = true
    postItForPost.value = generatePostIt("")
}

function setTextForPost(text: string) {
    postItForPost.value.text = text
}

function setupViewer(data: PostItInterface) {
    state.active.post = false
    postItForPost.value = data
    state.active.viewer = true
}

refresh()

</script>

<template>
    <section id="blog" style="overflow-y: auto" class="component-full">
        <PostIt v-for="postIt in postIts" :data="postIt" :key="postIt.index" :lastIndex="drag"
            @needViewer="setupViewer(postIt)" />

        <div class="button" draggable="true" @dragstart.prevent>
            <button @click.stop="emit('done', 'blog')">MENU</button>
            <button v-if="!state.active.post" @click.stop="prePost()">POST</button>
            <button v-else @click.stop="validatePost()">SEND</button>
        </div>

        <Transition name="posted" mode="out-in">
            <Post v-if="state.active.post" @send="validatePost()" @cancel="state.active.post = false" :data="postItForPost"
                @text="setTextForPost" />
            <Viewer v-else-if="state.active.viewer" @cancel="state.active.viewer = false" :data="postItForPost" />
        </Transition>

    </section>
</template>

<style scoped lang='scss'>
@use '../../assets/base.scss' as *;
@use '../../assets/blog/animation.blog.scss' as *;

%nav,
.button {
    position: sticky;
    z-index: 3000;
    top: 5vh;
    left: 45vw;
    width: 10vw;
    display: flex;
    justify-content: space-evenly;
    gap: 1vw;
}

button {
    border: none;
    font-weight: 400;
    font-size: 2vw;
}
</style>