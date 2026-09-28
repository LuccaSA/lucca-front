---
name: lucca-front-scss
description: 'Règles d’écriture du SCSS Lucca Front : nommage type BEM à plat, modifiers/états, layers, tokens, propriétés logiques, structure de fichiers et enregistrement highlight-prisme. À utiliser pour écrire ou modifier du SCSS dans packages/scss, packages/ng ou les stories.'
---

Ces règles garantissent la maintenabilité du design Lucca. Source de vérité : [Guidelines dev UI](https://prisme.lucca.io/94310e217/p/929c63-guidelines-dev-ui) sur Prisme. Le formatage est vérifié par Stylelint (`@lucca/stylelint-config-prisme`) via `npm run lint:style`.

## Nommage des classes

Structure type BEM à plat : `.composant-descendant-descendant`, calquée sur l'imbrication HTML. Chaque élément a une classe unique pour limiter la spécificité.

- **Block** : camelCase — `.numericBadge`, `.indexTable`, `.emptyState`
- **Descendant** : séparé par `-` — `.numericBadge-value`, `.indexTable-body-row`
- **camelCase** pour tout nom (composant ou descendant) à plusieurs mots — `.emptyState-title`

| ✅ | ❌ |
| --- | --- |
| `.header-menu-logo { }` | `.header .menu .logo { }` |
| | `.header-menu img { }` |
| | `.header { &-menu { &-logo { } } }` |

Règles absolues :

- **Pas d'ID** (spécificité trop lourde) ni de **sélecteur d'élément HTML** (pas assez spécifique).
- **Pas de concaténation de nom de classe par imbrication** (`&-descendant` interdit) : toujours écrire la classe complète à plat, pour que la recherche dans le projet fonctionne.
- Une classe = une déclaration, ne pas découper une classe en plusieurs blocs.

## Modifiers et états

- **Modifier** `.mod-<name>` : variation de style (taille, couleur, structure) — `.button.mod-invert`, `.table.mod-S`.
- **État** `.is-<name>` : variation liée à l'état, renseignée par le controller — `.button.is-loading`, `.is-disabled`.
- **Palette** `.palette-<name>` : variation de couleur — `.palette-product`, `.palette-neutral`.

Un `.mod-*` ou `.is-*` ne vit **jamais seul** : il est toujours rattaché à un composant (double classe = spécificité maîtrisée). Un composant peut cumuler plusieurs mods/états. Ils sont déclarés **après** le style principal du composant.

| ✅ | ❌ |
| --- | --- |
| `.button { &.mod-invert { } }` | `.mod-invert { }` |
| `.button { &.is-success { } }` | `.is-success { }` |

## Règles de nommage avancées

**Groupe de composants — `.componentFunctionWrapper`** : élément parent regroupant plusieurs composants identiques ou ajoutant une fonctionnalité. Nom du composant obligatoire en tête, `Wrapper` obligatoire en fin, fonction facultative au milieu.

- ✅ `.avatarWrapper`, `.tableOverflowWrapper`, `.buttonGroupWrapper`
- ❌ `.buttons`, `.button-wrapper`, `.wrapperButton`, `.group`

**Composants frères sans parent — `_` d'adjacence** : `-` décrit la descendance, `_` l'adjacence. Nom du composant en tête et fonction en fin obligatoires.

- ✅ `.dialog_backdrop` (frère de `.dialog`), `.viewTabs_panel`
- ❌ `.panel`, `.viewTabs-panel`, `.viewTabsPanel`

**Sous-composants optionnels — suffixe `Optional`** : `.dialog-formOptional` (sous-composant facultatif dans l'imbrication HTML). Les enfants d'un sous-composant optionnel ne reprennent **pas** son nom : `.dialog-footer`, pas `.dialog-formOptional-footer`.

## Layers CSS

Tout le style vit dans des `@layer`, ordonnés de la priorité la plus basse à la plus haute :

```
reset → base → components → mods → product → utils
```

Lucca Front utilise toutes les couches sauf `product`, réservée au CSS des applications consommatrices.

## Structure de fichiers d'un composant SCSS

Chaque composant de `packages/scss/src/components/<name>/` suit le modèle canonique de `_sample/` :

```
<name>/
├── index.scss       ← câblage classes + layers (seul fichier avec des sélecteurs)
├── component.scss   ← style de base (mixin `component`)
├── vars.scss        ← custom properties (mixin `vars`)
├── mods.scss        ← variantes .mod-*
├── states.scss      ← états .is-*
└── exports.scss     ← ré-export des mixins
```

Pattern de `index.scss` :

```scss
@use 'exports' as *;

.component {
	@layer components {
		@include vars;
		@include component;
	}

	@layer mods {
		&.mod-X {
			@include X;
		}

		&.is-Y {
			@include Y;
		}
	}
}
```

Le composant est ensuite déclaré dans `components/index.scss` via `@forward '<name>';`.

## Variables et tokens

Utiliser **systématiquement** les variables — jamais de valeur en dur :

- **Tokens design** : `--pr-t-<catégorie>-<propriété>` — `--pr-t-spacings-100`, `--pr-t-border-radius-default`, `--pr-t-font-body-M`
- **Palettes** : `--palettes-<palette>-<shade>` — `--palettes-product-700`, `--palettes-neutral-600`
- **Variables composant** : `--components-<name>-<propriété>` définies dans `vars.scss` et référençant les tokens :

```scss
@mixin vars {
	--components-button-borderRadius: var(--pr-t-border-radius-default);
	--components-button-paddingBlock: var(--pr-t-spacings-100);
	--components-button-backgroundColor: var(--palettes-700, var(--palettes-product-700));
}
```

## Propriétés logiques

Utiliser **exclusivement** les propriétés logiques (le codebase est ~100 % logique) :

| ✅ | ❌ |
| --- | --- |
| `inline-size` / `block-size` | `width` / `height` |
| `margin-inline-start` | `margin-left` |
| `padding-block` | `padding-top` + `padding-bottom` |
| `inset-inline-end` | `right` |

## Media queries, mixins, utilities

- **Media queries** : directement dans la déclaration concernée, jamais dans un fichier ou une section à part (évite le code mort). Des mixins usuelles existent dans Lucca Front.
- **Mixins** : avec parcimonie (risque « pelote de laine ») — réservées au code partagé à de nombreux endroits (dégradé de fond, style erreur…).
- **Utilities** `u-*` : déclarations universelles (marges, alignement, couleurs…), **seul endroit autorisé pour `!important`**, à utiliser en bout de chaîne uniquement.

## Encapsulation

Le style des composants ne communique pas entre eux. Un composant peut en **contenir** un autre, mais pas fusionner leurs classes sur un même élément :

| ✅ | ❌ |
| --- | --- |
| `<div class="grid"><div class="grid-6@mediaMinXS"><div class="card">…` | `<div class="grid"><div class="grid-6@mediaMinXS card">…` |

Pour surcharger un composant imbriqué, scoper avec la classe parente : `.parentComponent-action .button { }`.

## Spécificités Angular

- Style racine du composant sur `:host` (ou classes via host binding : `host: { class: 'numericBadge', '[class.is-loading]': 'loading()' }`) pour éviter des niveaux de DOM inutiles.
- `:host-context` plutôt que `::ng-deep` (déprécié) quand le contexte impose de modifier un composant.
- `ViewEncapsulation.None` : les styles des composants `packages/ng` vivent dans le SCSS global.

## Enregistrer un nouveau composant

Tout nouveau composant doit être ajouté au registre `packages/scss/src/commons/utils/highlight-prisme.scss` (sélecteurs de l'utilitaire `.pr-u-highlightPrisme`) :

1. Classe CSS dans la section `HTML COMPONENTS OUTSIDE` (ou `INSIDE` s'il est rendu dans un conteneur), dans la bonne catégorie (Actions, Forms, Loaders…).
2. Sélecteur Angular dans `ANGULAR COMPONENTS OUTSIDE` (ou `INSIDE`).

```scss
// HTML COMPONENTS OUTSIDE — Loaders
.progressStepper,

// ANGULAR COMPONENTS OUTSIDE — Loaders
lu-progress-stepper,
```

## Style consistant (vérifié par Stylelint)

- Indentation par tabs, une déclaration par ligne, une ligne vide avant chaque nouvelle classe.
- Déclarations classées par **ordre alphabétique**.
- Réductions de style : `.5rem` plutôt que `0.5rem`, `0 1rem` plutôt que `0 1rem 0 1rem`.
- Hexadécimaux en majuscules (`#AAAAAA`).
- Pas de préfixes vendeur (autoprefixer s'en charge).

## Checklist finale

- [ ] Classes camelCase (block) + descendants séparés par `-`, à plat (pas de `&-`)
- [ ] Aucun ID ni sélecteur d'élément HTML
- [ ] `.mod-*` / `.is-*` toujours rattachés à un composant, après le style principal
- [ ] Propriétés logiques uniquement
- [ ] Variables/tokens utilisés partout (pas de valeur en dur)
- [ ] Media queries dans leur contexte
- [ ] Style réparti dans les bons fichiers (`vars` / `component` / `mods` / `states`)
- [ ] Nouveau composant enregistré dans `highlight-prisme.scss`
- [ ] `npm run lint:style` passe
