<script setup lang='ts'>
import { ref } from 'vue';


const emit = defineEmits<{
    (e: 'done', from: String): void
}>()
// Le Quotidien d'un Canard
//L'Hebdromadaire
//Press Canard

</script>
<template>
    <section class="filtreBackground">
        <button @click="$emit('done', 'catalog')" class="closeButton">X</button>
        <Transition name="appearNewspaper" appear>
            <section class='newspaperAnimation'>
                <section class='background'>
                    <h1>Presse Canard</h1>
                    <section class="banner">
                        <h3 class="banner1">volume 1, du 11 août 2023</h3>
                        <h3 class="banner2">volume 1, du 11 août 2023</h3>
                        <h3 class="banner3">volume 1, du 11 août 2023</h3>
                    </section>
                    <section class="content">
                        <h2 class="h2Lessive">La Grande Lessive</h2>
                        <div class="pictLessive"></div>
                        <p class="lessive">Aujourd'hui, c'est jour de lessive. Naturellement Maurice appréhende. Mais il
                            n'y a pas
                            a tortiller! Cette
                            fois-ci il saute le pas, et jette son pyjama favoris dans le tambour de la machine à </p>
                        <p class="lessive2">d'eau, puis de produit à mousser. Un tintement annonce l'issue du cycle de
                            rinssage. Le petit crocodile recupère le bout de tissu qu'il espère intact. "Mes peurs les plus
                            profondes se sont confimé. J'ai compris que rien ni personne ne pourrais plus le ramener." Le
                            pyjama
                            avait retressis.
                            Chaque années la catastrophe fait preuve d'une regularité sans faille. Les vêtements
                            rétressissent
                            en cours de lavage. Témoignage de Maurice: "Je n'ai rien pus faire, mon pyjama ne m'ira plus. Je
                            ne
                            pourrais plus jamais dormir avec." D'après Maurice c'est l'un de ces lavages qui est une fois de
                            plus à l'origine de cette discorde. D'après les données accessibles au 10 août 2023 l'indice de
                            rétressissement est a son pic saisonner. Si Maurice</p>
                        <div class="pictPuces"></div>
                        <h2 class="h2Puces">Les puces n'ont qu'à bien se tenir</h2>
                        <p class="puces">Les deux premiers arrivant, Pam et Arnold s'installent avant le lever du jour: "Je
                            voulait
                            vraiment pas raté ça, et encore moins arrivée en retard". Ils sont précédé des autres exposants
                            avec prêt</p>
                        <p class="puces2">de deux heures de latence. "Au debut on n'a rien vendu il n'y avait pas un chat.
                            Puis
                            après tout le monde est arrivé et là on a beaucoup vendu. ça fait de l'argent dans la poche. Moi
                            je veux</p>
                        <p class="puces3">m'acheter une console, et Pam une nouvelle guitare."
                            A l'instar des foires d'antan, s'est éveillée dès les première heures de la matinée: bruits de
                            moteurs, éclats de voix, les rues fourmillent, petits et grands sont de mise, la cour de l'école
                            est occupée. Les bénévoles se mettent en places et les exposants dont la famille souriceau
                            faisait partie que l'on retrouva le soir même s'installaient.</p>
                        <p class="puces4">A 20h le calme est revenu et la
                            petite fraterie souriceau témoigne à la fois de leur fatigue et de leur entousiasme. Pam l'ainé
                            n'a, une fois de plus, pas souhaité s'exprimer. En revanche son frère Arnold atteste de son
                            exitation au yeux de l'évènement: "C'était trop bien, j'ai adorer les saucisses, Pam à fait
                            plein d'argent, elle a vendu mon camion.</p>
                        <div class="pictSong"></div>
                        <p class="song">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Totam iste earum quod
                            consequatur aliquam exercitationem est optio quas recusandae, excepturi amet doloremque veniam
                            reiciendis debitis nostrum rerum fugit repellat quisquam. Psum dolor sit amet consectetur
                        </p>
                        <p class='foot'>1</p>

                    </section>
                </section>
                <div class="background2" />
                <div class="background3" />
                <div class="shadowRight" />
                <div class="shadowLeft" />
            </section>
        </Transition>
    </section>
</template>

<style scoped lang='scss'>
@use '../../../assets/base.scss' as *;

.reflect {
    position: absolute;
    top: 0;
    left: 0;
    font-size: 5em;
    color: white;
}

h1 {
    margin: 0px;
    margin-top: 1%;
    text-align: center;
    font-family: 'UnifrakturMaguntia', cursive;
    font-size: 2em;
}

h2 {
    font-family: 'DM Serif Display', serif;
    font-size: 1em;
    margin-top: 1vh;
    border-bottom: black 2px solid;
    padding-left: 0.5vw;
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
}



.banner {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    border: black 2px solid;
    border-left: none;
    border-right: none;
    margin: 0px;
    margin-top: 0.5%;
    padding-top: 0.5%;
    padding-bottom: 0.5%;
}


.banner1 {
    grid-column-start: 1;
}

.banner2 {
    grid-column-start: 2;
    text-align: center;
}

.banner3 {
    grid-column-start: 3;
    text-align: right;
}

.content {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    grid-template-rows: 20vh 20vh 10vh 24.5vh 5vh;
    grid-auto-rows: minmax(100px, auto);
}

.foot {
    grid-column: 1/7;
    grid-row: 5;
    text-align: center;

    font-size: 0.4em;
    font-family: 'Open Sans', sans-serif;
    border-top: black 1px solid;
}

.pictLessive {
    grid-column: 1;
    grid-row-start: 1;
    grid-row-end: 2;
    height: 39vh;
    background-color: #d4cfcc;
    padding: 0px;
    margin: 0px;
    margin-top: 1vh
}

.h2Lessive {
    grid-column-start: 1;
    grid-row-start: 3;
    height: 10.5vh;
}

.lessive {
    margin-top: 2.3vh;
    grid-column-start: 1;
    grid-row-start: 4;
}

.lessive2 {
    grid-column-start: 2;
    grid-row-start: 1;
    grid-row-end: 4;
    border-right: black 1px solid;
    height: 69vh;
}

.pictPuces {
    grid-column: 3/5;
    grid-row-start: 1;
    grid-row-end: 2;
    height: 39vh;
    background-color: #d4cfcc;
    padding: 0px;
    margin-left: 0.5vw;
    margin-right: 0.5vw;
    margin-top: 1vh;
}

.h2Puces {
    grid-column: 3/5;
    grid-row-start: 3;
    height: 11vh;
    border-right: black 1px solid;
}

.puces {
    grid-column-start: 3;
    grid-row-start: 4;
    margin-top: 2.3vh;
}

.puces2 {
    grid-column-start: 4;
    grid-row-start: 4;
    margin-top: 2.3vh;
    border-right: black 1px solid;
    height: 16.7vh;
}

.puces3 {
    grid-column-start: 5;
    border-bottom: black 1px solid;
    height: 39vh;
}

.puces4 {
    grid-column-start: 6;
    border-bottom: black 1px solid;
    height: 39vh;
}

.pictSong {
    grid-column: 5;
    grid-row-start: 3;
    height: 28vh;
    background-color: #d4cfcc;
    padding: 0px;
    margin-left: 0.5vw;
    margin-right: 0.5vw;
    margin-top: 2vh;
}

.song {
    grid-column-start: 6;
    grid-row-start: 3;
    margin-top: 1vh;
}

//*************************************Newspaper Background**********************************

.background {
    position: absolute;
    z-index: 3;
    top: 5vh;
    left: 5vw;
    background-color: #ccc5bd; //#dcd3c3
    width: 86vw;
    height: 50vw;
    padding-top: 0vh;
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
    top: 6%;
    left: 4.5%;
    background-color: #d4cfcc;
    width: 2%;
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
    top: 6.5vh;
    left: 4.2vw;
    background-color: #dbd7d4;
    width: 2%;
    height: 49vw;
    padding: 0px;
    rotate: -1.5deg;
    box-shadow:
        -0.4px 0px 0px rgba(0, 0, 0, 0.058),
        -3px 0px 0px rgba(0, 0, 0, 0.127);
    border-radius: 3px 3px 0px 0px;
}

.closeButton {
    position: absolute;
    z-index: 5;
    top: 2vh;
    left: 95vw;
    width: 4vw;
    height: 4vw;
    margin: 0px;
    padding: 0px;
    border: none;
    border-radius: 1000px;
    opacity: 1;
    background-color: rgba(76, 76, 163, 0.234);
    color: white;
    font-size: 2vw;
}

.closeButton:hover {
    background-color: rgba(75, 75, 156, 0.367);
}

.closeButton:active {
    background-color: rgba(75, 75, 156, 0.652);
}

.filtreBackground {
    position: absolute;
    z-index: 5;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.423)
}

.newspaperAnimation {
    position: relative;
    width: 100vw;
    height: 100vh;
    background-color: rgba(255, 0, 0, 0);
    transform-origin: 50% 50%;
    padding: 0px;
    margin: 0px;
    top: 0vh;
    rotate: 1deg
}




.shadowRight {
    position: absolute;
    z-index: 7;
    top: 5vh;
    left: 50vw;
    background: linear-gradient(to left, rgba(255, 255, 255, 0.393), #a29885a5);
    padding: 0px;
    width: 45%;
    height: 50vw;
    border-radius: 0px 5px 10px 0px;
}

.shadowLeft {
    position: absolute;
    z-index: 7;
    top: 5vh;
    left: 5vw;
    background: linear-gradient(to right, rgba(255, 255, 255, 0.315), #beb29ca5);
    padding: 0px;
    width: 45%;
    height: 50vw;
    border-radius: 5px 0px 0px 0px;
}

@keyframes appearNewspaper {
    0% {
        opacity: 0;
        top: 100vh;
    }

    20% {
        top: 100vh
    }

    100% {
        top: 0vh;
        opacity: 1;
    }
}

.appearNewspaper-enter-active {
    animation: appearNewspaper 1s;
}

.appearNewspaper-leave-active {
    animation: appearNewspaper 0.25s reverse;
}
</style>