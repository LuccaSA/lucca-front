# Overrides 21.1 (vs base 21.3)

- **Dernier patch publié de cette mineure** : `21.1.4` (patchs : 21.1.0, 21.1.1, 21.1.2, 21.1.3, 21.1.4)
- **Storybook exact** : https://lucca-front.lucca.io/v21.1.4/storybook
- **Fichiers overrides** : 204 — pour tout chemin, lire d'abord ce dossier, sinon la base `../../`.
- **Règle URL** : dans les fichiers lus depuis la base, remplacer `v21.3.1` par `v21.1.4` dans les URLs Storybook.
- **Changelogs & migrations** : lire la section `## Changelog` du `<slug>.md` de la **base** et le `migrations.md` de la base (cumulatifs, entrées étiquetées par version) en **ignorant les entrées postérieures à `21.1.4`**.

## Composants absents de 21.1 (ajoutés dans une mineure ultérieure — ne pas utiliser)

- activity-feed
- errorpage
- form-label
- highlight-text
- impersonation
- progress-stepper
- time
