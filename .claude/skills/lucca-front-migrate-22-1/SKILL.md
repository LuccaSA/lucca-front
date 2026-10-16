---
name: lucca-front-migrate-22-1
description: "Skill de migration vers Lucca Front 22.1. Charge ce skill pour migrer un projet consommateur de @lucca-front/ng 22.0.x vers 22.1.x. Couvre : la suppression du token USER_POPOVER_IS_ACTIVATED (seul changement cassant de la 22.1), et le renommage des inputs dépréciés de lu-fancy-box (foreground → foregroundStartEnd, backgroundLeft → backgroundEndStart, backgroundRight → backgroundStartEnd), avec la détection des surcharges SCSS qui empêchent ce renommage à iso-rendu et le remplacement du markup HTML .fancyBox par lu-fancy-box. Use when migrating a project to lucca-front 22.1."
---

# lucca-front-migrate-22-1

Ce skill guide la migration d'un projet **consommateur** de `@lucca-front/ng` de la version **22.0.x** vers **22.1.x**.

**Périmètre — iso-comportement et iso-rendu.** La 22.1 est une mineure : un seul changement cassant (le token `USER_POPOVER_IS_ACTIVATED`), le reste est une dépréciation qui fonctionne toujours. On corrige ce qui casse, on remplace ce qui est déprécié **seulement quand le rendu ne bouge pas**, et on signale le reste. Seule exception : les illustrations du CDN Prisme passent à leur nom typé, dont les bulles suivent la palette du produit (voir [FancyBox.md](./references/FancyBox.md) §2). Pas de modernisation, pas de refacto d'opportunité, pas d'adoption des autres nouveautés de la 22.1 (`palette`, `foregroundEndStart`…) : les lister dans le rapport si l'occasion se présente.

**Ce skill s'exécute dans le dépôt du projet consommateur**, pas dans `lucca-front` (voir « Installation » plus bas).

## Fichiers de référence

| Référence | Ce qu'elle couvre |
|---|---|
| [FancyBox.md](./references/FancyBox.md) | Correspondance des inputs et du markup, transformation des valeurs, surcharges SCSS bloquantes, remplacement du HTML pur par `lu-fancy-box`, prérequis `HttpClient`. |

Utiliser `TodoWrite` pour suivre les étapes 0 à 5 : chaque étape devient une tâche, marquée `completed` au fur et à mesure.

---

## Étape 0 — Pré-requis

1. Lire le `package.json` : `@lucca-front/ng` doit être en **22.1.x** (ou en cours de montée vers 22.1), et `@angular/core` en 22.
2. Si le projet est encore en **21.x** : arrêter, et indiquer qu'il faut d'abord jouer le skill `lucca-front-migrate-22`, puis relancer celui-ci.

---

## Étape 1 — Analyse

**Détection uniquement : ne rien modifier.** Un seul passage de recherche (`Grep`, ou un agent `Explore` sur un gros projet), puis restituer un comptage par ligne (occurrences + fichiers) avant d'attaquer l'étape 2. Une ligne sans occurrence fait de son étape une tâche vide, à marquer `completed` sans l'ouvrir.

| Motif | Fichiers | Traité à |
|---|---|---|
| `USER_POPOVER_IS_ACTIVATED` | `.ts` | Étape 2 |
| `<lu-fancy-box` portant `foreground`, `backgroundLeft` ou `backgroundRight` (statiques ou bindés `[…]`) | `.html`, templates inline des `.ts` | Étape 3 |
| Markup HTML `class="fancyBox"` (sans `lu-fancy-box`), classe `.fancyBox-content-foreground` | `.html`, `.ts` | Étape 3 |
| Surcharges de l'ancien rendu : `.fancyBox-content` avec `::before`/`::after`, `.fancyBox-content-foreground`, variables `--components-fancyBox-(offsetInline\|offsetBlock\|imageWidth\|imageHeight\|background-left\|background-right\|foreground)` | `.scss`, `.css`, `styles` inline | Étape 3 (bloquant) |

Pour chaque FancyBox trouvée, rattacher les surcharges SCSS qui la touchent : le SCSS du composant hôte, mais aussi les fichiers globaux (`shame`, `styles.scss`…) qui ciblent `.fancyBox` ou une classe posée sur l'hôte. Une surcharge globale touche **toutes** les FancyBox de l'application.

---

## Étape 2 — `USER_POPOVER_IS_ACTIVATED` (cassant)

Le token est supprimé de `@lucca-front/ng/user-popover` : son import ne compile plus. Il était déprécié depuis 21.1.2, valait toujours `true`, et le popover ne le lisait plus.

Pour chaque occurrence :

1. Supprimer le provider `{ provide: USER_POPOVER_IS_ACTIVATED, … }` du tableau `providers`.
2. Supprimer le symbole de l'import, et l'import entier s'il devient vide.

Si le provider valait `false` ou une expression (feature flag, factory) : il n'avait déjà plus d'effet depuis 21.1.2. Le supprimer quand même, mais le signaler dans le rapport — le code autour (flag, service) est peut-être devenu inutile, à nettoyer hors de cette migration.

`provideLuUserPopover()`, lui aussi déprécié, fonctionne toujours : ne pas y toucher.

---

## Étape 3 — FancyBox (dépréciation)

Suivre [FancyBox.md](./references/FancyBox.md). En résumé, pour chaque FancyBox :

| Cas | Action |
|---|---|
| `lu-fancy-box` sans surcharge de l'ancien rendu | Renommer les inputs (§1), en transformant les valeurs si besoin (§2). |
| `lu-fancy-box` avec une surcharge de l'ancien rendu | **Ne pas toucher.** Les anciens inputs fonctionnent toujours ; les nouveaux désactivent `::before`/`::after`, la surcharge ne s'appliquerait plus. Signaler (§3). |
| Valeur non SVG ou non transformable | **Ne pas toucher.** Signaler (§2). |
| Markup HTML `.fancyBox` dans un template Angular, sans surcharge | Remplacer par `lu-fancy-box` (§4). |
| Markup HTML hors template Angular, ou avec surcharge | **Ne pas toucher.** Signaler (§4). |

Ne jamais mélanger anciens et nouveaux inputs sur un même `lu-fancy-box` : une FancyBox est migrée entièrement ou pas du tout.

Après la première FancyBox migrée, vérifier le prérequis `HttpClient` (§5) : sans lui, l'application plante au rendu du composant.

---

## Étape 4 — Validation

1. Lancer le build (`ng build` ou `tsc --noEmit`), puis les scripts de vérification du `package.json` (lint, tests unitaires, e2e/Storybook).
2. Distinguer les erreurs causées par cette migration (à corriger) des erreurs préexistantes (à signaler, sans les corriger).
3. Vérifier qu'il ne reste aucune occurrence de `USER_POPOVER_IS_ACTIVATED`.
4. Les FancyBox migrées ne se valident pas au build : le rendu passe d'une image de fond à un SVG inline chargé à l'exécution. Lister dans le rapport chaque écran à contrôler visuellement, en signalant celles passées à un nom typé : leurs bulles suivent maintenant la palette du produit.

---

## Étape 5 — Rapport

- **UserPopover** : providers supprimés (fichier, ligne), et ceux qui valaient `false` ou une expression.
- **FancyBox migrées** : fichier, ligne, inputs renommés, valeurs transformées, URL remplacées par un nom typé. Écrans à contrôler visuellement.
- **FancyBox laissées en l'état**, une par une avec fichier et ligne, et la raison : surcharge de l'ancien rendu (citer le fichier SCSS et le sélecteur), valeur non SVG, `http://`, markup hors Angular. Rappeler qu'elles fonctionnent toujours, mais qu'il faudra les traiter avant la majeure qui supprimera les anciens inputs.
- **Prérequis `HttpClient`** : présent, ajouté, ou intercepteurs à vérifier (§5).
- **Erreurs préexistantes** rencontrées au build/lint : listées, non corrigées.
- **Pistes hors périmètre** : `palette`, `foregroundEndStart` pour remplacer une illustration ajoutée en SCSS… Listées, jamais appliquées.

---

## Installation dans un projet consommateur

Ce skill vit dans [`lucca-front/.claude/skills/`](https://github.com/LuccaSA/lucca-front/tree/master/.claude/skills). Le rapatrier tel quel, `SKILL.md` **et** `references/` :

```bash
# depuis la racine du projet à migrer, avec un clone de lucca-front à côté
mkdir -p .claude/skills
cp -r <chemin>/lucca-front/.claude/skills/lucca-front-migrate-22-1 .claude/skills/
```

Le poser dans `.claude/skills/` du projet le partage avec l'équipe ; dans `~/.claude/skills/`, il reste sur un poste. Claude Code le charge quand une migration LF 22.1 est demandée, ou via `/lucca-front-migrate-22-1`.
