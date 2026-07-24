---
name: lucca-front-all
description: >
  Design system Lucca Front / Prisme (Angular) — toutes versions. À charger pour tout fichier d'un projet qui dépend de @lucca-front/ng ou @lucca-front/scss,
  ou contenant des sélecteurs lu-*, pr-* ou des directives commençant par 'lu' (ex: luButton, luTooltip, luForm).
---

# Design System Prisme — Lucca Front (toutes versions)

**RÈGLE** : Avant toute génération ou modification de code impliquant `lu-*`, `luX` ou `pr-*`, détecte la version du projet (§1) puis consulte la documentation **de cette version** en suivant la résolution §2. Sans cette consultation, toute réponse est invalide.

## 1. Version

1. Lis la version de `@lucca-front/ng` installée :
   - en priorité `node_modules/@lucca-front/ng/package.json` → champ `version` (version résolue exacte, ex: `21.2.1`) ;
   - à défaut, la dépendance `@lucca-front/ng` (ou `@lucca-front/scss`) dans le `package.json` du projet (ex: `^21.2.1` → `21.2.1`).
2. Décompose : **majeure** (`21`), **mineure** (`21.2`), **patch** (`21.2.1`).

- **Majeure 21** (`./references/21/`) : base = 21.3 (contenu du patch 21.3.1) ; overrides : 21.2 → `minors/21-2/`, 21.1 → `minors/21-1/`, 21.0 → `minors/21-0/`

Si la version ne peut pas être déterminée → **s'arrêter et demander à l'utilisateur**. Ne jamais supposer une version par défaut.

**Contrôle de cohérence (anti-péremption).** La version détectée doit être couverte par la liste ci-dessus. Dans chacun de ces cas, **arrête-toi et demande à l'utilisateur** — ne suppose jamais, ne code pas :

- la **majeure** détectée n'apparaît pas ci-dessus (ex: projet monté en majeure supérieure alors que la skill n'a pas été mise à jour) ;
- la **mineure** détectée est plus récente que la base de sa majeure (mineure publiée après cette skill → non documentée) ;
- le **patch** détecté est **postérieur** au dernier patch connu de sa mineure (le dernier patch de la base est indiqué ci-dessus ; celui d'une mineure antérieure dans son `_manifest.md` → skill périmée, l'API réelle peut différer).

## 2. Résolution des chemins

Le dossier `./references/<majeure>/` contient la documentation complète de la **base** (la mineure la plus récente de la majeure). Les mineures antérieures sont des dossiers d'**overrides** : `./references/<majeure>/minors/<M-m>/`.

### Projet sur la mineure de base

Lis directement `./references/<majeure>/<chemin>` (table des chemins §3).

### Projet sur une mineure antérieure

1. Lis `./references/<majeure>/minors/<M-m>/_manifest.md` (dernier patch de la mineure, règle URL, composants à ne pas utiliser).
2. Pour **chaque fichier** : lis d'abord `./references/<majeure>/minors/<M-m>/<chemin>` ; s'il n'existe pas, lis `./references/<majeure>/<chemin>` (contenu identique pour cette mineure, aux URLs Storybook près — appliquer la règle URL du manifeste).
3. **Changelogs (`<slug>.changelog.md`) et `migrations.md`** : toujours ceux de la base — cumulatifs, entrées étiquetées par version. **Ignore les entrées postérieures à la version du projet.**
4. **Ne jamais utiliser** un composant listé « absent de cette mineure » dans le manifeste.

### Patch antérieur au dernier patch de la mineure

La doc reflète le **dernier patch publié** de la mineure. Si le patch du projet est antérieur, les correctifs livrés entre les deux sont décrits dans `fixes/<M-m-p>.md` (dans `./references/<majeure>/fixes/` pour la base, dans `minors/<M-m>/fixes/` pour une mineure antérieure) — ils ne sont **pas** dans le code du projet.

## 3. Chemins (relatifs à `./references/<majeure>/` ou à `minors/<M-m>/` selon §2)

| Fichier | Chemin |
|---------|--------|
| API Angular | `components/<slug>/<slug>.md` |
| Exemples (Angular + HTML) | `components/<slug>/<slug>.component.md` |
| Design (do/don't, usage) | `components/<slug>/design/_index.md` |
| Figma (variantes, node IDs) | `components/<slug>/<slug>.figma.md` |
| Changelog | `components/<slug>/<slug>.changelog.md` |
| Types partagés | `types/<TypeName>.md` |
| Documentation transverse | `documentation/<dossier>/<slug>.md` |
| Outils | `tools/<slug>.md` (animations, mixins, numbers, scrollbox, utilitaires, angular-api) |
| Migrations | `migrations.md` |
| Correctifs de patch | `fixes/<M-m-p>.md` |

**Ne devine jamais un chemin** : seuls les fichiers réellement présents font foi. Si un chemin composé n'existe pas, vérifie le slug (§6) et la résolution (§2) — un composant peut ne pas exister dans toutes les versions.

### Exemple

Projet en `21.2.5` (mineure 21.2, base = 21.3), bouton → `./references/21/minors/21-2/components/button/button.md` s'il existe, sinon `./references/21/components/button/button.md`.

## 4. Quand consulter quoi

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
| Composant déprécié | `documentation/deprecated/deprecated.md` |
| Monter de version | `migrations.md` + le `<slug>.changelog.md` de chaque composant touché |
| Projet sur un patch antérieur au dernier de sa mineure | `fixes/<M-m-p>.md` |

## 5. Workflows

**Code** : détecte la version (§1) → résous les chemins (§2) → API (`<slug>.md`) → exemples (`<slug>.component.md`) → changelog si comportement inattendu.
⚠️ Ne te fie **jamais** à ta mémoire pour les noms de propriétés ou types. Seul le `.md` fait foi.

**Code → Figma** : `<slug>.figma.md` (variantes, node IDs — utilise les noms **Figma**, pas Angular) → `design/_index.md` pour les guidelines visuelles.
⚠️ Les `.figma.md` reflètent l'état actuel de Figma.

## 6. Composants

Liste consolidée toutes versions. Un composant peut ne pas exister dans la version détectée — seul le fichier réellement présent fait foi (§2).

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

Consulte `documentation/deprecated/deprecated.md` (résolution §2) avant d'utiliser un composant inconnu.
Ne génère **jamais** de code utilisant un composant déprécié — propose son remplacement.
