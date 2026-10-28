---
name: lucca-front
description: >
  Design system Lucca Front / Prisme (Angular) : API et exemples des composants, changelog, codemods de migration,
  variantes Figma, tokens CSS, guidelines de design et de rédaction. À charger pour tout fichier d'un projet qui dépend de @lucca-front/ng ou @lucca-front/scss,
  ou contenant des sélecteurs lu-*, pr-* ou des directives commençant par 'lu' (ex: luButton, luTooltip, luForm), et pour intégrer ou créer une maquette Figma Prisme.
---

# Design System Prisme — Lucca Front

**RÈGLE** : Avant toute génération ou modification de code impliquant `lu-*`, `luX` ou `pr-*`, consulte la documentation du composant ci-dessous. Sans cette consultation, toute réponse est invalide.

## 1. Version

Cette documentation ne porte pas de numéro de version : elle est régénérée à chaque modification du code de lucca-front, et chaque version de `@lucca-front/ng` la livre dans `node_modules/@lucca-front/ng/llms/`. Elle décrit le code de cette version : l'API d'un composant est à jour, mais sa section `## Changelog` s'arrête au tag précédent (dans le package `X.Y.0`, elle ne liste pas encore `X.Y.0`).

**Détecte la version de `@lucca-front/ng` installée** (ne la suppose jamais) :

1. en priorité `node_modules/@lucca-front/ng/package.json` → champ `version` ;
2. à défaut, la dépendance `@lucca-front/ng` (ou `@lucca-front/scss`) dans le `package.json` du projet.

Elle sert à ouvrir le Storybook : les liens sont écrits `https://lucca-front.lucca.io/v{version}/storybook/…`. Remplace `{version}` par la version détectée avant de les suivre.

Lue dans le `node_modules` du projet, elle correspond toujours au package installé. Lue ailleurs (dépôt lucca-front, Storybook d'une autre version), signale en une ligne si la mineure installée diffère et continue : la documentation peut décrire une API que le projet n'a pas encore, ou plus.

## 2. Chemins

Compose le chemin du fichier à partir du slug du composant. **Ne devine jamais un chemin** : seuls les fichiers réellement présents font foi. Si un chemin composé n'existe pas, ne le remplace pas par une supposition — vérifie le slug dans la liste §6.

### Composant `<slug>`

| Fichier | Chemin |
|---------|--------|
| API Angular + Changelog | `./references/components/<slug>/<slug>.md` |
| Exemples (Angular + HTML, stories incluses) | `./references/components/<slug>/<slug>.component.md` |
| Design (do/don't, usage) | `./references/components/<slug>/<slug>.design.md` |
| Figma (variantes, node IDs) | `./references/components/<slug>/<slug>.figma.md` |

Le changelog du composant est la **dernière section `## Changelog`** du fichier API `<slug>.md` (diff structurel cumulatif + notes de release).

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

`./references/migrations.md` — codemods de migration (`ng generate @lucca-front/ng:<nom>`) cumulatifs, avec leur version d'introduction.

### Exemple

Bouton → API : `./references/components/button/button.md`, Figma : `./references/components/button/button.figma.md`

## 3. Quand consulter quoi

| Cas d'usage | Consulter |
|-------------|-----------|
| Écrire du code Angular | API (.md) → Exemples (.component.md) → section `## Changelog` du .md |
| Intégrer depuis maquette Figma | Figma (.figma.md) → Tokens → Guidelines dev UI |
| Créer une maquette Figma (Code → Figma) | Figma (.figma.md) → Design (`<slug>.design.md`) |
| Review de code | API → Guidelines dev UI → Contenu (si textes) → Patterns (si UX) |
| Conventions de rédaction | Contenu (dossier `content/`) |
| Design patterns | Patterns (dossier `patterns/`) |
| Tokens CSS | Tokens (dossier `tokens/`) |
| Mixins / animations SCSS | Outils (dossier `tools/`) |
| Composant déprécié | `./references/documentation/deprecated/deprecated.md` |
| Monter de version | `./references/migrations.md` + la section `## Changelog` du `<slug>.md` de chaque composant touché |

## 4. Workflow Code

1. Lis l'API du composant (`<slug>.md`) — selectors, inputs, types exacts.
2. Consulte les exemples (`<slug>.component.md`) — chaque story est une section `###`.
3. Vérifie la section `## Changelog` (fin du `<slug>.md`) si comportement inattendu.

⚠️ Ne te fie **jamais** à ta mémoire pour les noms de propriétés ou types. Seul le `.md` fait foi.

## 5. Workflow Code → Figma

1. Lis le fichier Figma (`<slug>.figma.md`) — variantes, node IDs, liens Figma.
2. Utilise les **noms Figma** (pas Angular) pour les propriétés. Ils peuvent différer.
3. Pour les guidelines visuelles → `<slug>.design.md`.

⚠️ Les `.figma.md` reflètent l'état actuel de Figma.

## 6. Composants

- activity-feed
- animations
- api-select
- app-layout
- approbation-inbox
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
- highlight-section
- highlight-text
- horizontalnavigation
- icons
- impersonation
- index-table
- inlinemessage
- input-framed
- kbd
- link
- listbox
- listing
- loading
- main-layout
- markdown
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
- priority-levels
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

- **Tokens** (dossier `tokens/`) : Couleurs (`couleurs`), Typographie (`typographie`), Espacements (`espacements`), Élévations (`elevations`), Arrondis (`arrondis`), Design tokens (`design-tokens`), Noms des logiciels (`noms-de-logiciels`)
- **Contenu & Rédaction** (dossier `content/`) : Notre voix, 100 % humaine (`voix-humaine`), Règles de ponctuation, de typographie (`ponctuation-typographie`), Grammaire, orthographe (`grammaire-orthographe`), Singulier ou pluriel ? (`singulier-pluriel`), Possessifs « mon, ma, mes, votre, vos » et pronoms « je, vous » (`possessifs-pronoms`), Infinitif ou impératif ? (`infinitif-imperatif`), Verbes d'action à utiliser (`verbes-action`), Nombres (`nombres`), Dates (`dates`), Accessibilité (`accessibilite-contenu`), 4 critères essentiels pour notre contenu (`criteres-essentiels`), Blocage sur le contenu ? (`blocage-contenu`), Face au jargon, que faire ? (`jargon`), Ressources pour définitions (`ressources-definitions`), Tester clarté et efficacité du contenu (`tester-clarte`), Messages d'erreur (`messages-erreur`)
- **Guidelines** (dossier `guidelines/`) : Guidelines dev UI (`guidelines-dev-ui`)
- **Design Patterns** (dossier `patterns/`) : Nos 10 principes Design (`regles-or`), Identification des pages (`identification-pages`), Card et box (`card-et-box`), Dialogs de confirmation (`dialogs-confirmation`), Actions de suppression (`actions-suppression`), Emails (`emails`), Feedback (`feedback`), Vues, filtres et navigation dans une page (`vues-filtres-navigation`), Structure en accordéon (`structure-accordeon`), Responsive design (`responsive-design`), Pattern IA (`pattern-ia`), Widgets (`widgets`), Cycle de vie d'une ressource (`cycle-vie-ressource`), Parcours de création de ressource : avec action de diffusion (`parcours-creation-ressource`), Parcours de création de ressource : sans action de diffusion (`parcours-creation-ressource-sans-diffusion`), Conception d'un formulaire (`conception-formulaire`), Gestion des erreurs (`gestion-erreurs-formulaire`), Champs conditionnels (`champs-conditionnels`), Quitter un formulaire (`quitter-formulaire`), Aide contextuelle (`aide-contextuelle`), Champs effaçables (`champs-effacables`), Placeholders (`placeholders`), Modes d’affichage (`modes-affichage`), Traduction d'un formulaire (`traduction-formulaire`), Navigation mobile (`navigation-mobile`), Push Notification mobile (`push-notification-mobile`)

## 8. Composants dépréciés

Consulte `./references/documentation/deprecated/deprecated.md` avant d'utiliser un composant inconnu.
Ne génère **jamais** de code utilisant un composant déprécié — propose son remplacement.
