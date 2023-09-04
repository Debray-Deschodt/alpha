<template>
        <section class="component">
            <p class="quitter"> cliquer<br>pour quitter</p>
            <p><strong> Sheety </strong>version 0.3.0</p>
            <p><strong>Express </strong> determine maintenant la partie serveur/backend de notre application. Vous pourrez
                très prochainement vous inscrire et bientôt interagir entre utilisateur.<br>
                La mise en place de cookies, d'un service email et de tout ce dont l'on peut attendre d'un jeu multijoueur
                est en
                cours de developpement.</p>
            <p><strong>Vue.js </strong> coordonne apprésant la partie visuel/frontend de notre projet.<br>
                Il s'agit d'un très grand pas. Le potentiel dynamique et optimisé du framework satisfait toutes les
                attentes.<br>
                La partie frontend n'est maintenant plus un frein au developpement et s'améliore
                de
                jour en jour.</p>
            <p><strong>La direction artistique </strong>s'esquisse.<br>
                Lena imagine des personnages modelés qu'elle anime en stop motion. Ce projet prend forme et permet de
                fournir toute la matière du visuel de l'application. En soit, un petit monde dans lequel tout va pouvoir
                exister.<br>
                Pourquoi pas créer des vidéos de promotion de ces personnages et les repertorié dans un catalogue, des mises
                en situation dans leur état naturel, des descriptions de leurs comportements...</p>
            <p>Côté <strong>musique</strong> c'est Jam et confiture qui s'impose pour le moment.</p>

            <p> <strong>Patch à venir:</strong>
            <ul>
                <li>Perspective dans l'animation de la carte postale.</li>
                <li>Un selecteur de résolution dans le menu option </li>
                <li>Musique et son.</li>
                <li>Mise en place de composant asynchone.</li>
                <li>Faire charger les images au fur et à mesure sur des timings mieux definie.</li>
                <li>Afficher les règles d'enregistrement quand elles ne sont pas respecté.</li>
                <li>Une fonctionnalité d'enrigistrement sur serveur.</li>
            </ul>
            </p>

        </section>
</template>
    
<script setup lang="ts" >


</script>

<style scoped lang="scss">
@use '../../../assets/base.scss' as *;

.component {
    z-index: 10 !important;

    width: 30vw;
    height: 60vh;

    margin-top: 2vh;
    margin-left: 2vw;

    font-size: 1em;
    font-family: var(--font-text);
    color: white;
    background: linear-gradient(to left, rgba(123, 123, 123, 0.656), rgb(67, 67, 67));

    align-items: center;

    padding-left: 0vw;
    padding-top: 0vh;
    padding-bottom: 0vh;
    padding-right: 0vw;

    border: 0px #95afc0 solid;
    border-radius: 10px;
    overflow: auto;

    &:hover{
        background: linear-gradient(to left, rgba(0, 0, 0, 0.667), var(--shadowCard));
    }
}

::-webkit-scrollbar {
    width: 10px;
}

::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0);
}

::-webkit-scrollbar-thumb {
    border-radius: 6px;
    background: #ffffff52;
}


strong {
    color: rgb(194, 217, 250);
    font-size: 1.5em;
}

p {
    margin-top: 0px;
    margin-bottom: 4vh;
    margin-left: 2.5vw;
    margin-right: 2vw;
}

.quitter {
    margin-top: 10px;
    margin-right: 10px;
    margin-bottom: 0px;
    text-align: right;
    color: rgba(76, 76, 76, 0.656);
    font-size: 1.25vh;
}
</style>