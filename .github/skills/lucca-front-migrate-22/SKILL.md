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

## Étape 1 — Orchestration des schematics (à faire en premier)

Lancer les schematics officiels **avant** toute retouche manuelle, via l'outil Bash. Ils couvrent le gros du remplacement palettes de façon fiable et testée.

```bash
# Palettes : classes .palette-*, .mod-grey, .icon-color-*, utilitaires u-text*/pr-u-*,
# et CSS vars --palettes-* / --colors-grey|white|black. HTML + SCSS.
ng g @lucca-front/ng:palettes
```

Puis, si le projet monte aussi la modernisation Angular (voir Étape 5), les schematics Angular officiels dans **cet ordre** :

```
signal-input-migration → signal-queries-migration → output-migration → cleanup-unused-imports
```

Une fois les schematics passés, il reste les cas ci-dessous que les schematics **ne couvrent pas**.

---

## Étape 2 — Analyse du résiduel

Scanner le projet migré pour détecter les éléments non pris en charge par le schematic `palettes`, et les refactos de composants. Privilégier `Grep`/`Glob` pour des recherches ciblées ; pour un projet volumineux ou une recherche exploratoire (motifs multiples, conventions de nommage variées), déléguer le scan à un agent `Explore` plutôt que d'enchaîner les recherches une par une.

1. Chercher dans les `.scss`/`.css` les CSS vars `*-rgb` résiduelles.
2. Chercher dans les templates les composants `<lu-icon>` avec input `color`.
3. Chercher les usages des composants impactés (`lu-single-file-upload`, `lu-multi-file-upload`, `lu-activity-feed-update`, `lu-simple-select`, `lu-multi-select`).
4. Chercher les overrides SCSS de `.optionItem` et enfants.
5. Chercher en TS les mutations d'inputs/refs de composants LF (réassignation, méthode mutante sur tableau/objet, mutation d'un champ imbriqué) — y compris les cas que le compilateur ne bloque pas.

### Table de détection

| Détecté | Référence | Automatisable ? |
|---|---|---|
| `--colors-grey-400-rgb`, `--colors-grey-900-rgb`, `--colors-neutral-400-rgb`, `--colors-neutral-900-rgb`, `--colors-white-rgb` | [Palettes.md](./references/Palettes.md) | ⚠️ Contextuel (opacité) |
| `<lu-single-file-upload [entry]="…">` | [FileUpload.md](./references/FileUpload.md) | ⚠️ Restructuration template |
| `lu-single-file-upload` / `lu-multi-file-upload` sans `size` | [FileUpload.md](./references/FileUpload.md) | ✅ Ajouter `size="L"` systématiquement |
| `lu-single-file-upload` / `lu-multi-file-upload` avec `size="S"` | [FileUpload.md](./references/FileUpload.md) | ✅ Supprimer `size="S"` (devenu redondant) |
| `<lu-activity-feed-update>` avec contenu direct | [ActivityFeed.md](./references/ActivityFeed.md) | ✅ Ajout d'un niveau |
| Mutation d'une prop reçue en `readonly` (`.push()`/`.sort()`, champ imbriqué, `Object.assign`) | [Readonly.md](./references/Readonly.md) | ⚠️ À mettre en valeur — jugement requis, **pas bloqué à la compilation** |
| Override SCSS de `.optionItem` / `.optionItem-value` | [SelectListBox.md](./references/SelectListBox.md) | ⚠️ Contextuel |
| Accès TS aux composants LF / refs / mutation d'inputs / `ngOnChanges` | [Signal.md](./references/Signal.md) | ⚠️ Jugement requis |
| Classes héritant de LF (`ALuInput`, `ALuSelectInputComponent`, `ILuDateAdapter`…), `.instance` de dialog, `state="null"` sur `lu-progress-bar` | [Strict.md](./references/Strict.md) | ❌ Manuel |
| Réassignation d'une propriété d'un composant LF (`select.options$ = …`, `ref.optionTpl = …`, mock d'une ref en test) | [Readonly.md](./references/Readonly.md) | ❌ Manuel |
| Lecture/écriture TS d'un input LF (`select.options = …`, `ref.inputPlaceholder`, `searcher.searchInput.nativeElement`, `url$.next()`) | [Signal.md](./references/Signal.md) | ❌ Manuel |

---

## Étape 3 — Résiduel palettes

Traiter les cas de [Palettes.md](./references/Palettes.md) :

- **Vars `*-rgb`** : remplacer par la palette neutre correspondante, en enveloppant avec `color.transparentize` **si et seulement si** une opacité était appliquée via `rgba(...)`. Ne **jamais** remplacer aveuglément.

(`<lu-icon color="primary|secondary">` est désormais géré par le schematic — rien à faire manuellement.)

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

- **Migrations automatiques** (schematics lancés, fichiers modifiés).
- **Migrations manuelles réalisées** (résiduel palettes, refactos composants).
- **Cas nécessitant une décision humaine** : `*-rgb` avec opacité, overrides `.optionItem` complexes, usages détournés en TS.
- **Récapitulatif** : nombre d'occurrences par catégorie, fichiers touchés.
