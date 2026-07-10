# Overrides 21.1 (vs base 21.3)

- **Dernier patch publié de cette mineure** : `21.1.4` (patchs : 21.1.0, 21.1.1, 21.1.2, 21.1.3, 21.1.4)
- **Storybook exact** : https://lucca-front.lucca.io/v21.1.4/storybook
- **Fichiers overrides** : 281 — pour tout chemin, lire d'abord ce dossier, sinon la base `../../`.
- **Règle URL** : dans les fichiers lus depuis la base, remplacer `v21.3.1` par `v21.1.4` dans les URLs Storybook.
- **Changelogs & migrations** : lire ceux de la base (cumulatifs, entrées étiquetées par version) en **ignorant les entrées postérieures à `21.1.4`**.

## Composants absents de 21.1 (ajoutés dans une mineure ultérieure — ne pas utiliser)

- activity-feed
- errorpage
- form-label
- highlight-text
- impersonation
- progress-stepper
- time

## Fichiers retirés après 21.1 (présents ici en intégralité)

- components/duration-picker/stories/html-picker-angular.md
- components/popover/stories/html-skeleton.md
- components/tile/stories/angular-tile-format.md
- components/time-picker/stories/html-picker-angular.md
- components/time-picker/stories/html-picker-basic.md
- components/userpopover/design/vue-d-ensemble.md
