---
name: lucca-front-migrate-22
description: "Skill de migration vers Lucca Front 22 (breaking release). Charge ce skill pour migrer un projet consommateur de @lucca-front/ng 21.x vers 22.x. Couvre : suppression des palettes dépréciées (.palette-grey→neutral, .palette-primary/secondary→product, .palette-lucca→brand, CSS vars --palettes-* / --colors-*, y compris les cas manuels *-rgb avec color.transparentize et <lu-icon color>), les refactos de composants (SingleFileUpload → lu-file-entry, FileUpload nouvelle taille par défaut, ActivityFeed → lu-activity-feed-update-item, Select panel → ListBox), et la modernisation strict/readonly/signaux. Orchestre les schematics officiels avant de traiter le résiduel non automatisable. Use when migrating a project to lucca-front 22."
---

# lucca-front-migrate-22

Ce skill guide la migration d'un projet **consommateur** de `@lucca-front/ng` de la version **21.x** vers **22.x** (release breaking).

Principe directeur : **les schematics font le mécanique, ce skill fait le résiduel contextuel.** Ne jamais réimplémenter à la main ce qu'un schematic couvre déjà — lancer le schematic, puis traiter uniquement ce qu'il laisse.

Utiliser `TodoWrite` pour suivre les étapes 0 à 7 ci-dessous comme une todo list : chaque étape devient une tâche, marquée `completed` au fur et à mesure — cette migration touche plusieurs fichiers sur plusieurs passes et ne doit pas perdre le fil en cours de route.

---

## Étape 0 — Pré-requis : vérifier la version Angular du projet

Cette migration (Lucca Front 22.x ↔ Angular 22) suppose que le projet consommateur est **déjà sur Angular 22**. Avant de lancer quoi que ce soit :

1. Vérifier la version installée d'`@angular/core` : lire le `package.json` du projet, ou passer par `mcp__angular-cli__list_projects` (découverte du workspace) puis `mcp__angular-cli__get_best_practices` si des questions de compatibilité Angular 22 se posent en cours de route.
2. Si le projet est sur une version d'Angular **antérieure à 22** : **arrêter immédiatement le skill, ne pas exécuter la suite.**
	- Ne lancer aucun schematic (ni `@lucca-front/ng:palettes`, ni les schematics Angular type `signal-input-migration`) — ils ne sont pas garantis compatibles et pourraient corrompre le projet.
	- Informer l'utilisateur que ce skill ne s'applique pas tant que le projet n'est pas sur Angular 22, et lui conseiller de traiter d'abord, de son côté, la migration Angular vers la version 22 (`ng update @angular/core@22 @angular/cli@22`).
	- Ne pas proposer d'assister sur cette migration Angular dans le cadre de ce skill — ce n'est pas son périmètre. Inviter l'utilisateur à relancer ce skill une fois la migration Angular 22 effectuée.
3. Si le projet est déjà sur Angular 22, poursuivre normalement à l'Étape 1.

---

## Étape 1 — Orchestration des schematics (optionnelle, mais à faire en premier si retenue)

Les schematics couvrent le gros du remplacement palettes de façon fiable et testée. Mais **ne pas les lancer d'office** : certaines équipes préfèrent isoler ce diff (souvent volumineux et purement mécanique) dans une **PR dédiée**, séparée du reste de la migration.

**Demander donc explicitement à l'utilisateur** — via `AskUserQuestion` — s'il veut que le schematic `palettes` soit joué maintenant. Dans la question, préciser :

- que LF 22 **remplace des palettes** : `.palette-grey` → `.palette-neutral`, `.palette-primary`/`.palette-secondary` → `.palette-product`, `.palette-lucca` → `.palette-brand`, ainsi que les CSS vars `--palettes-*` / `--colors-grey|white|black` correspondantes, les utilitaires `u-text*`/`pr-u-*`, `.mod-grey`, `.icon-color-*` et l'input `<lu-icon color="primary|secondary">` ;
- que le schematic modifie HTML + SCSS + templates sur potentiellement beaucoup de fichiers ;
- les deux réponses possibles : **Oui** (lancer maintenant) / **Non** (laisser pour une PR à part).

Selon la réponse :

- **Oui** → lancer le schematic via l'outil Bash, puis poursuivre :

  ```bash
  # Palettes : classes .palette-*, .mod-grey, .icon-color-*, utilitaires u-text*/pr-u-*,
  # et CSS vars --palettes-* / --colors-grey|white|black. HTML + SCSS.
  ng g @lucca-front/ng:palettes
  ```

- **Non** → **ne rien lancer**, ne pas refaire à la main le travail du schematic, et **passer directement à l'Étape 2**. Signaler dans le rapport final (Étape 7) que le remplacement des palettes reste à faire dans une PR dédiée via `ng g @lucca-front/ng:palettes`.

Une fois les schematics passés, il reste les cas ci-dessous que les schematics **ne couvrent pas**.

---

## Étape 2 — Analyse du résiduel

**Étape de détection uniquement : ne rien corriger ici.** Le but est de faire *un seul* passage de recherche sur le projet, puis de router chaque occurrence vers l'étape qui la traite — et de savoir à l'avance quelles étapes sont vides (à marquer `completed` sans les ouvrir).

Privilégier `Grep`/`Glob` pour des recherches ciblées ; pour un projet volumineux ou une recherche exploratoire (motifs multiples, conventions de nommage variées), déléguer le scan à un agent `Explore` plutôt que d'enchaîner les recherches une par une.

### Table de routage

| Motif détecté | Traité à l'étape |
|---|---|
| CSS vars `*-rgb` résiduelles dans les `.scss`/`.css` (`--colors-grey-*-rgb`, `--colors-neutral-*-rgb`, `--colors-white-rgb`) | Étape 3 |
| `<lu-icon>` avec input `color` — **à ne chercher que si le schematic `palettes` a été refusé à l'Étape 1** (sinon déjà traité) | Étape 3 |
| Usages de `lu-single-file-upload` / `lu-multi-file-upload` | Étape 4 |
| Usages de `lu-activity-feed-update` | Étape 4 |
| Usages de `lu-simple-select` / `lu-multi-select`, et overrides SCSS de `.optionItem` et enfants | Étape 4 |
| Accès TS aux composants/refs LF : réassignation de propriété, lecture/écriture d'un input, `ngOnChanges`, mutation d'un tableau/objet reçu (`.push()`/`.sort()`, champ imbriqué, `Object.assign`) — y compris les cas que le compilateur ne bloque pas | Étape 5 |
| Classes héritant de LF (`ALuInput`, `ALuSelectInputComponent`, `ILuDateAdapter`…), `.instance` de dialog, `state="null"` sur `lu-progress-bar` | Étape 5 |

Restituer le résultat du scan sous forme de comptage par ligne (occurrences + fichiers) avant d'attaquer l'Étape 3 : c'est ce comptage qui alimente le rapport final (Étape 7).

---

## Étape 3 — Résiduel palettes

Traiter les cas de [Palettes.md](./references/Palettes.md) :

- **Vars `*-rgb`** : remplacer par la palette neutre correspondante, en enveloppant avec `color.transparentize` **si et seulement si** une opacité était appliquée via `rgba(...)`. Ne **jamais** remplacer aveuglément.

- **`<lu-icon color="primary|secondary">`** : rien à faire si le schematic `palettes` a été lancé (il le couvre, statique et bound). S'il a été refusé à l'Étape 1, **ne pas le migrer à la main** : ce cas fait partie du périmètre de la PR dédiée aux palettes.

---

## Étape 4 — Refactos de composants

Appliquer chaque migration en suivant son fichier de référence :

- [FileUpload.md](./references/FileUpload.md) — `SingleFileUpload` (gestion de `FileEntry` via `lu-file-entry`) + nouvelle taille par défaut.
- [ActivityFeed.md](./references/ActivityFeed.md) — niveau intermédiaire `lu-activity-feed-update-item`.
- [SelectListBox.md](./references/SelectListBox.md) — panel des Select passé à `ListBox`, overrides `.optionItem*`.

---

## Étape 5 — Modernisation strict / readonly / signaux

- **Usage standard** (bindings dans le template) : montée quasi transparente, les schematics Angular s'en chargent.
- **Usage détourné** (accès TS, refs, pilotage impératif, sous-classement) : trois références selon l'axe, ci-dessous.
- **Strict / API nullable** : les `.d.ts` de LF 22 sont émis avec `strictNullChecks` → [Strict.md](./references/Strict.md) (signatures élargies, ordre d'activation des flags, **changements de comportement silencieux** qui ne produisent aucune erreur de compilation).
- **Propriétés `readonly`** : les propriétés de classe LF ne sont plus réassignables → [Readonly.md](./references/Readonly.md) (ce qui casse, les remèdes, et le critère pour retirer un `readonly` côté LF).
- **Inputs / outputs / refs en signaux** : inventaire des membres convertis, renommés ou supprimés par entrypoint → [Signal.md](./references/Signal.md).
- Si un blocage nécessite un arbitrage qui dépasse le résiduel documenté (ex. retirer un `readonly` côté composant LF), ne pas trancher seul : utiliser `AskUserQuestion` pour présenter les options à l'utilisateur plutôt que de contourner localement (`as any`, etc.).

---

## Étape 6 — Validation

1. Lancer `ng build` (ou `tsc --noEmit`) via Bash pour vérifier la compilation.
2. Consulter les `scripts` du `package.json` du projet consommateur et lancer ceux pertinents pour valider la migration (build, lint, tests unitaires, tests e2e/Storybook…) — ne pas se limiter à `ng build` si d'autres commandes de vérification existent.

---

## Étape 7 — Reporting

Produire un rapport structuré :

- **Migrations automatiques** (schematics lancés, fichiers modifiés) — et, si le schematic `palettes` a été refusé à l'Étape 1, le rappeler explicitement comme reste à faire dans une PR dédiée.
- **Migrations manuelles réalisées** (résiduel palettes, refactos composants).
- **Cas nécessitant une décision humaine** : `*-rgb` avec opacité, overrides `.optionItem` complexes, usages détournés en TS.
- **Récapitulatif** : nombre d'occurrences par catégorie, fichiers touchés.
