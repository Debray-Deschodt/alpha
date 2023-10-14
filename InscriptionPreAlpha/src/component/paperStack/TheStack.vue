<script setup lang="ts">
import { onMounted, type PropType } from 'vue';
import type { PaperStackInterface } from '../../interface/paperStack.interface';

const props = defineProps({
    data: {
        type: Object as PropType<PaperStackInterface>,
        required: true
    }
})

function setterBoxShadow() {
    let boxShadow = ''
    let deltaX = 0
    let deltaY = 0
    let deltaSpread = 0
    let saltX = 0
    let saltY = 0
    for (let i = 0; i < props.data.nbrShadows / 1.5; i++) {
        deltaX += props.data.shiftX * (props.data.nbrShadows - i)
        saltX = (Math.random() - 0.5) / 2
        deltaY += props.data.shiftY * (props.data.nbrShadows - i)
        saltY = (Math.random() - 0.5) / 2
        deltaSpread += props.data.spread * (props.data.nbrShadows - i)

        boxShadow +=
            (deltaX + saltX) + 'vw ' + (deltaY + saltY) + 'vw 1.5vw ' + deltaSpread * props.data.shadowIntensity + 'vw rgba(0, 0, 0, 0.5),'
            + (deltaX + saltX) + 'vw ' + (deltaY + saltY) + 'vw 0vw ' + deltaSpread + 'vw var(--paper),'
    }
    boxShadow = boxShadow.substring(0, boxShadow.length - 1)
    return boxShadow
}

onMounted(() => {
    document.querySelector('#' + props.data.id)!.setAttribute('style', 'top :' + props.data.top + 'vw; left:' + props.data.left + 'vw; height:' + props.data.size + 'vw; width:' + props.data.size + 'vw; padding :' + props.data.size / 5 + 'vw; box-shadow:' + setterBoxShadow() + '; font-size:' + props.data.size / 27 + 'vw;')
    document.querySelector('#' + props.data.id)!.innerHTML = props.data.text

    for (let i = 0; i < document.getElementsByTagName('b').length; i++) {
        document.getElementsByTagName('b')[i].setAttribute('style', 'text-decoration: line-through solid rgba(90, 79, 79, 0.693); color: rgba(90, 79, 79, 0.693); font-weight: 400;')
    }
    if (props.data.id == 'thirdStack') {
        document.querySelector('#thirdStack')?.setAttribute('style', 'top :' + props.data.top + 'vw; left:' + props.data.left + 'vw; height:' + props.data.size + 'vw; width:' + props.data.size + 'vw; padding :' + props.data.size / 5 + 'vw; box-shadow:' + setterBoxShadow() + '; font-size:' + props.data.size / 27 + 'vw; text-align:end;')
    }
})
</script>

<template>
    <section :id="props.data.id"></section>
</template>

<style scoped lang='scss'>
@use '../../assets/base.scss' as *;
@use '../../assets/animation.scss' as *;

section {
    box-sizing: border-box;
    position: absolute;
    background: linear-gradient(to bottom right, var(--paper-frontbottom), var(--paper-backtop));
    overflow: hidden;

    border-top-left-radius: 10% 80%;
    border-top-right-radius: 5% 80%;
    border-bottom-right-radius: 50% 10%;
    border-bottom-left-radius: 2% 80%;

    font-family: 'Oregano', cursive;
    color: rgba(90, 79, 79, 0.693);
    text-align: justify;
    font-weight: 400;

    animation: 4s ease-in-out infinite alternate windy
}
</style>