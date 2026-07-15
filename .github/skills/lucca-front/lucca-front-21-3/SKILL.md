---
name: lucca-front-21-3
description: >
  Design system Lucca Front / Prisme (Angular), versions 21.3.x. À charger pour tout fichier d'un projet qui dépend de @lucca-front/ng ou @lucca-front/scss,
  ou contenant des sélecteurs lu-*, pr-* ou des directives commençant par 'lu' (ex: luButton, luTooltip, luForm).
---

# Design System Prisme — Lucca Front 21.3

**RÈGLE** : Avant toute génération ou modification de code impliquant `lu-*`, `luX` ou `pr-*`, consulte la documentation du composant ci-dessous. Sans cette consultation, toute réponse est invalide.

## 1. Version

Cette skill couvre **Lucca Front 21.3.x** (patchs publiés : 21.3.0, 21.3.1). La **mineure** est celle installée sur le projet — tous les chemins ci-dessous lui sont relatifs, il n'y a pas de mineure à résoudre.

**Détecte le patch installé** (obligatoire, ne le suppose jamais) :

1. en priorité `node_modules/@lucca-front/ng/package.json` → champ `version` (version résolue exacte, ex: `21.3.1`) ;
2. à défaut, la dépendance `@lucca-front/ng` (ou `@lucca-front/scss`) dans le `package.json` du projet (ex: `^21.3.1` → `21.3.1`).

La documentation `references/` reflète le **dernier patch publié : 21.3.1**. Si le patch du projet est **antérieur**, les correctifs livrés après sa version sont décrits dans `fixes/` (voir §2) — ils ne sont **pas** dans son code : consulte tous les `fixes/<M-m-p>.md` de version **strictement supérieure** au patch installé et ignore ces changements.

**Vérifie la cohérence entre la version détectée et cette skill avant de coder.** Dans chacun de ces cas, **arrête-toi et demande à l'utilisateur** — ne suppose jamais une version, ne code pas :

- la **mineure** détectée n'est pas `21.3` (ex: le projet est monté de version mais la skill n'a pas été mise à jour, ou la mauvaise skill est chargée) ;
- le **patch** détecté est **postérieur** à 21.3.1 (dernier patch connu de cette skill → skill périmée, l'API réelle peut différer) ;
- le patch (ou la version `@lucca-front/ng`) **ne peut pas être déterminé**.

## 2. Chemins

Compose le chemin du fichier à partir du slug du composant. **Ne devine jamais un chemin** : seuls les fichiers réellement présents font foi. Si un chemin composé n'existe pas, ne le remplace pas par une supposition — vérifie le slug dans la liste §6.

### Composant `<slug>`

| Fichier | Chemin |
|---------|--------|
| API Angular | `./references/components/<slug>/<slug>.md` |
| Exemples (Angular + HTML) | `./references/components/<slug>/<slug>.component.md` |
| Design (do/don't, usage) | `./references/components/<slug>/design/_index.md` |
| Figma (variantes, node IDs) | `./references/components/<slug>/<slug>.figma.md` |
| Changelog | `./references/components/<slug>/<slug>.changelog.md` |

### Types partagés

Certaines propriétés d'API référencent un type énuméré documenté à part (ex: `LuccaIcon`, `BubbleIllustration`) :

`./references/types/<TypeName>.md`

Le lien exact (nom et chemin du type) est donné dans la section « Type definitions » du fichier API du composant. Tous les composants n'ont pas de types partagés.

### Documentation transverse

`./references/documentation/<dossier>/<slug>.md`

### Outils

`./references/tools/<slug>.md`
Slugs : animations, mixins, numbers, scrollbox, utilitaires, angular-api (providers/tokens/pipes/services des packages sans composant, avec leurs dépréciations)

### Migrations (montée de version)

`./references/migrations.md` — codemods de migration (`ng generate @lucca-front/ng:<nom>`) cumulatifs jusqu'à cette version, avec leur version d'introduction.

### Correctifs de patch (fixes/)

`./fixes/<M-m-p>.md` — un fichier par patch publié de la mineure (delta vs le patch précédent : API, types partagés, codemods, sources de stories). Fichiers : `21-3-1.md`.

À consulter quand : le projet est sur un patch **antérieur** à 21.3.1 (les fixes postérieurs à sa version décrivent des correctifs absents de son code), ou pour comprendre ce qu'un patch précis a changé.

### Exemple

Bouton → API : `./references/components/button/button.md`, Figma : `./references/components/button/button.figma.md`

## 3. Quand consulter quoi

| Cas d'usage | Consulter |
|-------------|-----------|
| Écrire du code Angular | API (.md) → Exemples (.component.md) → Changelog |
| Intégrer depuis maquette Figma | Figma (.figma.md) → Tokens → Guidelines dev UI |
| Créer une maquette Figma (Code → Figma) | Figma (.figma.md) → Design (design/_index.md) |
| Review de code | API → Guidelines dev UI → Contenu (si textes) → Patterns (si UX) |
| Conventions de rédaction | Contenu (dossier `content/`) |
| Design patterns | Patterns (dossier `patterns/`) |
| Tokens CSS | Tokens (dossier `tokens/`) |
| Mixins / animations SCSS | Outils (dossier `tools/`) |
| Composant déprécié | `./references/documentation/deprecated/deprecated.md` |
| Monter de version | `./references/migrations.md` + le `<slug>.changelog.md` de chaque composant touché |
| Projet sur un patch antérieur à 21.3.1 / comportement inattendu sur un patch | `./fixes/<M-m-p>.md` |

## 4. Workflow Code

1. Lis l'API du composant (`<slug>.md`) — selectors, inputs, types exacts.
2. Consulte les exemples (`<slug>.component.md`).
3. Vérifie le changelog si comportement inattendu.

⚠️ Ne te fie **jamais** à ta mémoire pour les noms de propriétés ou types. Seul le `.md` fait foi.

## 5. Workflow Code → Figma

1. Lis le fichier Figma (`<slug>.figma.md`) — variantes, node IDs, liens Figma.
2. Utilise les **noms Figma** (pas Angular) pour les propriétés. Ils peuvent différer.
3. Pour les guidelines visuelles → `design/_index.md`.

⚠️ Les `.figma.md` reflètent l'état actuel de Figma.

## 6. Composants

- activity-feed
- animations
- api-select
- app-layout
- avatar
- box
- breadcrumbs
- bubble-icon
- bubble-illustration
- button
- calendar
- calendar2
- callout
- callout-disclosure
- callout-popover
- card
- checkbox
- chip
- clear
- code
- color
- color-input
- color-picker
- comment
- container
- core-select-department
- core-select-establishment
- core-select-job-qualification
- core-select-occupation-category
- core-select-user
- data-presentation
- data-table
- date
- dateinput
- daterangeinput
- departmentselect
- dialog
- divider
- dropdown
- duration-picker
- empty-state
- errorpage
- establishmentselect
- fancy-dialog
- fancybox
- fieldset
- filedropzone
- fileentry
- fileupload
- filterbar
- filterpills
- footer
- form
- form-field
- form-header
- form-label
- gauge
- grid
- highlight-data
- highlight-text
- horizontalnavigation
- icons
- impersonation
- index-table
- inlinemessage
- input-framed
- link
- listbox
- listing
- loading
- main-layout
- mobile-push
- mobileheader
- mobilenavigation
- modal
- multi-select
- multilanguagefield
- newbadge
- number-format-input
- number-input
- numbers
- numericbadge
- onboarding-empty-state
- pageheader
- pagination
- phonenumberfield
- plg-push
- popover
- popover2
- progress-bar
- progress-stepper
- radiofield
- readmore
- resource-card
- richtextinput
- scroll
- scrollbox
- section-empty-state
- segmented-control-tabs
- segmentedcontrol
- select
- select-templating
- sidepanel
- simple-select
- skeleton
- skiplinks
- software-icon
- sortable-list
- statusbadge
- switchfield
- tableofcontent
- tags
- text-flow
- textareafield
- textfield
- tile
- time
- time-picker
- timelines
- title-and-text
- toasts
- tooltip
- treeselect
- user-select
- userpopover
- verticalnavigation

## 7. Documentation transverse

- **Tokens** (dossier `tokens/`) : Couleurs (`couleurs`), Typographie (`typographie`), Espacements (`espacements`), Élévations (`elevations`), Arrondis (`arrondis`), Design tokens (`design-tokens`), Noms de logiciels (`noms-de-logiciels`)
- **Contenu & Rédaction** (dossier `content/`) : Notre voix, 100 % humaine (`voix-humaine`), Règles de ponctuation, de typographie (`ponctuation-typographie`), Grammaire, orthographe (`grammaire-orthographe`), Singulier ou pluriel ? (`singulier-pluriel`), Possessifs et pronoms (`possessifs-pronoms`), Infinitif ou impératif ? (`infinitif-imperatif`), Verbes d'action à utiliser (`verbes-action`), Nombres (`nombres`), Dates (`dates`), Accessibilité (`accessibilite-contenu`), 4 critères essentiels pour notre contenu (`criteres-essentiels`), Blocage sur le contenu ? (`blocage-contenu`), Face au jargon, que faire ? (`jargon`), Ressources pour définitions (`ressources-definitions`), Tester clarté et efficacité du contenu (`tester-clarte`), Messages d'erreur (`messages-erreur`)
- **Guidelines** (dossier `guidelines/`) : Guidelines dev UI (`guidelines-dev-ui`)
- **Design Patterns** (dossier `patterns/`) : Règles d'or (`regles-or`), Identification des pages (`identification-pages`), Card et box (`card-et-box`), Dialogs de confirmation (`dialogs-confirmation`), Actions de suppression (`actions-suppression`), Emails (`emails`), Feedback (`feedback`), Vues, filtres et navigation dans une page (`vues-filtres-navigation`), Structure en accordéon (`structure-accordeon`), Responsive design (`responsive-design`), Pattern IA (`pattern-ia`), Widgets (`widgets`), Parcours de création de ressource (`parcours-creation-ressource`), Conception d'un formulaire (`conception-formulaire`), Gestion des erreurs (`gestion-erreurs-formulaire`), Champs conditionnels (`champs-conditionnels`), Quitter un formulaire (`quitter-formulaire`), Aide contextuelle (`aide-contextuelle`), Champs effaçables (`champs-effacables`), Placeholders (`placeholders`), Modes d'affichage (`modes-affichage`), Traduction d'un formulaire (`traduction-formulaire`), Navigation mobile (`navigation-mobile`), Push Notification mobile (`push-notification-mobile`)

## 8. Composants dépréciés

Consulte `./references/documentation/deprecated/deprecated.md` avant d'utiliser un composant inconnu.
Ne génère **jamais** de code utilisant un composant déprécié — propose son remplacement.
