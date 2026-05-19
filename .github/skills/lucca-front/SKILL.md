---
name: lucca-front
description: >
  Design system Lucca Front / Prisme (Angular). À charger pour tout fichier d'un projet qui dépend de @lucca-front/ng ou @lucca-front/scss,
  ou contenant des sélecteurs lu-*, pr-* ou des directives commençant par 'lu' (ex: luButton, luTooltip, luForm).
---

# Design System Prisme — Lucca Front

**RÈGLE** : Avant toute génération ou modification de code impliquant `lu-*`, `luX` ou `pr-*`, consulte la documentation versionnée du composant. Sans cette consultation, toute réponse est invalide.

## 1. Version

1. Lis `package.json` → dépendance `@lucca-front/ng` (ou `@lucca-front/scss`) → ex: `21.2.1`.
2. **Composants, stories, outils** → version fix exacte : `v21.2.1`.
3. **Documentation transverse** (tokens, contenu, guidelines, patterns) → version mineure : `v21.2`.

Versions disponibles : v21.2.2, v21.2.1, v21.2.0, v21.1.4, v21.1.3, v21.1.2, v21.1.1, v21.1.0, v21.0.5, v21.0.4, v21.0.3, v21.0.2, v21.0.1, v21.0.0

Si la version ne peut pas être déterminée → s'arrêter et demander à l'utilisateur. Ne jamais supposer une version par défaut.

## 2. Chemins

Compose l'URL du fichier à partir du slug et de la version détectée.

### Composant `<slug>` (version fix)

| Fichier | Chemin |
|---------|--------|
| API Angular | `./references/components/<slug>/v<M>.<m>.<p>/<slug>.md` |
| Exemples (Angular + HTML) | `./references/components/<slug>/v<M>.<m>.<p>/<slug>.component.md` |
| Design (do/don't, usage) | `./references/components/<slug>/v<M>.<m>.<p>/design/_index.md` |
| Figma (variantes, node IDs) | `./references/components/<slug>/<slug>.figma.md` |
| Changelog | `./references/components/<slug>/<slug>.changelog.md` |

### Documentation transverse (version mineure)

`./references/documentation/<dossier>/v<M>.<m>/<slug>.md`

### Outils (version mineure)

`./references/tools/v<M>.<m>/<slug>.md`
Slugs : animations, mixins, numbers, scrollbox, utilitaires

### Exemple

Bouton en v21.2.1 → API : `./references/components/button/v21.2.1/button.md`, Figma : `./references/components/button/button.figma.md`

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
| Composant déprécié | `./references/documentation/deprecated/v<M>.<m>/deprecated.md` |

## 4. Workflow Code

1. Détecte la version (§1).
2. Lis l'API du composant (`<slug>.md`) — selectors, inputs, types exacts.
3. Consulte les exemples (`<slug>.component.md`).
4. Vérifie le changelog si comportement inattendu.

⚠️ Ne te fie **jamais** à ta mémoire pour les noms de propriétés ou types. Seul le `.md` versionné fait foi.

## 5. Workflow Code → Figma

1. Lis le fichier Figma (`<slug>.figma.md`) — variantes, node IDs, liens Figma.
2. Utilise les **noms Figma** (pas Angular) pour les propriétés. Ils peuvent différer.
3. Pour les guidelines visuelles → `design/_index.md`.

⚠️ Les `.figma.md` ne sont pas versionnés — ils reflètent l'état actuel de Figma.

## 6. Composants

- **Actions** : button, link
- **Feedback** : callout, callout-disclosure, callout-popover, empty-state, errorpage, mobile-push, plg-push
- **File** : fileentry, fileupload
- **Formulaires** : calendar, checkbox, color-picker, data-presentation, date, dateinput, daterangeinput, duration-picker, fieldset, filterbar, filterpills, form-field, form-label, inlinemessage, input-framed, multi-select, multilanguagefield, phonenumberfield, radiofield, richtextinput, select, simple-select, switchfield, textareafield, textfield, time-picker, treeselect
- **Listes** : activity-feed, card, chip, data-table, index-table, listing, sortable-list, timelines
- **Loaders** : gauge, loading, progress-bar, skeleton
- **Navigation** : breadcrumbs, horizontalnavigation, mobilenavigation, pagination, segmentedcontrol, sidepanel, skiplinks, tableofcontent, verticalnavigation
- **Overlays** : dialog, dropdown, modal, popover, popover2, toasts, tooltip
- **Progress stepper** : progress-stepper
- **Structure** : app-layout, box, bubble-icon, bubble-illustration, container, divider, fancybox, footer, highlight-data, main-layout, mobileheader, pageheader, resource-card, scrollbox, software-icon
- **Textes** : clear, code, comment, icons, newbadge, numericbadge, readmore, statusbadge, tags, text-flow
- **Toolbox** : animations, numbers
- **Unknown** : fancy-dialog, grid, listbox, onboarding-empty-state, section-empty-state, title-and-text
- **Users** : avatar, tile, userpopover

## 7. Documentation transverse

- **Tokens** (dossier `tokens/`) : Couleurs (`couleurs`), Typographie (`typographie`), Espacements (`espacements`), Élévations (`elevations`), Arrondis (`arrondis`), Design tokens (`design-tokens`), Noms de logiciels (`noms-de-logiciels`)
- **Contenu & Rédaction** (dossier `content/`) : Notre voix, 100 % humaine (`voix-humaine`), Règles de ponctuation, de typographie (`ponctuation-typographie`), Grammaire, orthographe (`grammaire-orthographe`), Singulier ou pluriel ? (`singulier-pluriel`), Possessifs et pronoms (`possessifs-pronoms`), Infinitif ou impératif ? (`infinitif-imperatif`), Verbes d'action à utiliser (`verbes-action`), Nombres (`nombres`), Dates (`dates`), Accessibilité (`accessibilite-contenu`), 4 critères essentiels pour notre contenu (`criteres-essentiels`), Blocage sur le contenu ? (`blocage-contenu`), Face au jargon, que faire ? (`jargon`), Ressources pour définitions (`ressources-definitions`), Tester clarté et efficacité du contenu (`tester-clarte`), Messages d'erreur (`messages-erreur`)
- **Guidelines** (dossier `guidelines/`) : Guidelines dev UI (`guidelines-dev-ui`)
- **Design Patterns** (dossier `patterns/`) : Règles d'or (`regles-or`), Identification des pages (`identification-pages`), Card et box (`card-et-box`), Dialogs de confirmation (`dialogs-confirmation`), Actions de suppression (`actions-suppression`), Emails (`emails`), Feedback (`feedback`), Vues, filtres et navigation dans une page (`vues-filtres-navigation`), Structure en accordéon (`structure-accordeon`), Responsive design (`responsive-design`), Pattern IA (`pattern-ia`), Widgets (`widgets`), Parcours de création de ressource (`parcours-creation-ressource`), Conception d'un formulaire (`conception-formulaire`), Gestion des erreurs (`gestion-erreurs-formulaire`), Champs conditionnels (`champs-conditionnels`), Quitter un formulaire (`quitter-formulaire`), Aide contextuelle (`aide-contextuelle`), Champs effaçables (`champs-effacables`), Placeholders (`placeholders`), Modes d'affichage (`modes-affichage`), Traduction d'un formulaire (`traduction-formulaire`), Navigation mobile (`navigation-mobile`), Push Notification mobile (`push-notification-mobile`)

## 8. Composants dépréciés

Consulte `./references/documentation/deprecated/v<M>.<m>/deprecated.md` avant d'utiliser un composant inconnu.
Ne génère **jamais** de code utilisant un composant déprécié — propose son remplacement.
