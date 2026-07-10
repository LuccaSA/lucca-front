# Overrides 21.2 (vs base 21.3)

- **Dernier patch publié de cette mineure** : `21.2.5` (patchs : 21.2.0, 21.2.1, 21.2.2, 21.2.4, 21.2.5)
- **Storybook exact** : https://lucca-front.lucca.io/v21.2.5/storybook
- **Fichiers overrides** : 155 — pour tout chemin, lire d'abord ce dossier, sinon la base `../../`.
- **Règle URL** : dans les fichiers lus depuis la base, remplacer `v21.3.1` par `v21.2.5` dans les URLs Storybook.
- **Changelogs & migrations** : lire ceux de la base (cumulatifs, entrées étiquetées par version) en **ignorant les entrées postérieures à `21.2.5`**.

## Composants absents de 21.2 (ajoutés dans une mineure ultérieure — ne pas utiliser)

- highlight-text
- impersonation
- time

## Fichiers retirés après 21.2 (présents ici en intégralité)

- components/duration-picker/stories/html-picker-angular.md
- components/popover/stories/html-skeleton.md
- components/tile/stories/angular-tile-format.md
- components/time-picker/stories/html-picker-angular.md
- components/time-picker/stories/html-picker-basic.md
