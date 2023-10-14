<script setup lang='ts'>
import type { PaperStackShadowInterface } from '../../../interface/paperStackShadow.interface';
import { onMounted, watch, type PropType } from 'vue';

const props = defineProps({
    data: {
        type: Object as PropType<PaperStackShadowInterface>,
        required: true
    }
})

onMounted(() => {
    document.querySelector('#' + props.data.id)!.setAttribute('style', 'top: ' + props.data.top + 'vw; left:' + props.data.left + 'vw; width:' + props.data.size + 'vw; border-bottom:' + props.data.spread + 'vw solid var(--color); transform: rotateZ(' + props.data.rotate + 'deg)')
})

watch(() => props.data.rotate, (rotate) => {
    (document.querySelector('#' + props.data.id)! as HTMLElement).style.transform = 'rotateZ(' + rotate + 'deg)'
})

watch(() => props.data.spread, (spread) => {
    (document.querySelector('#' + props.data.id)! as HTMLElement).style.borderBottom = spread + 'vw solid var(--color)'
})

</script>

<template>
    <div :id="props.data.id"></div>
</template>

<style scoped lang='scss'>
@use '../../../assets/base.scss' as *;

div {
    position: absolute;
    // border-image: linear-gradient(rgb(233, 233, 233), rgb(194, 194, 194));
    border-left: 10vw solid transparent;
    border-right: 10vw solid transparent;
    transform-origin: 50% -2%;
    // transition: all 1s;
}
</style>