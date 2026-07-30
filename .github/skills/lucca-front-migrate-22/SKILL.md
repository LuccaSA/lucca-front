---
name: lucca-front-migrate-22
description: "Skill de migration vers Lucca Front 22 (breaking release). Charge ce skill pour migrer un projet consommateur de @lucca-front/ng 21.x vers 22.x. Couvre : suppression des palettes dépréciées (.palette-grey→neutral, .palette-primary/secondary→product, .palette-lucca→brand, CSS vars --palettes-* / --colors-*, y compris les cas manuels *-rgb avec color.transparentize et <lu-icon color>), les refactos de composants (SingleFileUpload → lu-file-entry, FileUpload nouvelle taille par défaut, ActivityFeed → lu-activity-feed-update-item, Select panel → ListBox), et la modernisation strict/readonly/signaux. Orchestre les schematics officiels avant de traiter le résiduel non automatisable. Use when migrating a project to lucca-front 22."
---

# lucca-front-migrate-22

Ce skill guide la migration d'un projet **consommateur** de `@lucca-front/ng` de la version **21.x** vers **22.x** (release breaking).

**Périmètre — l'objectif unique est que le code existant continue de fonctionner comme avant.** C'est une migration à iso-comportement et iso-rendu : on rétablit ce que la montée en LF 22 a cassé, rien de plus. Tout le reste est hors périmètre — pas de modernisation d'un code qui marche, pas de refacto d'opportunité, pas d'amélioration au passage, pas de nouvelle fonctionnalité. Si un besoin de ce type apparaît, le signaler dans le rapport final au lieu de le faire.

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
| `$palettesDeprecated` dans un `@use ... config with (...)` du consommateur | Étape 3 |
| `<lu-icon>` avec input `color` — **à ne chercher que si le schematic `palettes` a été refusé à l'Étape 1** (sinon déjà traité) | Étape 3 |
| Usages de `lu-single-file-upload` / `lu-multi-file-upload` | Étape 4 |
| Usages de `lu-activity-feed-update` | Étape 4 |
| Usages de `lu-simple-select` / `lu-multi-select`, et overrides SCSS de `.optionItem` et enfants | Étape 4 |
| Accès TS aux composants/refs LF : réassignation de propriété, lecture/écriture d'un input, `ngOnChanges`, mutation d'un tableau/objet reçu (`.push()`/`.sort()`, champ imbriqué, `Object.assign`) — y compris les cas que le compilateur ne bloque pas | Étape 5 |
| Classes héritant de LF (`ALuInput`, `ALuSelectInputComponent`, `ILuDateAdapter`…), `.instance` de dialog, `state="null"` sur `lu-progress-bar` | Étape 5 |

**Pièges silencieux** — ces motifs ne produisent **aucune** erreur de build : ils sont détectés ici pour être **signalés** (Étape 7), jamais corrigés d'office. Les chercher systématiquement, y compris — et surtout — si le projet consommateur n'est pas en `strictNullChecks` : ces changements sont dans le code compilé de LF 22, pas dans les types, donc le `tsconfig` du projet ne les filtre pas.

| Motif détecté | Changement de comportement (réf. [Strict.md](./references/Strict.md) §5) |
|---|---|
| `canClose` (garde de fermeture de dialog) | Appel en `try/catch` et ignoré si `instance === null` → une garde qui lançait pour bloquer ne bloque plus |
| `setValue(null)` / `setValue(undefined)` sur un select **legacy** (`ALuSelectInput`) | `null`/`undefined` ignorés → reset programmatique sans effet |
| `luDateInput` / `ILuDateAdapter` / appels à `.parse(` d'un adapter | Saisie non parsable → plus de `setValue` → validation « date invalide » qui ne se déclenche plus |
| `implements ILuEstablishmentService` / `searchPaged(` | Reçoit `''` au lieu de `null` quand pas de clue → un test `clue === null` part en recherche vide |
| Lecture TS de `displayFormat()` sur `lu-user-tile`, ou comparaison `=== undefined` sur un input LF lu en TS | Inputs désormais initialisés (`displayFormat` a une valeur par défaut, `_value` vaut `null` et non `undefined`) → détections « non fourni » cassées |
| `panelHeaderTpl` comparé à `null`, `filterPillDisabled`, `totalCount` lus depuis un signal LF | Valeurs initiales changées (`undefined`, `false`, `0`) → comparaisons `=== null` devenues fausses |

Restituer le résultat du scan sous forme de comptage par ligne (occurrences + fichiers) avant d'attaquer l'Étape 3 : c'est ce comptage qui alimente le rapport final (Étape 7).

---

## Étape 3 — Résiduel palettes

Traiter les cas de [Palettes.md](./references/Palettes.md) :

- **Vars `*-rgb`** : remplacer par la palette neutre correspondante, en enveloppant avec `color.transparentize` **si et seulement si** une opacité était appliquée via `rgba(...)`. Ne **jamais** remplacer aveuglément.
- **`$palettesDeprecated`** : la variable n'existe plus en 22.0 — supprimer sa déclaration partout où le consommateur la configure, sinon le SCSS ne compile plus. Voir [Palettes.md](./references/Palettes.md#4-palettesdeprecated--suppression-sèche).

- **`<lu-icon color="primary|secondary">`** : rien à faire si le schematic `palettes` a été lancé (il le couvre, statique et bound). S'il a été refusé à l'Étape 1, **ne pas le migrer à la main** : ce cas fait partie du périmètre de la PR dédiée aux palettes.

---

## Étape 4 — Refactos de composants

Appliquer chaque migration en suivant son fichier de référence :

- [FileUpload.md](./references/FileUpload.md) — `SingleFileUpload` (gestion de `FileEntry` via `lu-file-entry`) + nouvelle taille par défaut.
- [ActivityFeed.md](./references/ActivityFeed.md) — niveau intermédiaire `lu-activity-feed-update-item`.
- [SelectListBox.md](./references/SelectListBox.md) — panel des Select passé à `ListBox`. Le panel est migré par LF ; les overrides `.optionItem*` du projet ne sont **pas** à modifier — seulement à relever dans le rapport.

---

## Étape 5 — Adaptation strict / readonly / signaux (pilotée par les erreurs)

**Règle de cette étape : ne modifier du code que si c'est nécessaire et bloquant.** « Bloquant » = une erreur de **build** (`ng build` / `tsc --noEmit`) ou de **lint** causée par la montée en LF 22. Le but n'est pas de moderniser le code vers les signaux, c'est de le remettre en état de marche à iso-comportement : un appel impératif qui compile toujours reste tel quel, même s'il existe désormais une écriture plus idiomatique.

Marche à suivre :

1. **Lancer le build (et le lint) d'abord**, avant toute retouche — c'est lui qui définit la liste de travail. Voir Étape 6 pour les commandes.
2. **Pour chaque erreur remontée**, identifier l'axe et n'ouvrir que la référence correspondante :
	- **Strict / API nullable** — les `.d.ts` de LF 22 sont émis avec `strictNullChecks` → [Strict.md](./references/Strict.md) (signatures élargies, ordre d'activation des flags).
	- **Propriétés `readonly`** — les propriétés de classe LF ne sont plus réassignables → [Readonly.md](./references/Readonly.md).
	- **Inputs / outputs / refs en signaux** — inventaire des membres convertis, renommés ou supprimés par entrypoint → [Signal.md](./references/Signal.md).
3. **Corriger au plus juste** : la modification minimale qui lève l'erreur, dans le fichier qui la porte. Ne pas élargir au reste du fichier ni aux fichiers voisins qui compilent.
4. **Ne pas contourner** : jamais de `as any`, `!`, `@ts-ignore` ni de `eslint-disable` pour faire taire une erreur. Si le blocage nécessite un arbitrage qui dépasse le résiduel documenté (ex. retirer un `readonly` côté composant LF), utiliser `AskUserQuestion` pour présenter les options plutôt que de trancher seul.

**Ce qui ne casse pas le build ne se corrige pas ici, mais se signale** à l'Étape 7 — c'est le cas des pièges silencieux : mutations d'un objet/tableau reçu (`.push()`, `.sort()`, champ imbriqué, `Object.assign`) et changements de comportement liés à `strictNullChecks` qui ne produisent **aucune** erreur de compilation. Les lister comme « à vérifier manuellement », avec fichier et ligne, sans y toucher.

### Passe finale obligatoire — pièges silencieux

**À faire dans tous les cas, même si le build et le lint sont verts, même si aucune erreur n'a été remontée aux points 1-4 ci-dessus.** Un projet non strict ne verra quasiment aucune erreur TS, mais subit les mêmes changements de comportement : ils viennent du code compilé de LF 22, pas des `.d.ts`. Un build vert n'est donc **pas** une preuve qu'il n'y a rien à signaler.

Ouvrir **[Strict.md](./references/Strict.md) §5** et, pour **chacune** de ses lignes, confirmer si le projet est concerné :

- pour les familles routées à l'Étape 2 (`canClose`, `setValue(null)` legacy, dates invalides, `ILuEstablishmentService`, lectures d'inputs comparées à `undefined`/`null`), reprendre les occurrences déjà comptées ;
- pour les familles restantes — popover inerte (`ALuPopoverTrigger`), `/me` de `LuCoreSelectUsersDirective`, `NumberFormat` en `percent`, `LuUserDisplayPipe` avec `formatter` absent, `templateErrorExtension` (formly), `TreeNode` sans `children`, `FilterPillComponent`, `withSelectAll` — faire une recherche ciblée à partir du symbole cité dans le tableau.

Chaque ligne du §5 doit finir soit **« concerné, à vérifier manuellement »** (avec fichier + ligne), soit **« non concerné »** (aucune occurrence trouvée). Une ligne non tranchée est un trou dans le rapport, pas une absence de problème.

L'usage standard (bindings dans le template) est quasi transparent : les schematics Angular s'en chargent, il n'y a normalement rien à faire à la main.

---

## Étape 6 — Validation

1. Lancer `ng build` (ou `tsc --noEmit`) via Bash pour vérifier la compilation. C'est aussi la commande qui alimente l'Étape 5 : boucler Étape 5 → Étape 6 jusqu'à ce qu'il ne reste plus d'erreur imputable à LF 22.
2. Consulter les `scripts` du `package.json` du projet consommateur et lancer ceux pertinents pour valider la migration (build, lint, tests unitaires, tests e2e/Storybook…) — ne pas se limiter à `ng build` si d'autres commandes de vérification existent.
3. Distinguer, dans les erreurs restantes, celles **causées par la montée LF 22** (à corriger) de celles **préexistantes** (à signaler à l'Étape 7, sans les corriger — hors périmètre).
4. Si le schematic `palettes` a été lancé à l'Étape 1, vérifier qu'il ne reste aucun usage des palettes dépréciées (`.palette-grey|primary|secondary|lucca`, `--palettes-grey|primary|secondary|lucca-*`, `--colors-grey|white|black`, `.mod-grey`) : ces usages ne cassent pas le build, ils perdent leur couleur au runtime, et rien ne permet de réactiver les palettes supprimées.

---

## Étape 7 — Reporting

Produire un rapport structuré :

- **Migrations automatiques** (schematics lancés, fichiers modifiés) — et, si le schematic `palettes` a été refusé à l'Étape 1, le rappeler explicitement comme reste à faire dans une PR dédiée.
- **Migrations manuelles réalisées** (résiduel palettes, refactos composants).
- **Cas laissés à l'utilisateur** : `*-rgb` avec opacité, usages détournés en TS, et **tous** les overrides SCSS `.optionItem*` — les lister un par un (fichier, ligne, sélecteur, équivalent connu ou « non documenté ») sans les avoir modifiés.
- **Pièges silencieux à vérifier manuellement** (détectés mais volontairement non corrigés, car non bloquants) : mutations d'un objet/tableau reçu, changements de comportement liés à `strictNullChecks` — avec fichier et ligne. Cette section est alimentée par la passe finale de l'Étape 5 et **couvre les 13 lignes de [Strict.md](./references/Strict.md) §5** : lister les lignes concernées avec leurs occurrences, puis énumérer les lignes écartées en « non concerné ». Ne jamais rendre cette section vide sans avoir explicitement listé les lignes non concernées — sur un projet non strict, une section vide sans justification signifie que l'audit n'a pas été fait, pas qu'il n'y a rien.
- **Erreurs préexistantes** rencontrées au build/lint mais non imputables à LF 22 : listées, non corrigées.
- **Pistes hors périmètre** repérées en chemin (modernisation, refacto, dette) : listées comme suggestions pour plus tard, jamais appliquées dans cette migration.
- **Récapitulatif** : nombre d'occurrences par catégorie, fichiers touchés.
