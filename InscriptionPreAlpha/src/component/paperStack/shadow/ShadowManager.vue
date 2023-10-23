<script setup lang='ts'>
import { reactive, ref, watch } from 'vue';
import { dataShadows, dataVirtualShadows } from '../../../data/paperStackShadows.data'
import Shadow from './TheShadow.vue'

const props = defineProps({
    loaded: Boolean
})

const shadows = ref(dataShadows)
const virtualShadows = ref(dataVirtualShadows) // data for shadow position compared to mouse position
const calcConst1 = 0.2131147540983607
const calcConst2 = 0.475

const stateActive = reactive({
    shadow: false,
    moveSection: true,
})

let mousePosition = {
    posX: 0,
    posY: 0
}

function distance(posX: number, posY: number) {
    return Math.sqrt(Math.pow((mousePosition.posX - posX), 2) + Math.pow((mousePosition.posY - posY), 2))
}

function derivative(posX: number, posY: number) {
    return (mousePosition.posY - posY) / (mousePosition.posX - posX)
}

function angle(posX: number, posY: number, distance: number, rotateType: number, correction: number) {
    let returnAngle
    switch (rotateType) {
        case 1: returnAngle = convertToDegree(Math.acos(Math.pow(Math.abs(derivative(posX, posY) / distance), 0.5))) + correction; break
        case 2:
            if (derivative(posX, posY) > 0) {
                returnAngle = convertToDegree(-Math.asin(Math.pow(derivative(posX, posY) / distance, 0.5))) + correction
            } else {
                returnAngle = convertToDegree(Math.asin(Math.pow(-derivative(posX, posY) / distance, 0.5))) + correction
            }; break
        case 3:
            if (derivative(posX, posY) > 0) {
                returnAngle = convertToDegree(-Math.asin(Math.pow(derivative(posX, posY) / distance, 0.5))) + correction
            } else {
                returnAngle = convertToDegree(Math.asin(Math.pow(-derivative(posX, posY) / distance, 0.5))) + correction
            }; break
    }
    return returnAngle
}

function convertToDegree(radian: number) {
    return radian * (360 / Math.PI)
}

function move(event: MouseEvent) {
    mousePosition.posX = (event.pageX * 100) / document.querySelector('#menu')!.clientWidth
    mousePosition.posY = (event.pageY * 100) / document.querySelector('#menu')!.clientWidth
    mousePosition.posX = ((mousePosition.posX - 20) * calcConst1) + 44 // raise the area
    mousePosition.posY = (mousePosition.posY * calcConst2) + 22
    for (let virtualShadow of virtualShadows.value) {
        shadows.value[virtualShadow.index].spread = distance(virtualShadow.posX, virtualShadow.posY) + shadows.value[virtualShadow.index].initSpread
        shadows.value[virtualShadow.index].rotate = 360 - angle(virtualShadow.posX, virtualShadow.posY, shadows.value[virtualShadow.index].spread, virtualShadow.shadowType, virtualShadow.shadowCorrection)!
    }
}

function mouseOut() {
    stateActive.shadow = false
}

function mouseOver() {
    stateActive.shadow = true
}

</script>

<template>
    <section>
        <TransitionGroup name="fade">
            <Shadow v-if="stateActive.shadow" v-for="shadow in shadows" :key="shadow.id" :data="shadow" />
        </TransitionGroup>
        <div v-if="stateActive.moveSection" class="moveSection" @mouseout="mouseOut" @mouseover="mouseOver"
            @mousemove="move" />
    </section>
</template>

<style scoped lang='scss'>
@use '../../../assets/base.scss' as *;


// the same zone but on the ground
// .moveSection {
//     position: absolute;
//     z-index: 9;
//     top: 22vw;
//     left: 44vw;
//     height: 19vw;
//     width: 13vw;
//     background-color: rgba(255, 0, 0, 0.432);
// }

.moveSection {
    position: absolute;
    z-index: 9;
    top: 0vw;
    left: 20vw;
    height: 40vw;
    width: 61vw;
    background-color: rgba(255, 0, 0, 0);
}

.fade-enter-active {
    transition: all 0.2s;
}

.fade-leave-active {
    transition: all 0.8s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>