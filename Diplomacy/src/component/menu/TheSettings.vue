<script setup lang='ts'>

</script>

<template>
    <section class="bannerSettings">
        <h1>Options</h1>
        <h2>Affichage</h2>
        <div class="pan">
            <h3>Langue</h3>
            <div class="customSelect">
                <select>
                    <option value="français">français</option>
                    <option value="anglais">anglais (à venir)</option>
                    <option value="espagnol">espagnol (à venir)</option>
                    <option value="allemand">allemand (à venir)</option>
                    <option value="italien">italien (à venir)</option>
                </select>
            </div>
            <h3>Résolution</h3><select>
                <option value="standard">standard</option>
                <option value="adapté">adapté</option>
                <option value="téléphone">téléphone</option>
            </select>
            <h3>Mode plein écran</h3><input class="checkbox" type="checkbox">
            <h3>Animation personnage</h3><input class="checkbox" type="checkbox">
        </div>

        <h2>Audio</h2>
        <div class="pan">
            <h3>Mute</h3><input class="checkbox" type="checkbox">
            <h3>Intensité</h3><input class="range" type="range">
        </div>

        <h2>Installation</h2>
        <div class="pan">
            <h3>Mode local</h3>
            <input class="checkbox" type="checkbox">
            <h3>Données graphiques HD</h3>
            <button>Télécharger</button>
            <h3>Données audio</h3>
            <button>Télécharger</button>
        </div>
        <h1></h1>
    </section>
</template>

<style scoped lang='scss'>
@use '../../assets/base.scss' as *;

h1 {
    font-size: 4vw;
    color: rgba(248, 248, 248, 0.851);
    padding: 0px;
    padding-left: 0px;
    margin-top: 11vh;
    margin-left: 7vw;
}

h2 {
    font-size: 3vh;
    color: rgb(248, 248, 248, 0.851);
    padding: 0px;
    padding-bottom: 1vh;

    border-bottom: 2px rgb(255, 255, 255, 0.434) solid;

    width: 80%;

    margin-bottom: 3vh;
    margin-top: 6vh;
    margin-left: 5vw;
}

h3 {
    font-size: 2vh;
    color: rgb(248, 248, 248, 0.678);
    padding: 0px;
    margin: 0px;
    margin-bottom: 1vh;
}

.bannerSettings {
    margin: 0;

    height: 99.5vh;
    padding-top: 0.5vh;
    padding-bottom: 0vh;

    background-color: rgba(173, 197, 244, 0.737);

    border-radius: 10px 10px 0px 0px;
    overflow: auto;
}

.bannerSettings:hover {
    // background-color: rgba(141, 162, 240, 0.919);
    background-color: white;
}

.bannerSettings:hover h1 {
    color: rgb(194, 176, 176);
}

.bannerSettings:hover h2 {
    color: rgb(194, 176, 176);
    border-bottom: 2px rgba(205, 199, 199, 0.434) solid;
}

.bannerSettings:hover h3 {
    color: rgba(194, 176, 176, 0.678);
}

::-webkit-scrollbar {
    width: 10px;
}

::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0);
}

::-webkit-scrollbar-thumb {
    border-radius: 6px;
    background: rgba(221, 217, 217, 0.714);
}

.pan {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 20px;
    padding-left: 5vw;
}

.checkbox {
    height: 1vw;
    width: 1vw;
    margin: 0px;
    margin-top: 0.5vh
}

button {
    border: none;
    background-color: rgba(189, 207, 243, 0.825);
    height: 3vh;
    width: 8vw;
    color: white;
    font-family: 'Roboto', sans-serif;
    border-radius: 10px;
}

.bannerSettings:hover button {
    background-color: rgba(194, 176, 176, 0.507);
}

.bannerSettings:hover button:hover {
    background-color: rgba(173, 158, 158, 0.507);
}

.bannerSettings:hover button:active {
    background-color: rgba(172, 148, 148, 0.681)
}

select {
    width: 10vw;
    background-color: rgba(255, 255, 255, 0);
    border: none;
    border-bottom: 1px rgba(255, 255, 255, 0.611) solid;
    outline: none;
    color: white;
    font-size: 2vh;
    font-family: 'Roboto', sans-serif;
    padding-left: 0px;
}

.bannerSettings:hover select {
    width: 10vw;
    background-color: rgba(255, 255, 255, 0);
    border: none;
    border-bottom: 1px rgb(194, 176, 176) solid;
    outline: none;
    color: rgb(194, 176, 176);
}

.range {
    width: 15vw;
    margin-bottom: 0px;
}
</style>

