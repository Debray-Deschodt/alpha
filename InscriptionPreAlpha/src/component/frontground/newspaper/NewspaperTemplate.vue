<script setup lang='ts'>
const props = defineProps({
    index: Number,
    date: String
})
</script>

<template>
    <section class='background'>
        <h1>La Feuille de Chou</h1>
        <section class="banner">
            <h3>volume {{ props.index }}, du {{ props.date }}</h3>
            <h3>volume {{ props.index }}, du {{ props.date }}</h3>
            <h3>volume {{ props.index }}, du {{ props.date }}</h3>
        </section>
        <section>
            <slot />
            <p class='foot'>{{ props.index }}</p>
        </section>
    </section>
    <div class="background2" />
    <div class="background3" />
    <div class="filtre" />
</template>

<style scoped lang='scss'>
@use '../../../assets/base.scss' as *;

h1 {
    margin: 0px;
    margin-top: 1vw;
    text-align: center;
    font-family: 'UnifrakturMaguntia', cursive;
    font-size: 4vw;
    text-shadow: -5px 0px 0px rgba(0, 0, 0, 0.105),
        -8px 0px 0px rgba(0, 0, 0, 0.127);
    letter-spacing: 1.5px;
}

h2 {
    font-family: 'DM Serif Display', serif;
    font-size: 1em;
    margin-top: 0.5vw;
    border-bottom: black 0.2vw solid;
    padding-left: 0.5vw;
    margin-left: 0.5vw;
    margin-right: 0.5vw
}

h3 {
    font-size: 0.4em;
    font-family: 'Open Sans', sans-serif;
    margin: 0px;
}

p {
    font-family: 'Open Sans', sans-serif;
    font-size: 0.5em;
    text-align: justify;
    padding: 0.5vw;
    margin: 0px;
    line-height: 1.4vw;
}

.banner {
    display: flex;
    justify-content: space-between;

    margin: 0.4vw 0 0 0;
    padding: 0.5vw 0 0.5vw 0;

    border: black solid 0.2vw;
    border-left: none;
    border-right: none;
}

.foot {
    text-align: center;
    font-size: 0.4em;
    font-family: 'Open Sans', sans-serif;
    border-top: black 1px solid;
    margin-top: 1vw;
}

.background {
    position: absolute;
    z-index: 3;
    top: 2.8vw;
    left: 5vw;
    background-color: #ccc5bd; //#dcd3c3
    width: 86vw;
    height: 50vw;
    padding-top: 0px;
    padding-left: 2vw;
    padding-right: 2vw;
    box-shadow:
        -1.6px 0px 0px rgba(0, 0, 0, 0.058),
        -5px 0px 0px rgba(0, 0, 0, 0.127);
    font-size: 2vw;
    overflow: hidden;
    color: black;
    border-radius: 5px 5px 10px 0px;

}

.background2 {
    position: absolute;
    z-index: 2;
    top: 3.3vw;
    left: 4.5vw;
    background-color: #d4cfcc;
    width: 2vw;
    height: 49.5vw;
    padding: 0px;
    rotate: -1deg;
    box-shadow:
        -0.4px 0px 0px rgba(0, 0, 0, 0.058),
        -3px 0px 0px rgba(0, 0, 0, 0.127);
    border-radius: 3px 3px 0px 0px;

}

.background3 {
    position: absolute;
    z-index: 1;
    top: 3.8vw;
    left: 4.2vw;
    background-color: #dbd7d4;
    width: 2vw;
    height: 49vw;
    padding: 0px;
    rotate: -1.5deg;
    box-shadow:
        -0.4px 0px 0px rgba(0, 0, 0, 0.058),
        -3px 0px 0px rgba(0, 0, 0, 0.127);
    border-radius: 3px 3px 0px 0px;
}

.filtre {
    position: absolute;
    z-index: 7;
    top: 2.8vw;
    left: 5vw;
    background: linear-gradient(to left, rgba(255, 255, 255, 0.315), #beb29ca5 50%, #a29885a5 50.05%, rgba(255, 255, 255, 0.393));
    padding: 0px;
    width: 90vw;
    height: 50vw;
    border-radius: 5px 5px 0px 0px;
}
</style>