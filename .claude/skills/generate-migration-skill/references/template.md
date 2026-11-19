# Gabarit d'un skill `lucca-front-migrate-X-Y`

Copier ce gabarit dans `.claude/skills/lucca-front-migrate-X-Y/SKILL.md`, remplacer les `<…>`, puis écrire une section par étape avec l'une des deux formes plus bas. Les parties communes (cycle d'une étape, Démarrage, Validation, Rapport, Installation) se recopient telles quelles : ce sont les règles validées avec les équipes. Les adapter seulement si l'auteur le demande.

Référence complète : `.claude/skills/lucca-front-migrate-22-2/SKILL.md`.

---

```markdown
---
name: lucca-front-migrate-<X-Y>
description: "Skill de migration vers Lucca Front <X.Y>. Charge ce skill pour migrer un projet consommateur de @lucca-front/ng <X.Y-1>.x vers <X.Y>.x. Déroule la migration étape par étape : chaque étape analyse le projet, résume ce qu'elle prévoit de modifier et demande l'accord avant d'appliquer. Couvre : <une liste courte des étapes>. Use when migrating a project to lucca-front <X.Y>."
---

# lucca-front-migrate-<X-Y>

Ce skill guide la migration d'un projet **consommateur** de `@lucca-front/ng` de la version **<X.Y-1>.x** vers **<X.Y>.x**.

**Ce skill s'exécute dans le dépôt du projet consommateur**, pas dans `lucca-front` (voir « Installation » plus bas).

<Une phrase sur la version : « La <X.Y> ne casse rien : toutes les étapes sont facultatives. » ou « La <X.Y> casse <ceci> : l'étape <n> est obligatoire, les autres sont facultatives. »>

Utiliser `TodoWrite` pour suivre les étapes : chaque étape devient une tâche, marquée `completed` une fois appliquée, refusée ou sautée.

---

## Déroulé d'une étape

<Recopier tel quel le « Déroulé d'une étape » de lucca-front-migrate-22-2, en remplaçant seulement l'exemple de résumé par une étape de la version.>

---

## Démarrage

<Recopier tel quel.>

## Étape 0 — Pré-requis

1. Lire le `package.json` : `@lucca-front/ng` doit être en **<X.Y>.x** (ou en cours de montée vers <X.Y>), et `@angular/core` en <X>.
2. Si le projet est encore sur une version antérieure à <X.Y-1> : arrêter, et indiquer quels skills de migration jouer d'abord, dans l'ordre (<lucca-front-migrate-…>), puis relancer celui-ci.
3. Vérifier que l'arbre de travail git est propre : chaque étape doit pouvoir être relue et annulée séparément.
4. **Repérage** : pour chaque étape, chercher son motif de repérage (`Grep`, hors `node_modules` et `dist`), sans lancer de dry-run. C'est rapide, et ça sert seulement à annoncer le plan.

   | Étape                  | Motif de repérage               |
   | ---------------------- | ------------------------------- |
   | <type d'élément migré> | <motif, extensions de fichiers> |

5. **Annoncer le plan** : <recopier tel quel le point 5 de lucca-front-migrate-22-2>.

---

## Étapes

| #   | Étape                                                | Ce qui est migré                                                                                                           | Nature                                    | Rendu                 | Mode                       |
| --- | ---------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------- | --------------------- | -------------------------- |
| 1   | <Schematic `nom` (#PR) ou Remplacement manuel (#PR)> | <type d'élément : classes utilitaires CSS, composant CSS, inputs d'un composant Angular, variables CSS, types TypeScript…> | <Cassant / Déprécié / Migration de dette> | <Identique / Modifié> | <Facultatif / Obligatoire> |

<Une section par étape, dans l'ordre du tableau : forme « schematic » ou forme « manuelle » ci-dessous.>

---

## Validation

<Recopier tel quel.>

---

## Rapport

<Recopier tel quel, puis ajuster la ligne « Signalements sans remplacement » : les dépréciations sans remplacement de la version, ou retirer la ligne s'il n'y en a pas.>

---

## Installation dans un projet consommateur

<Recopier tel quel, en remplaçant le nom du skill.>
```

---

## Forme « schematic » d'une étape

Quand un schematic fait la migration. Modèle : les trois étapes de `lucca-front-migrate-22-2`.

```markdown
### Étape <n> — Schematic `<nom>`

**En bref** : <ce que fait l'étape en une phrase, en nommant le type d'élément migré et l'effet sur l'apparence>.

<Ce qui est déprécié ou supprimé, depuis quelle version, et si ça fonctionne toujours. Le tableau avant → après.>

<Ce que le schematic ne convertit pas, et pourquoi : ces cas vont dans le rapport final.>

**Analyser**

1. Vérifier que le schematic est livré : `node_modules/@lucca-front/ng/schematics/collection.json` doit contenir l'entrée `<nom>`. Sinon, sauter l'étape et indiquer qu'il faut monter `@lucca-front/ng` en <X.Y>.
2. Lancer `npx ng g @lucca-front/ng:<nom> --dryRun`. Rien n'est écrit. <Ce que donne la sortie : lignes `UPDATE`, ligne de synthèse (citer son format exact), avertissements. Les sorties qui signifient « rien à migrer ».>

**Résumer**

- <D'où viennent les lignes du tableau : la ligne de synthèse du schematic de préférence.>
- <Les cas laissés en l'état.>
- Aperçu : <quels exemples montrer, deux au plus>.
- <Le risque à annoncer en ligne ⚠, s'il y en a un.>

**Appliquer**

1. Lancer `npx ng g @lucca-front/ng:<nom>`.
2. <Lire le rapport ou l'avertissement du schematic, et ce qui va où dans le rapport final : écrans à contrôler, cas laissés en l'état regroupés par raison. Laisser le fichier de rapport en place.>
```

## Forme « manuelle » d'une étape

Quand aucun schematic ne couvre le changement et que l'auteur a choisi de ne pas en écrire. Modèle : `lucca-front-migrate-22-1` (étape `USER_POPOVER_IS_ACTIVATED`), mais avec le cycle de la 22.2.

```markdown
### Étape <n> — <Type d'élément migré>

**En bref** : <ce que fait l'étape en une phrase>.

<Ce qui change, depuis quelle version. Le tableau avant → après, exhaustif : c'est lui que l'agent applique.>

**Analyser**

1. Chercher <les motifs exacts, avec les extensions de fichiers et ce qu'il faut exclure (node_modules, dist, faux positifs connus : nom générique, homonyme d'une autre librairie…)>.
2. Compter les occurrences par ligne du tableau, et les fichiers.

**Résumer**

- Le tableau : une ligne par remplacement trouvé, avec le nombre.
- <Les cas que l'étape ne traite pas, et pourquoi.>
- Aperçu : un exemple réel, avant → après.

**Appliquer**

1. <Les remplacements, dans l'ordre où les faire. Ce qu'il ne faut jamais toucher.>
2. Vérifier qu'il ne reste aucune occurrence des anciens noms. Un reste va dans les cas laissés en l'état, avec sa raison.
```

Une étape manuelle porte souvent sur un volume réduit. Si le tableau dépasse une dizaine de lignes, ou si le remplacement peut se tromper sur un nom générique, proposer plutôt un schematic (voir `/release`, étape 5).
