# Overrides 21.0 (vs base 21.3)

- **Dernier patch publié de cette mineure** : `21.0.5` (patchs : 21.0.0, 21.0.1, 21.0.2, 21.0.3, 21.0.4, 21.0.5)
- **Storybook exact** : https://lucca-front.lucca.io/v21.0.5/storybook
- **Fichiers overrides** : 234 — pour tout chemin, lire d'abord ce dossier, sinon la base `../../`.
- **Règle URL** : dans les fichiers lus depuis la base, remplacer `v21.3.1` par `v21.0.5` dans les URLs Storybook.
- **Changelogs & migrations** : lire la section `## Changelog` du `<slug>.md` de la **base** et le `migrations.md` de la base (cumulatifs, entrées étiquetées par version) en **ignorant les entrées postérieures à `21.0.5`**.

## Composants absents de 21.0 (ajoutés dans une mineure ultérieure — ne pas utiliser)

- activity-feed
- bubble-icon
- bubble-illustration
- color
- color-picker
- errorpage
- form-label
- highlight-text
- impersonation
- progress-stepper
- software-icon
- time
