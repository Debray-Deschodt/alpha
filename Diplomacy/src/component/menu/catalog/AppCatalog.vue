<script setup lang='ts'>

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
                    <h1>La Feuille de Chou</h1>
                    <section class="banner">
                        <h3>volume 1, du 11 août 2023</h3>
                        <h3>volume 1, du 11 août 2023</h3>
                        <h3>volume 1, du 11 août 2023</h3>
                    </section>
                    <section class="content">
                        <h2 class="h2Lessive">La Grande Lessive</h2>
                        <div class="pictLessive"></div>
                        <p class="lessive">Aujourd'hui, c'est jour de lessive. Naturellement Maurice appréhende. Mais y'a
                            pas
                            à tortiller ! Il saute le pas et jette son pyjama favori dans le tambour de la machine à laver.
                            Le vêtement se gorge d'eau,
                        </p>
                        <p class="lessive2">puis de produit à mousser. Un
                            tintement annonce l'issue du cycle de rinçage. Le petit crocodile récupère le bout de tissu
                            qu'il espère intact. "Mes peurs les plus profondes se sont confirmées. J'ai compris que rien ni
                            personne ne pourrait plus le ramener." Le pyjama avait rétréci.
                            Chaque année, la catastrophe fait preuve d'une régularité sans faille, les vêtements
                            rétrecissent en cours de lavage. Témoignage de Maurice : "Je n'ai rien pu faire, mon pyjama ne
                            m'ira plus. Je ne pourrai plus jamais dormir avec". Selon Maurice, c'est l'un de ses lavages
                            qui
                            est une fois de plus à l'origine de ce micmac. D'après les données accessibles au 10 août
                            2023 l'indice de rétrécissement est à son pic saisonnier. Si Maurice s'en est sorti, il garde
                            aujourd'hui de fortes sequelles de cette épreuve. Le jeune crocodile témoigne de sa difficulté
                            à
                            accepter de voir ainsi sa vie basculer. </p>
                        <div class="pictPuces"></div>
                        <h2 class="h2Puces">Les puces sont de retour </h2>
                        <p class="puces">Les deux premiers arrivants, Pam et Arnold s'installent avant le lever du jour :
                            "Je (ne) voulais vraiment pas rater ça, et encore moins arriver en retard [...] ".
                            <!-- Ils sont précédés des autres exposants avec près de deux heures de latence. -->
                            "Au début on n'a rien vendu il n'y avait pas un chat. Puis après tout le monde est arrivé et là
                            on a beaucoup vendu. ça fait de l'argent dans la poche. Moi je veux m'acheter une console et
                        </p>
                        <p class="puces2"> Pam
                            une nouvelle
                            guitare". À l'instar des foires d'antan, s'est éveillé dès les premières heures de la matinée
                            bruits de moteurs et éclats de voix. Les rues fourmillent, petits et grands sont de mise et la
                            cour
                            de l'école est occupée. Les bénévoles comme les exposants, dont la famille souriceau que l'on
                            retrouva le soir même, se </p>
                        <p class="puces3">mettent en place. À 20h le calme est revenu et la petite fratrie affiche à la fois
                            sa fatigue et son enthousiasme.
                            Pam l'ainée n'a, une fois de plus, pas souhaité s'exprimer. En revanche son frère Arnold atteste
                            de son excitation au
                            yeux de l'évènement: "C'était trop bien, j'ai adoré les saucisses, Pam à fait plein d'argent,
                            elle a vendu mon camion". Les puces n'ont qu'à bien se tenir.</p>
                        <p class="puces4"> </p>
                        <div class="pictSong"></div>
                        <p class="song"> Pensez-y ! La semaine prochaine, le café Le coin perdu reçoit Oscar, grand
                            prestidigitateur en
                            devenir. Ses numéros de magie et acrobaties vous laisseront pantois. Vous aussi venez faire un
                            tour et profiter de ce merveilleux spectacle.
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
    margin-top: 1vw;
    text-align: center;
    font-family: 'UnifrakturMaguntia', cursive;
    font-size: 2em;
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

.content {
    display: grid;
    grid-template-columns: 1fr 1.34fr 1fr 1fr 1fr 1fr;
    grid-template-rows: 12vw 10vw 5vw 12.5vw 2vw;
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
    height: 20vw;
    background-color: #d4cfcc;
    background-image: url(../../../img/marcelNB.jpg);
    background-size: 14vw 20vw;
    padding: 0px;
    margin: 0px;
    margin-top: 0.5vw
}

.h2Lessive {
    grid-column-start: 1;
    grid-row-start: 3;
    margin-top: -1.5vw;
    height: 5.5vw;
}

.lessive {
    margin-top: -0.1vw;
    grid-column-start: 1;
    grid-row-start: 4;
}

.lessive2 {
    grid-column-start: 2;
    grid-row-start: 1;
    grid-row-end: 4;
    border-right: black 0.1vw solid;
    height: 37.7vw;
    margin-top: 0.8vw;
    padding-top: 0;
}

.pictPuces {
    grid-column: 3/5;
    grid-row-start: 1;
    grid-row-end: 2;
    height: 14.7vw;
    background-color: #d4cfcc;
    padding: 0px;
    margin-left: 0.5vw;
    margin-right: 0.5vw;
    margin-top: 0.5vw;
    background-image: url(../../../img/PamArnoldNB.jpg);
    background-size: 101%;
}

.h2Puces {
    grid-column: 3/5;
    grid-row-start: 3;
    height: 2.8vw;
    margin-top: -7.2vw;
}

.puces {
    grid-column-start: 3;
    grid-row-start: 4;
    margin-top: -8.5vw;
}

.puces2 {
    grid-column-start: 4;
    grid-row-start: 4;
    margin-top: -8.5vw;
    height: 9.7vw;
}

.puces3 {
    grid-column-start: 5;
    border-bottom: black 0.1vw solid;
    border-right: black 0.1vw solid;
    height: 22.5vw;
    margin-top: 0.3vw;

}

.puces4 {
    grid-column-start: 6;
    border-bottom: black 0.1vw solid;
    height: 22.5vw;
    margin-top: 0.3vw;
}

.pictSong {
    grid-column: 5;
    grid-row-start: 3;
    height: 13.5vw;
    background-color: #d4cfcc;
    padding: 0px;
    margin-left: 0.5vw;
    margin-right: 0.5vw;
    margin-top: 3vw;
}

.song {
    grid-column-start: 6;
    grid-row-start: 3;
    margin-top: 2.3vw;
}

/**************************************Newspaper Background**********************************
*********************************************************************************************
********************************************************************************************* */

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

.closeButton {
    position: absolute;
    z-index: 5;
    top: 1vw;
    left: 95vw;
    width: 4vw;
    height: 4vw;
    margin: 0px;
    padding: 0px;
    border: none;
    border-radius: 1000px;
    opacity: 1;
    background-color: rgba(76, 76, 163, 0.234);
    color: rgba(255, 255, 255, 0.234);
    font-size: 2vw;
    transition: background-color 0.4s;
}

.closeButton:hover {
    background-color: rgba(75, 75, 156, 0.367);
}

.closeButton:active {
    background-color: rgba(75, 75, 156, 0.652);
    color: white;
}

.filtreBackground {
    position: absolute;
    z-index: 5;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.423);
    overflow : hidden;
}

.newspaperAnimation {
    position: relative;
    width: 100vw;
    height: 100vh;
    background-color: rgba(255, 0, 0, 0);
    transform-origin: 50vw 50vh;
    padding: 0;
    margin: 0;
    top: 0;
    rotate: 1deg;
    overflow: auto
}

.newspaperAnimation::-webkit-scrollbar {
    position: absolute;
    z-index: 10;
}



.shadowRight {
    position: absolute;
    z-index: 7;
    top: 2.8vw;
    left: 50vw;
    background: linear-gradient(to left, rgba(255, 255, 255, 0.393), #a29885a5);
    padding: 0px;
    width: 45vw;
    height: 50vw;
    border-radius: 0px 5px 10px 0px;
}

.shadowLeft {
    position: absolute;
    z-index: 7;
    top: 2.8vw;
    left: 5.1vw;
    background: linear-gradient(to right, rgba(255, 255, 255, 0.315), #beb29ca5);
    padding: 0px;
    width: 45vw;
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
</style>