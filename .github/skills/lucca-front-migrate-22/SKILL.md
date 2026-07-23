---
name: lucca-front-migrate-22
description: "Skill de migration vers Lucca Front 22 (breaking release). Charge ce skill pour migrer un projet consommateur de @lucca-front/ng 21.x vers 22.x. Couvre : suppression des palettes dépréciées (.palette-grey→neutral, .palette-primary/secondary→product, .palette-lucca→brand, CSS vars --palettes-* / --colors-*, y compris les cas manuels *-rgb avec color.transparentize et <lu-icon color>), les refactos de composants (SingleFileUpload → lu-file-entry, FileUpload nouvelle taille par défaut, ActivityFeed → lu-activity-feed-update-item, Select panel → ListBox), et la modernisation strict/readonly/signaux. Orchestre les schematics officiels avant de traiter le résiduel non automatisable. Use when migrating a project to lucca-front 22."
---

# lucca-front-migrate-22

Ce skill guide la migration d'un projet **consommateur** de `@lucca-front/ng` de la version **21.x** vers **22.x** (release breaking).

Principe directeur : **les schematics font le mécanique, ce skill fait le résiduel contextuel.** Ne jamais réimplémenter à la main ce qu'un schematic couvre déjà — lancer le schematic, puis traiter uniquement ce qu'il laisse.

---

## Étape 1 — Orchestration des schematics (à faire en premier)

Lancer les schematics officiels **avant** toute retouche manuelle. Ils couvrent le gros du remplacement palettes de façon fiable et testée.

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

Scanner le projet migré pour détecter les éléments non pris en charge par le schematic `palettes`, et les refactos de composants :

1. Chercher dans les `.scss`/`.css` les CSS vars `*-rgb` résiduelles.
2. Chercher dans les templates les composants `<lu-icon>` avec input `color`.
3. Chercher les usages des composants impactés (`lu-single-file-upload`, `lu-multi-file-upload`, `lu-activity-feed-update`, `lu-simple-select`, `lu-multi-select`).
4. Chercher les overrides SCSS de `.optionItem` et enfants.

### Table de détection

| Détecté | Référence | Automatisable ? |
|---|---|---|
| `--colors-grey-400-rgb`, `--colors-grey-900-rgb`, `--colors-neutral-400-rgb`, `--colors-neutral-900-rgb`, `--colors-white-rgb` | [Palettes.md](./references/Palettes.md) | ⚠️ Contextuel (opacité) |
| `<lu-single-file-upload [entry]="…">` | [FileUpload.md](./references/FileUpload.md) | ⚠️ Restructuration template |
| `lu-single-file-upload` / `lu-multi-file-upload` sans `size` | [FileUpload.md](./references/FileUpload.md) | ✅ Décision explicite requise |
| `<lu-activity-feed-update>` avec contenu direct | [ActivityFeed.md](./references/ActivityFeed.md) | ✅ Ajout d'un niveau |
| Override SCSS de `.optionItem` / `.optionItem-value` | [SelectListBox.md](./references/SelectListBox.md) | ⚠️ Contextuel |
| Accès TS aux composants LF / refs / mutation d'inputs / `ngOnChanges` | [StrictSignals.md](./references/StrictSignals.md) | ⚠️ Jugement requis |

---

## Étape 3 — Résiduel palettes

Traiter les cas de [Palettes.md](./references/Palettes.md) :

- **Vars `*-rgb`** : remplacer par la palette neutre correspondante, en enveloppant avec `color.transparentize` **si et seulement si** une opacité était appliquée via `rgba(...)`. Ne pas remplacer aveuglément.

(`<lu-icon color="primary|secondary">` est désormais géré par le schematic — rien à faire manuellement.)

---

## Étape 4 — Refactos de composants

Appliquer chaque migration en suivant son fichier de référence :

- [FileUpload.md](./references/FileUpload.md) — `SingleFileUpload` (gestion de `FileEntry` via `lu-file-entry`) + nouvelle taille par défaut.
- [ActivityFeed.md](./references/ActivityFeed.md) — niveau intermédiaire `lu-activity-feed-update-item`.
- [SelectListBox.md](./references/SelectListBox.md) — panel des Select passé à `ListBox`, overrides `.optionItem*`.

---

## Étape 5 — Modernisation strict / readonly / signaux

Voir [StrictSignals.md](./references/StrictSignals.md).

- **Usage standard** (bindings dans le template) : montée quasi transparente, les schematics Angular s'en chargent.
- **Usage détourné** (accès TS, refs, mutation d'inputs) : ajustements ciblés (signaux à invoquer avec `()`, inputs readonly, `viewChild()` signal, `computed()`/`effect()` au lieu de `ngOnChanges`, clonage des tableaux/objets d'entrée).
- **Strict** : activer les flags empilés **un à la fois** (`noImplicitAny` → `strictNullChecks` → `strictTemplates`), jamais d'un bloc.

---

## Étape 6 — Validation

1. Lancer `ng build` (ou `tsc --noEmit`) pour vérifier la compilation.
2. Vérifier qu'il ne reste aucune palette/var dépréciée : rechercher `palette-grey|palette-primary|palette-secondary|palette-lucca`, `--palettes-grey|--palettes-primary|--palettes-secondary|--palettes-lucca`, `--colors-`, `color="primary"|color="secondary"` sur `lu-icon`.
3. Vérifier visuellement les composants restructurés (FileUpload, ActivityFeed, Select).

---

## Étape 7 — Reporting

Produire un rapport structuré :

- **Migrations automatiques** (schematics lancés, fichiers modifiés).
- **Migrations manuelles réalisées** (résiduel palettes, refactos composants).
- **Cas nécessitant une décision humaine** : taille par défaut FileUpload à confirmer, `*-rgb` avec opacité, overrides `.optionItem` complexes, usages détournés en TS.
- **Récapitulatif** : nombre d'occurrences par catégorie, fichiers touchés.
