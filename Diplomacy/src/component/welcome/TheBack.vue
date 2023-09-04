<script setup lang="ts">
import { onMounted, ref } from 'vue';


const props = defineProps({
    username: {
        type: String,
        default: ''
    },
    password: {
        type: String,
        default: ''
    }
})

const emit = defineEmits<{
    (e: 'modifier', from: String): void
    (e: 'done'): void
}>()

// it convert the password in X case
const xxx = ref('')
function crypteIt() {
    let x = ''
    for (let i = 0; i < 22; i++) {
        if (props.password!.length > i) {
            x = 'X' + x
        }
    }
    return xxx.value + x
}

onMounted(() => {
    emit('done')
})

</script>

<template>
    <section class='card'>
        <section class="box">
            <section class='username' @click="emit('modifier', 'username')">{{ props.username }}</section>
            <section class='password' @click="emit('modifier', 'password')">{{ crypteIt() }}</section>
        </section>

    </section>
</template>

<style scoped lang="scss">
@use '../../assets/base.scss' as *;

.card {
    background-image: url(../../img/postaleCardBack.jpg);
    height: 100%;
    width: 100%;
    background-size: 100% 130%;
    background-repeat: no-repeat;
}

.box {
    height: 100%;
    width: 95%;
    padding-left: 2%
}

.username {
    position: absolute;
    top: 47.5vh;
    left: 30vw;

    font-family: 'Oregano', cursive;
    color: #070A57;
    font-size: 5vw;
    text-align: left;
}

.password {
    position: absolute;
    top: 60.5vh;
    left: 33vw;

    font-family: 'Oregano', cursive;
    color: #070A57;
    font-size: 3vw;
    padding-top: 0;
    width: 35vw;
    text-align: right;
}
</style>