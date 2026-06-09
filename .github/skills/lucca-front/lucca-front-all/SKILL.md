---
name: lucca-front-all
description: >
  Design system Lucca Front / Prisme (Angular) — toutes versions. À charger pour tout fichier d'un projet qui dépend de @lucca-front/ng ou @lucca-front/scss,
  ou contenant des sélecteurs lu-*, pr-* ou des directives commençant par 'lu' (ex: luButton, luTooltip, luForm).
---

# Design System Prisme — Lucca Front (toutes versions)

**RÈGLE** : Avant toute génération ou modification de code impliquant `lu-*`, `luX` ou `pr-*`, détecte la version du projet (§1) puis consulte la documentation **de cette version**. Sans cette consultation, toute réponse est invalide.

## 1. Version

1. Lis la version de `@lucca-front/ng` installée :
   - en priorité `node_modules/@lucca-front/ng/package.json` → champ `version` (version résolue exacte) ;
   - à défaut, la dépendance `@lucca-front/ng` (ou `@lucca-front/scss`) dans le `package.json` du projet (ex: `^21.2.1` → `21.2.1`).
2. Le segment de version est ce numéro (ex: `21.2.1`). Tous les chemins ci-dessous en dépendent.
3. Si la version exacte est absente de la liste, prends le **plus haut patch disponible ≤** la version installée, **dans la même mineure**.

**Versions disponibles** : 21.2.4, 21.2.2, 21.2.1, 21.2.0, 21.1.4, 21.1.3, 21.1.2, 21.1.1, 21.1.0, 21.0.5, 21.0.4, 21.0.3, 21.0.2, 21.0.1, 21.0.0

Si la version ne peut pas être déterminée → **s'arrêter et demander à l'utilisateur**. Ne jamais supposer une version par défaut.

## 2. Chemins

Compose le chemin à partir du slug du composant et de la version détectée (`<version>` = ex: `21.2.1`).
**Ne devine jamais un chemin** : seuls les fichiers réellement présents font foi. Si un chemin composé n'existe pas, vérifie le slug (§6) et la version (§1) — un composant peut ne pas exister dans toutes les versions.

### Composant `<slug>`

| Fichier | Chemin |
|---------|--------|
| API Angular | `./references/<version>/components/<slug>/<slug>.md` |
| Exemples (Angular + HTML) | `./references/<version>/components/<slug>/<slug>.component.md` |
| Design (do/don't, usage) | `./references/<version>/components/<slug>/design/_index.md` |
| Figma (variantes, node IDs) | `./references/<version>/components/<slug>/<slug>.figma.md` |
| Changelog | `./references/<version>/components/<slug>/<slug>.changelog.md` |

### Types partagés

Certaines propriétés d'API référencent un type énuméré documenté à part (ex: `LuccaIcon`, `BubbleIllustration`) :

`./references/<version>/types/<TypeName>.md`

Le lien exact (nom et chemin du type) est donné dans la section « Type definitions » du fichier API du composant. Tous les composants n'ont pas de types partagés.

### Documentation transverse

`./references/<version>/documentation/<dossier>/<slug>.md`

### Outils

`./references/<version>/tools/<slug>.md`
Slugs : animations, mixins, numbers, scrollbox, utilitaires

### Migrations (montée de version)

`./references/<version>/migrations.md` — migrations `ng update` cumulatives jusqu'à cette version.

### Exemple

Projet en `21.2.4`, bouton → API : `./references/21.2.4/components/button/button.md`, Figma : `./references/21.2.4/components/button/button.figma.md`

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
| Composant déprécié | `./references/<version>/documentation/deprecated/deprecated.md` |
| Monter de version | `./references/<version>/migrations.md` + le `<slug>.changelog.md` de chaque composant touché |

## 4. Workflow Code

1. Détecte la version (§1).
2. Lis l'API du composant (`<slug>.md`) — selectors, inputs, types exacts.
3. Consulte les exemples (`<slug>.component.md`).
4. Vérifie le changelog si comportement inattendu.

⚠️ Ne te fie **jamais** à ta mémoire pour les noms de propriétés ou types. Seul le `.md` fait foi.

## 5. Workflow Code → Figma

1. Lis le fichier Figma (`<slug>.figma.md`) — variantes, node IDs, liens Figma.
2. Utilise les **noms Figma** (pas Angular) pour les propriétés. Ils peuvent différer.
3. Pour les guidelines visuelles → `design/_index.md`.

⚠️ Les `.figma.md` reflètent l'état actuel de Figma.

## 6. Composants

Liste consolidée toutes versions. Un composant peut ne pas exister dans la version détectée — seul le fichier réellement présent fait foi (§2).

- activity-feed
- animations
- app-layout
- avatar
- box
- breadcrumbs
- bubble-icon
- bubble-illustration
- button
- calendar
- callout
- callout-disclosure
- callout-popover
- card
- checkbox
- chip
- clear
- code
- color-picker
- colorpicker
- comment
- container
- data-presentation
- data-table
- date
- dateinput
- daterangeinput
- dialog
- divider
- dropdown
- duration-picker
- empty-state
- errorpage
- fancy-dialog
- fancybox
- fieldset
- fileentry
- fileupload
- filterbar
- filterpills
- footer
- form-field
- form-label
- gauge
- grid
- highlight-data
- horizontalnavigation
- icons
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
- scrollbox
- section-empty-state
- segmentedcontrol
- select
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
- time-picker
- timelines
- title-and-text
- toasts
- tooltip
- treeselect
- userpopover
- verticalnavigation
## 7. Documentation transverse

- **Tokens** (dossier `tokens/`) : Couleurs (`couleurs`), Typographie (`typographie`), Espacements (`espacements`), Élévations (`elevations`), Arrondis (`arrondis`), Design tokens (`design-tokens`), Noms de logiciels (`noms-de-logiciels`)
- **Contenu & Rédaction** (dossier `content/`) : Notre voix, 100 % humaine (`voix-humaine`), Règles de ponctuation, de typographie (`ponctuation-typographie`), Grammaire, orthographe (`grammaire-orthographe`), Singulier ou pluriel ? (`singulier-pluriel`), Possessifs et pronoms (`possessifs-pronoms`), Infinitif ou impératif ? (`infinitif-imperatif`), Verbes d'action à utiliser (`verbes-action`), Nombres (`nombres`), Dates (`dates`), Accessibilité (`accessibilite-contenu`), 4 critères essentiels pour notre contenu (`criteres-essentiels`), Blocage sur le contenu ? (`blocage-contenu`), Face au jargon, que faire ? (`jargon`), Ressources pour définitions (`ressources-definitions`), Tester clarté et efficacité du contenu (`tester-clarte`), Messages d'erreur (`messages-erreur`)
- **Guidelines** (dossier `guidelines/`) : Guidelines dev UI (`guidelines-dev-ui`)
- **Design Patterns** (dossier `patterns/`) : Règles d'or (`regles-or`), Identification des pages (`identification-pages`), Card et box (`card-et-box`), Dialogs de confirmation (`dialogs-confirmation`), Actions de suppression (`actions-suppression`), Emails (`emails`), Feedback (`feedback`), Vues, filtres et navigation dans une page (`vues-filtres-navigation`), Structure en accordéon (`structure-accordeon`), Responsive design (`responsive-design`), Pattern IA (`pattern-ia`), Widgets (`widgets`), Parcours de création de ressource (`parcours-creation-ressource`), Conception d'un formulaire (`conception-formulaire`), Gestion des erreurs (`gestion-erreurs-formulaire`), Champs conditionnels (`champs-conditionnels`), Quitter un formulaire (`quitter-formulaire`), Aide contextuelle (`aide-contextuelle`), Champs effaçables (`champs-effacables`), Placeholders (`placeholders`), Modes d'affichage (`modes-affichage`), Traduction d'un formulaire (`traduction-formulaire`), Navigation mobile (`navigation-mobile`), Push Notification mobile (`push-notification-mobile`)
## 8. Composants dépréciés

Consulte `./references/<version>/documentation/deprecated/deprecated.md` avant d'utiliser un composant inconnu.
Ne génère **jamais** de code utilisant un composant déprécié — propose son remplacement.
