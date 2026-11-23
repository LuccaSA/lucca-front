---
name: lucca-front-migrate-22-2
description: "Skill de migration vers Lucca Front 22.2. Charge ce skill pour migrer un projet consommateur de @lucca-front/ng 22.1.x vers 22.2.x. Déroule la migration étape par étape : chaque étape analyse le projet, résume ce qu'elle prévoit de modifier et demande l'accord avant d'appliquer. Couvre : les schematics text-size, lu-label et menu. Use when migrating a project to lucca-front 22.2."
---

# lucca-front-migrate-22-2

Ce skill guide la migration d'un projet **consommateur** de `@lucca-front/ng` de la version **22.1.x** vers **22.2.x**.

**Ce skill s'exécute dans le dépôt du projet consommateur**, pas dans `lucca-front` (voir « Installation » plus bas).

La 22.2 ne casse rien : toutes les étapes sont **facultatives**. Elles lancent les migrations de dette proposées par la version, à partir de leurs schematics.

Utiliser `TodoWrite` pour suivre les étapes : chaque étape devient une tâche, marquée `completed` une fois appliquée, refusée ou sautée.

---

## Déroulé d'une étape

Chaque étape suit le même cycle. Ne jamais enchaîner deux étapes sans avoir terminé le cycle de la première.

1. **Analyser** : lancer le dry-run du schematic de l'étape, et les recherches que décrit sa section « Analyser ». Ne rien modifier.
2. **Sauter si vide** : une étape sans occurrence au repérage de l'Étape 0 n'est pas proposée. Si l'analyse d'une étape annoncée ne trouve finalement rien, le dire en une ligne et passer à la suivante, sans poser de question.
3. **Résumer** ce que l'étape prévoit de modifier, en allant à l'essentiel : cinq éléments au plus, sans liste d'occurrences (elle est dans *Voir le détail*).

   ```
   **Étape 1/2 — Classes utilitaires CSS de taille de texte** · facultative · apparence inchangée

   Remplace les classes utilitaires `pr-u-text*`, dépréciées depuis 20.2.0, par les classes utilitaires typographiques.

   | Remplacement | Nombre |
   |---|---|
   | `pr-u-textS` → `pr-u-bodyS` | 31 |

   58 classes dans 33 fichiers. 13 laissées en l'état, détail dans le rapport final.
   ⚠ Les nouvelles classes n'ont plus de `!important` : un style du projet sur le même élément l'emporte.

   Aperçu :
   directory-section-header.component.html:108
   class="link pr-u-textS"  →  class="link pr-u-bodyS"
   ```

   - **Titre** : le compteur (`Étape 1/2`), le **type d'élément migré** (colonne « Ce qui est migré » du tableau des étapes : classe utilitaire CSS, composant, input d'un composant Angular, variable CSS, type TypeScript…), le mode et l'effet sur l'apparence. Un nom seul (« Taille de texte », « Label ») ne dit pas s'il s'agit d'une classe, d'un composant ou d'une variable.
   - **Une phrase** : ce que fait l'étape et pourquoi (déprécié depuis telle version, ou cassant), sans jargon. S'appuyer sur la phrase « En bref » de l'étape.
   - **Le tableau** des remplacements : `avant → après`, nombre.
   - **Une ligne** de totaux : nombre et fichiers modifiés, nombre de cas laissés en l'état. Une ligne `⚠` seulement si un risque doit être connu avant de décider.
   - **L'aperçu** : un exemple réel `fichier:ligne`, avant → après, réduit au fragment qui change. Deux au plus, quand les remplacements sont de nature différente (consignes de chaque étape).
4. **Demander** selon le mode de l'étape :
   - **Facultatif** (par défaut) : `AskUserQuestion` avec les choix *Appliquer* et *Ne pas appliquer*. Une seule décision par étape, pour tout ce que l'étape fait : jamais de choix partiel entre ses composantes, ni de relecture au cas par cas. Les cas incertains ou non traités vont dans le rapport final. Ajouter le choix *Voir le détail* seulement si l'étape touche plusieurs fichiers : il affiche la liste complète des fichiers et des occurrences, puis repose la question ; l'utilisateur peut alors exclure des fichiers.
   - **Obligatoire** : ne pas poser de question. Afficher le résumé, puis appliquer.
5. **Appliquer**, ou noter l'étape comme refusée pour le rapport.

Une étape ne modifie que ce qu'elle a résumé. Pas de modernisation, pas de refacto d'opportunité : ce qui sort du périmètre va dans le rapport.

---

## Démarrage

Avant toute vérification, annoncer en deux ou trois phrases comment la migration va se dérouler, par exemple :

> Je commence par analyser le projet, sans rien modifier, pour repérer les migrations à te proposer. Ensuite, pour chaque migration, je te montre ce qui va changer et tu décides de l'appliquer ou non. Rien n'est modifié sans ton accord.

## Étape 0 — Pré-requis

1. Lire le `package.json` : `@lucca-front/ng` doit être en **22.2.x** (ou en cours de montée vers 22.2), et `@angular/core` en 22.
2. Si le projet est encore en **22.0.x** ou en **21.x** : arrêter, et indiquer qu'il faut d'abord jouer `lucca-front-migrate-22-1` (et `lucca-front-migrate-22` avant lui pour une 21.x), puis relancer celui-ci.
3. Vérifier que l'arbre de travail git est propre : chaque étape doit pouvoir être relue et annulée séparément.
4. **Repérage** : pour chaque étape, chercher son motif de repérage (`Grep`, hors `node_modules` et `dist`), sans lancer de dry-run. C'est rapide, et ça sert seulement à annoncer le plan.

   | Étape | Motif de repérage |
   |---|---|
   | Taille de texte | `\b(pr-)?u-text(XS\|S\|M\|L\|XL\|XXL\|XXXL)\b` dans les `.ts`, `.html`, `.scss`, `.css` |
   | Label | `class="… label …"` dans les `.html` et les `.ts` |
   | Menu | `menu-list`, `menu-link`, `menu-containerOption(n)al`, `mod-withMenu` dans les `.ts`, `.html`, `.scss` |

5. **Annoncer le plan** : la liste des étapes qui seront proposées, dans l'ordre, puis celles qui n'ont rien à migrer, en une ligne. Exemple : « 2 étapes à te proposer : classes utilitaires de taille de texte, composant Menu. Rien à migrer pour : composant Label. » Le compteur des étapes (`Étape 1/2`…) ne compte que les étapes proposées. Si le dry-run d'une étape annoncée ne trouve finalement rien (motif présent, mais hors du périmètre du schematic), le dire en une ligne et passer à la suivante, sans renuméroter.

---

## Étapes

| # | Étape | Ce qui est migré | Nature | Rendu | Mode |
|---|---|---|---|---|---|
| 1 | Schematic `text-size` (#5733) | Classes utilitaires CSS de taille de texte | Migration de dette | Identique | Facultatif |
| 2 | Schematic `lu-label` (#5731) | Composant CSS Label | Migration de dette | Modifié | Facultatif |
| 3 | Schematic `menu` (#5725) | Composant CSS Menu | Migration de dette | Identique (renommage de classes) | Facultatif |

### Étape 1 — Schematic `text-size`

**En bref** : remplace les anciennes classes utilitaires CSS de taille de texte (`pr-u-textS`…) par les nouvelles classes utilitaires typographiques (`pr-u-bodyS`…), sans changer l'apparence du texte.

Les utilitaires de taille de texte `.pr-u-textXS` à `.pr-u-textXXXL` (et leurs équivalents sans préfixe `.u-text*`) sont dépréciés depuis 20.2.0 (20.1.0 pour `.u-text*`). Ils fonctionnent toujours en 22.x. Le schematic `text-size` les remplace par les utilitaires typographiques :

| Avant | Après | Rendu |
|---|---|---|
| `textXS`, `textS`, `textM` | `pr-u-bodyXS`, `pr-u-bodyS`, `pr-u-bodyM` | Identique |
| `textL`, `textXL`, `textXXL` | `pr-u-h3`, `pr-u-h2`, `pr-u-h1` | Identique : convertis seulement sur du texte déjà en gras |
| `textXXXL` | — | Non converti : pas d'équivalent |

Le schematic ne convertit pas une classe quand le remplacement changerait la police : `bodyXS`~`M` sur un élément gras (`strong`, `b`, `th`, `dt`, `h*`) ou dans un contexte gras, `h1`~`h3` sur du texte qui n'est pas en gras, `code`/`kbd`, `em`, lien, famille de police posée sur un parent. Il ne fait que lister les occurrences dans le code commenté, les templates invalides (balise non fermée…), les chaînes TypeScript, les feuilles de style et les fichiers HTML qui ne sont pas des templates de composant. Les classes non converties fonctionnent toujours en 22.x.

**Analyser**

1. Vérifier que le schematic est livré : `node_modules/@lucca-front/ng/schematics/collection.json` doit contenir l'entrée `text-size`. Sinon, sauter l'étape et indiquer qu'il faut monter `@lucca-front/ng` en 22.2.
2. Lancer `npx ng g @lucca-front/ng:text-size --dryRun`. Rien n'est écrit. La sortie donne les fichiers modifiés (`UPDATE`) et la ligne de synthèse, avec le détail par remplacement : `Text size migration: 271 converted (textS → bodyS: 214, textL → h3: 19, …), 141 not converted.`

**Résumer**

- Une ligne par remplacement de la synthèse : `avant → après`, nombre de classes converties. Puis le nombre de fichiers modifiés (lignes `UPDATE`).
- Le nombre de classes laissées en l'état, avec un rappel : elles fonctionnent toujours en 22.x, et le détail est dans le rapport final.
- Aperçu : un exemple réel `textS → bodyS`, et un exemple `textL → h3` s'il y en a un.
- Le risque à annoncer : les remplacements utilisent la propriété raccourcie `font`, sans `!important`. Un style du projet qui fixe une taille de police sur le même élément l'emporte désormais.

**Appliquer**

1. Lancer `npx ng g @lucca-front/ng:text-size`.
2. Lire `text-size-migration-report.md` à la racine. Il liste uniquement les lignes `not converted`, avec leur raison.
3. Les regrouper par raison pour le rapport final. Ne pas les corriger : les classes non converties fonctionnent toujours en 22.x. Laisser le fichier en place : il porte le détail ligne par ligne (voir « Rapport »).

### Étape 2 — Schematic `lu-label`

**En bref** : remplace le composant Label, écrit en HTML avec la classe CSS `.label`, par le composant adapté à chaque usage (un compteur, un statut ou une catégorie). L'apparence change.

Le composant Label (`.label`) est déprécié depuis 21.1.2. Il fonctionne toujours en 22.x. Le schematic `lu-label` le remplace, selon les guidelines Prisme, par `lu-numeric-badge` (un décompte), `lu-status-badge` (le statut d'une ressource) ou `lu-tag` (une catégorie). Le rendu change : ce sont d'autres composants. Le schematic convertit même en cas de doute et consigne chaque décision dans `lu-label-migration-report.md` (`high`, `low`, `not converted`).

Cette étape lance le schematic seul, sans relecture au cas par cas : ses conversions incertaines (`low`) vont dans les écrans à contrôler du rapport final, et ses cas non convertis dans les cas laissés en l'état. Le skill `label` (`.github/skills/deprecated-components/label` dans `lucca-front`), qui tranche ces cas avec le dev, n'est pas lancé : il est seulement cité dans les pistes du rapport final.

**Analyser**

1. Vérifier que le schematic est livré : `node_modules/@lucca-front/ng/schematics/collection.json` doit contenir l'entrée `lu-label`. Sinon, sauter l'étape et indiquer qu'il faut monter `@lucca-front/ng` en 22.2.
2. Lancer `npx ng g @lucca-front/ng:lu-label --dryRun`. Rien n'est écrit. Si la sortie indique `Label CSS not imported, nothing to migrate.` ou `No .label found in the templates.`, l'annoncer en une ligne et passer à la suivante : les `.label` du projet ne sont pas des Labels Prisme.
3. Sinon, la sortie donne les fichiers modifiés (`UPDATE`) et la synthèse `Label migration: X converted (lu-tag: …, lu-status-badge: …, lu-numeric-badge: …), Y to review, Z not converted.`

**Résumer**

- Le tableau : une ligne par composant cible, avec le nombre de Labels. Puis le nombre de fichiers modifiés (templates et imports des composants).
- Les Labels laissés en l'état, s'il y en a. Ne pas parler de cas « à relire » : les conversions incertaines sont appliquées et listées dans les écrans à contrôler.
- Aperçu : un exemple réel par composant cible, deux au plus.

**Appliquer**

1. Lancer `npx ng g @lucca-front/ng:lu-label`.
2. Lire `lu-label-migration-report.md` : les lignes `low` puis `high` vont dans les écrans à contrôler (fichier et cible, sans détail des raisons), les `not converted` dans les cas laissés en l'état, regroupés par raison. Laisser le fichier en place pour le détail (voir « Rapport »).
3. Dans les pistes du rapport final, citer le skill `label` pour qui veut affiner les conversions incertaines ou traiter les surcharges SCSS de `.label`.

### Étape 3 — Schematic `menu`

**En bref** : renomme les classes CSS de l'ancien composant Menu (`.menu`…) en classes du composant Horizontal navigation (`.horizontalNavigation`…). L'apparence ne change pas.

Le composant Menu (`.menu`) est déprécié depuis 19.3.0. Il fonctionne toujours en 22.x. Le schematic `menu` le renomme en Horizontal navigation (`.horizontalNavigation`), dans les templates et dans le SCSS. C'est un simple renommage de classes : le rendu est identique.

| Avant | Après |
|---|---|
| `.menu` | `.horizontalNavigation` |
| `.menu-list`, `.menu-list-item` | `.horizontalNavigation-list`, `.horizontalNavigation-list-item` |
| `.menu-list-item-action`, `.menu-link` | `.horizontalNavigation-list-item-action` |
| `.menu-link-placeholder` | `.horizontalNavigation-link-placeholder` |
| `.menu-containerOptional`, `.menu-containerOptionnal` | `.horizontalNavigation-containerOptional` |
| `.pageHeader.mod-withMenu` | `.pageHeader.mod-withHorizontalNavigation` |

Une classe `.menu` est générique : le schematic ne la renomme que s'il est sûr qu'il s'agit du Menu Lucca Front, c'est-à-dire si l'élément porte des enfants ou des mods du Menu (`mod-header`, `mod-S`, `mod-vertical`, `mod-noBorder`). Dans le SCSS, il faut en plus que le template du composant contienne un tel Menu. Le schematic ne touche jamais au `.lui.menu` de lucca-ui, et ne fait rien du tout si `bulma` ou `foundation-sites` est installé. Le reste (surcharges globales, `.menu` sans contexte) est seulement signalé dans un avertissement, avec fichier et ligne.

**Analyser**

1. Vérifier que le schematic est livré : `node_modules/@lucca-front/ng/schematics/collection.json` doit contenir l'entrée `menu`. Sinon, sauter l'étape et indiquer qu'il faut monter `@lucca-front/ng` en 22.2.
2. Compter les occurrences par classe de la colonne « Avant », hors `node_modules` et `dist`, dans les `.ts`, `.html` et `.scss`. Pour `.menu` seul, compter les attributs `class` qui contiennent le mot `menu` et les sélecteurs SCSS `.menu` : c'est un ordre de grandeur, le dry-run fait foi.
3. Lancer `npx ng g @lucca-front/ng:menu --dryRun`. Rien n'est écrit. La sortie donne les fichiers modifiés (`UPDATE`) et, s'il y en a, l'avertissement `The following .menu classes were left untouched…` avec la liste des cas laissés de côté. Si elle indique que `bulma` ou `foundation-sites` est installé, sauter l'étape et le signaler dans le rapport : la migration est à faire à la main.

**Résumer**

- Une ligne par classe trouvée : `avant → après`, nombre d'occurrences, nombre de fichiers.
- Le nombre de fichiers modifiés d'après le dry-run.
- Le nombre de `.menu` laissés de côté (avertissement du dry-run), avec la raison : le schematic n'est pas sûr qu'il s'agit du Menu Lucca Front.
- Aperçu : un exemple réel, avant → après.

**Appliquer**

1. Lancer `npx ng g @lucca-front/ng:menu`.
2. Reporter chaque ligne de l'avertissement dans les cas non traités : à vérifier, puis à migrer à la main vers `.horizontalNavigation` s'il s'agit bien du Menu Lucca Front.

---

## Validation

1. Lancer le build (`ng build` ou `tsc --noEmit`), puis les scripts de vérification du `package.json` (lint, tests unitaires, e2e/Storybook).
2. Distinguer les erreurs causées par cette migration (à corriger) des erreurs préexistantes (à signaler, sans les corriger).
3. Lister les écrans à contrôler visuellement pour chaque étape dont le rendu est modifié.

---

## Rapport

- **Étapes appliquées** : par étape, le résumé des remplacements (types, occurrences, fichiers) et les fichiers exclus par l'utilisateur.
- **Étapes refusées** et **étapes sautées** (aucune occurrence).
- **Cas laissés en l'état**, par étape, regroupés par raison : un tableau raison / nombre, avec un exemple `fichier:ligne` par raison. Les lister un par un seulement s'il y en a moins d'une dizaine.
- **Où trouver le détail** : les rapports des schematics (`text-size-migration-report.md`…) restent à la racine du projet et listent chaque cas ligne par ligne. Rappeler de les supprimer avant de commiter.
- **Signalements sans remplacement**, seulement si le projet les utilise (`Grep` hors `node_modules` et `dist`) : ligne de sélection en masse de l'index-table (`.indexTable-head-row.mod-massSelection`, `.indexTable-head-row-cell-massSelection`, mixin `massSelection`), dépréciée sans remplacement (#5741). Fichier et ligne de chaque usage.
- **Écrans à contrôler visuellement.**
- **Erreurs préexistantes** rencontrées au build/lint : listées, non corrigées.
- **Pistes hors périmètre** : listées, jamais appliquées.

---

## Installation dans un projet consommateur

Ce skill vit dans [`lucca-front/.claude/skills/`](https://github.com/LuccaSA/lucca-front/tree/master/.claude/skills). Le rapatrier tel quel, `SKILL.md` **et** `references/` s'il en a :

```bash
# depuis la racine du projet à migrer, avec un clone de lucca-front à côté
mkdir -p .claude/skills
cp -r <chemin>/lucca-front/.claude/skills/lucca-front-migrate-22-2 .claude/skills/
```

Le poser dans `.claude/skills/` du projet le partage avec l'équipe ; dans `~/.claude/skills/`, il reste sur un poste. Claude Code le charge quand une migration LF 22.2 est demandée, ou via `/lucca-front-migrate-22-2`.
