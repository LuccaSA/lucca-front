# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Vue d'ensemble du repo

Lucca Front est le framework front-end de Lucca : un monorepo npm workspaces avec versioning unifié aligné sur les majeures Angular (LF 22.x ↔ Angular 22). La version de Node est fixée via Volta (`volta.node` dans package.json).

La branche par défaut est **`master`** : elle reçoit principalement les PR de fix. Les features d'un cycle ciblent la branche de release correspondante (`release/vX.X`).

## Commandes

```bash
npm start                    # Serveur Storybook (port 6006) — le principal moyen de lancer les composants
npm test                     # Vitest, tous les specs (projet `lucca-front` + projet `schematics`)
npx vitest run packages/ng/button/button.spec.ts   # un seul fichier de test
npx vitest run -t "nom du test"                     # un seul test par son nom
npm run test:eslint-plugin   # tests du plugin ESLint local (workspace dédié)
npm run test-storybook       # tests d'interaction Storybook (vitest --project=storybook)
npm run lint                 # lint:es (eslint packages/) + lint:style (stylelint SCSS)
npm run lint:fix             # les deux, avec --fix
npm run build                # build:ng (prisme + ng via ng-packagr) puis build.js (scss, icons, schematics) → dist/
npm run i18n:update          # récupère les traductions depuis Lokalise et prettifie les translations.ts
```

Environnement de test : Vitest + `@analogjs/vite-plugin-angular`, `happy-dom`, globals activés, `TZ=UTC` forcé (voir `vitest.shared-config.ts`). Les specs utilisent `describe(MyComponent.name, ...)` — un plugin Vite maison réécrit `.name` pour la découverte des tests.

## Architecture des packages

Cinq workspaces sous `packages/`, publiés avec les dépendances `ng → scss → icons` :

- **`@lucca-front/ng`** — composants Angular métier et logique spécifique Lucca. Chaque dossier de premier niveau (`button/`, `modal/`, `core-select/`…) est son **propre entrypoint secondaire ng-packagr** (avec son `ng-package.json`), donc son propre bundle. Les imports inter-entrypoints se font via `@lucca-front/ng/<name>` ; ESLint interdit les imports relatifs `packages/ng` ou `dist/ng`.
- **`@lucca-front/prisme`** — composants purs du Design System (open source, atomiques/moléculaires, sans logique métier). Les nouveaux composants DS vont ici, pas dans `ng`.
- **`@lucca-front/scss`** — framework SCSS ; **`@lucca-front/icons`** — police d'icônes (régénérée par le script `icons:update`).
- **`@lucca-front/eslint-plugin`** — règles ESLint locales (chargées dans `eslint.config.mjs` sous `@lucca-front/*`).

`packages/stylelint-config` (`@lucca/stylelint-config-prisme`) est une config Stylelint partageable, référencée en dépendance `file:`.

`packages/ng/schematics` contient les migrations `ng add`/`ng update`. Ses specs tournent dans un projet Vitest dédié (`schematics`, config `vitest.schematics.config.ts` + setup `vitest.schematics-setup.ts`) : environnement Node avec un loader ts-node, car `SchematicTestRunner` charge les factories via un `require` CommonJS natif hors du pipeline Vite. Ils sont inclus dans `npm test`.

### Conventions composants

- Composants standalone, `changeDetection: OnPush` (imposé par ESLint), `ViewEncapsulation.None` (les styles sont du SCSS global), styles SCSS (défauts schematics d'angular.json).
- Sélecteurs préfixés `lu` (`lu-kebab-case` pour les composants, `luCamelCase` pour les directives attribut).
- APIs signal-based : `input()` / `input.required()` / `output()`. Chaque input public a un commentaire JSDoc.
- Host bindings via la métadonnée `host: {}` : classe CSS de base posée directement (`class: 'numericBadge'`), conditionnels via `[class.is-X]` (voir `numeric-badge` pour la forme canonique).
- Garder les composants design system « dumb » ; les connecter aux APIs Lucca via des directives séparées (ex. `simple-select`/`multi-select` + directives API). L'accessibilité clavier est une priorité.
- Règles DX de contributing.md : utiliser les transforms `booleanAttribute`/`numberAttribute`, éviter les noms d'inputs génériques (`config`, `param`), typer les inputs avec des unions de strings pour l'autocomplétion, ne jamais entrer en collision avec un input natif de l'hôte. Les contrats d'inputs/outputs publiés sont des breaking changes.
- L'anglais est la langue par défaut pour les discussions, commentaires et commits.

### Règles CSS / SCSS

**Avant d'écrire ou de modifier du SCSS, lire le skill `lucca-front-scss` (`.github/skills/lucca-front-scss/SKILL.md`)** — il contient l'ensemble des règles de nommage, la structure de fichiers et les exemples. Invariants non négociables :

- Nommage BEM à plat : `.composant-descendant` (camelCase pour les noms à plusieurs mots), pas d'ID, pas de sélecteur d'élément HTML, pas d'imbrication de nom de classe via `&-`.
- `.mod-*` / `.is-*` / `.palette-*` sont toujours rattachés à une classe de composant, jamais isolés.
- **Propriétés logiques uniquement** (`inline-size`, `margin-inline-start`… — jamais `width`, `margin-left`).
- Toujours utiliser les tokens/variables (`--pr-t-*`, `--palettes-*`, `--components-<name>-*`), jamais de valeur en dur.
- Les styles vivent dans des `@layer` (`reset → base → components → mods → product → utils`) ; le SCSS d'un composant suit le découpage de `_sample/` (`index`/`component`/`vars`/`mods`/`states`/`exports`).
- Tout nouveau composant doit être enregistré dans `packages/scss/src/commons/utils/highlight-prisme.scss`.

Référence : [Guidelines dev UI](https://prisme.lucca.io/94310e217/p/929c63-guidelines-dev-ui) (Prisme). Le formatage (tabs, ordre alphabétique, hexadécimaux en majuscules…) est vérifié par `npm run lint:style`.

### i18n

Chaque entrypoint qui affiche du texte a un `translations.ts` indexé par locale (`fr-FR`, `en`, `de`…). Les composants les consomment via `getIntl()` / `intlInputOptions()` de `packages/ng/core/translate`, qui résout `LOCALE_ID` (exact → 2 lettres → fallback `en`) et expose un input `[intl]` acceptant des overrides partiels fusionnés avec les défauts. Ne jamais éditer à la main les valeurs traduites des autres locales — les traductions sont gérées dans Lokalise (`npm run i18n:update`).

## Storybook

`stories/` est découpé en `documentation/` (docs publiques, groupées par thème : forms, overlays, navigation…), `qa/` (pages QA par composant) et `helpers/`. Le lint est fortement assoupli pour `stories/**`. Storybook build avec compodoc pour la doc d'API.

- **Stories QA** (`stories/qa/<composant>/`) : un `@Component` wrapper dans `<composant>.stories.ts` avec `templateUrl` pointant vers `<composant>.stories.html`, qui contient une `<table class="demo-QAtable">` comparant côte à côte la version HTML (classes CSS pures) et la version Angular (composants `<lu-*>`). La colonne Angular doit utiliser de vrais composants `lu-*`, jamais du HTML brut avec des classes.
- **Stories de documentation** (`stories/documentation/<catégorie>/<composant>/`) : `Meta`/`StoryObj` standards sur la classe du composant, titre reflétant l'arborescence (`Documentation/<Catégorie>/<Composant>/Angular/<Variante>`) ; les variantes Angular et HTML vivent dans des dossiers frères `angular/` et `html&css/`. Utiliser `generateInputs(inputs, argTypes)` et `createTestStory` de `stories/helpers/stories`.

## Docs & skills

- `docs/*.md` — documents de conception internes de certains composants.
- `.github/skills/` — skills agents générés (changelogs par release, infos de dépréciation), produits par `npm run skills:generate` depuis `scripts/generate-skills/`.
- La référence du Design System vit sur zeroheight (Prisme).
