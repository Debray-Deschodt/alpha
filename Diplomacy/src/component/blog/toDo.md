FIX
-----Un fix pour modifier la position en fonction du scroll
-----Un fix pour l'acceleration de la vitesse de scroll lorsque l'on prend plusieurs postIt d'affiler.
-----Il faut enlever le premier postIt transparant.
-----On peut selectionner les boutons et c'est pas très esthetique.
-----Lorsque l'on depose un postIt flat il se décale sur la gauche ou la droite, surtout lorsqu'il est loin de sa position d'origine.
-----Modifier le générateur de postIt pour que la propriété left s'arrête à 85 (environ)
Un filtre pour que l'on ne puisse pas selectionner des postit lorsque l'on en créer un.
La souris se décale du postIt lorsque l'on bouge la souris (de gauche à droite en général). C'est leger mais parfois la souris quitte le postIt et alors on ne peut plus le lacher.
FEATURES
-----Un boutton annuler le post
-----Une fonctionnalité de scroll en bord d'écran
-----Un bouton pleine écran
Une barre de scroll personnalisé.
Un visualisateur
Faire voler les postIts lorsqu'ils sont selectionnés

REFACTORISATION
-----Il faut refactoriser l'application et mettre des props pour n'avoir qu'un objet postIt.
-----Il faut refactoriser l'application et mettre le script drag à l'interieur du fichier postit pour que l'on puisse le réutiliser ailleurs.
-----Il faut mettre le mouseup sur le parent du postIt
