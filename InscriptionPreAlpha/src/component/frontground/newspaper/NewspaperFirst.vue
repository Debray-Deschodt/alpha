<script setup lang='ts'>
//manage which newspaper the client show
import NewspaperTemplate from './NewspaperTemplate.vue'
import data from '../../../data/newspaper/newspaper1'
import Postit from '../../blog/PostitStatic.vue'
import { onMounted } from 'vue';

const substring = [
    [0, 207, data[0].text.length],
    [0, 328, 665, 1050, data[1].text.length],
    [0, data[2].text.length],
]

const width = [15, 22, 32.5, 32.5]

const postit = {
    text: 'Après chaque partie, recevez le journal et deux nouveaux personnages jouables.',
    color: 'feca57',
    top: 34,
    left: 55.5,
    index: 4001,
    flat: 0,
    from: 'admin',
    ip: '::1',
}

onMounted(() => {
    document.querySelector('#newspaper1text1')!.innerHTML = data[1].text.substring(substring[1][2], substring[1][3])
    document.querySelector('#newspaper1text2')!.innerHTML = data[3].text
})

</script>

<template>
    <div>
        <NewspaperTemplate :index="1" :date="'16 Novembre 2023'">
            <section class="mt05">
                <div :style="'width:' + width[0] + 'vw'">
                    <div class="picture1" />
                    <h2>{{ data[0].title }}</h2>
                    <p>{{ data[0].text.substring(substring[0][0], substring[0][1]) }}</p>
                </div>
                <div :style="'width:' + width[1] + 'vw; margin-top:0.5vw'">
                    <p>{{ data[0].text.substring(substring[0][1], substring[0][2]) }}</p>
                </div>

                <div :style="'width:' + width[2] + 'vw'">
                    <div class="picture2" />
                    <h2>{{ data[1].title }}</h2>
                    <section>
                        <p style="width: 50%">{{ data[1].text.substring(substring[1][0], substring[1][1]) }}</p>
                        <p style="width: 50%">{{ data[1].text.substring(substring[1][1], substring[1][2]) }}</p>
                    </section>
                </div>

                <div :style="'width:' + width[3] + 'vw'">
                    <section>
                        <p id="newspaper1text1" class="text" style="width: 50%"></p>
                        <p class="text" style="width: 50%">{{ data[1].text.substring(substring[1][3], substring[1][4]) }}
                        </p>
                    </section>
                    <h2></h2>
                    <section>
                        <div class="picture3" style="width: 50%">
                            <h3>{{ data[3].title }}</h3>
                            <h4 id="newspaper1text2"></h4>
                        </div>
                        <p class="text" style="width: 50%">{{ data[2].text }}</p>
                    </section>
                </div>
            </section>
        </NewspaperTemplate>
        <Postit :data="postit" style="transform: rotate(-3deg) scale(1.3);" />
    </div>
</template>

<style scoped lang='scss'>
@use '../../../assets/base.scss' as *;
@use '../../../assets/newspaper.scss' as *;

.picture1 {
    background-color: #d4cfcc;
    background-image: url(../../../img/newspaper/01/mauriceNB.jpg);
    height: 20vw;
    width: 14vw;
    background-size: 14vw 20vw;
}

.picture2 {
    background-image: url(../../../img/newspaper/01/pamArnoldNB.jpg);
    background-size: 101%;
    height: 14.7vw;
    margin: 0.5vw;
}

.picture3 {
    background-color: #ccc5bd;
    box-shadow: inset 0.5vw 0.5vw rgb(78, 78, 77);
    border: 0.1vw solid black;
    height: 14vw;
    width: 14vw;
    margin: 0.5vw;
}

h3 {
    font-family: 'Open Sans', sans-serif;
    font-weight: 400;
    margin-top: 1vw;
    font-size: 1.5vw;
    text-align: center;
    line-height: 1.5vw;
}

h4 {
    font-family: 'Open Sans', sans-serif;
    font-weight: 400;
    font-size: 1vw;
    text-align: center;
    line-height: 2vw;
    margin-top: 1vw;
}
</style>
