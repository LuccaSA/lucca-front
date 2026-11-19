---
name: generate-migration-skill
description: "Crée le skill de migration d'une version de Lucca Front (`lucca-front-migrate-X-Y`), qui migre un projet consommateur étape par étape en demandant l'accord avant chaque modification. Recense les PR propres à la version, fait choisir les étapes à l'auteur, rédige chaque étape à partir de son schematic, assemble le skill depuis un gabarit, puis le simule sur un vrai projet consommateur avant d'ouvrir la PR. Appelé par /release (étape 5) une fois les migrations choisies, ou lancé à la main. Use when asked to create, draft or update a lucca-front-migrate-X-Y skill."
---

# generate-migration-skill

Ce skill crée `lucca-front-migrate-X-Y`, le skill qui migre un projet **consommateur** vers la mineure ou la majeure `X.Y`. Le modèle de référence est [`lucca-front-migrate-22-2`](../lucca-front-migrate-22-2/SKILL.md), et la démarche reprend sa construction : une étape à la fois, validée avec l'auteur, puis une simulation sur un vrai projet avant la PR.

Ce skill s'exécute dans `lucca-front`.

---

## Règles du skill généré

Validées en construisant la 22.2, avec les retours des équipes. Ne pas s'en écarter sans l'accord de l'auteur.

- **Le déroulé** : un message d'introduction (« j'analyse d'abord, sans rien modifier »), puis l'Étape 0, qui repère les étapes utiles et annonce le plan. Le compteur (`Étape 1/2`) ne compte que les étapes proposées.
- **Une décision par étape**, pour tout ce que l'étape fait : _Appliquer_ ou _Ne pas appliquer_. Jamais de choix partiel, jamais de relecture au cas par cas. Les cas incertains ou laissés en l'état vont dans le rapport final.
- **Un skill compagnon** (`label`…) n'est ni installé ni lancé. Le rapport final le cite en piste.
- **Le résumé d'une étape tient en cinq éléments** : un titre (compteur, type d'élément migré, mode, effet sur l'apparence), une phrase (quoi et pourquoi, depuis quelle version c'est déprécié), un tableau `avant → après` / nombre, une ligne de totaux (avec une ligne `⚠` seulement si un risque doit être connu), et un aperçu d'un ou deux exemples réels.
- **Toujours nommer le type d'élément migré** : classe utilitaire CSS, composant, input d'un composant Angular, variable CSS, type TypeScript… « Taille de texte » seul ne dit rien.
- _**Voir le détail**_ n'est proposé que si l'étape touche plusieurs fichiers.
- **Les chiffres viennent du schematic** (sa ligne de synthèse en dry-run), pas d'un `grep` : un `grep` compte aussi ce que le schematic ne convertira pas. Si la synthèse ne détaille pas chaque remplacement, ou si une raison de non-conversion est obscure, corriger le schematic (PR `fix` séparée) plutôt que de compenser dans le skill.
- **Les rapports des schematics restent à la racine** du projet pour le détail. Le rapport final regroupe les cas par raison et rappelle de supprimer ces fichiers avant de commiter.
- **Par défaut, toutes les étapes sont facultatives.** Une étape n'est obligatoire que si l'auteur le décide, en général pour un changement cassant.
- **Les migrations de dette se reconduisent** d'une version à l'autre : l'objectif est de réduire petit à petit le nombre de composants dépréciés dans les projets, et beaucoup de projets n'appliquent pas tout du premier coup. Le skill `X.Y` reprend donc les étapes du skill précédent qui s'appliquent encore, puis ajoute les nouvelles. Seul ce qui est propre à une version (changement cassant de cette version) ne se reconduit pas.

---

## Étape 1 — Entrées

1. La version `X.Y` à migrer.
2. **Appelé depuis `/release`** : l'étape 5 a déjà recensé et classé les changements, et l'auteur a choisi ce qui relève du skill de migration. Reprendre cette liste, y ajouter les étapes à reconduire du skill précédent (Étape 2, sans relancer le script), puis passer à l'Étape 3.
3. **Lancé à la main** : passer à l'Étape 2.
4. Si `.claude/skills/lucca-front-migrate-X-Y/` existe déjà, le lire : on le complète, on ne repart pas de zéro.
5. Lire le skill de la version précédente (`lucca-front-migrate-<X-Y-1>`, ou celui de la dernière mineure de la majeure précédente pour un `X.0`) : ses étapes sont candidates à la reconduction (Étape 2). Relire aussi les migrations écartées « pour plus tard » lors de sa construction, si elles ont été notées.

## Étape 2 — Recenser et choisir les étapes

```bash
git fetch -q origin
node .claude/skills/generate-migration-skill/scripts/list-version-prs.mjs --version X.Y
```

Le script liste les PR qui arrivent pour la première fois en `X.Y` (celles déjà livrées dans un patch de la mineure précédente sont exclues : les projets les ont déjà), et signale celles qui peuvent demander une migration : label (`Breaking`, `Deprecate`), titre, description fonctionnelle, schematic touché. Le signalement ratisse large : c'est le tri qui suit qui décide.

Pour chaque PR signalée, lire sa description (`gh pr view <n> --json body`). Y ajouter les étapes du skill précédent (Étape 1, point 5). Pour chacune, vérifier qu'elle s'applique encore : l'élément déprécié n'a pas été supprimé (à une majeure, sa migration devient alors un changement cassant, avec la PR de suppression), et le schematic existe toujours. Puis présenter un seul tableau, une ligne par changement :

| Colonne     | Contenu                                                                                                    |
| ----------- | ---------------------------------------------------------------------------------------------------------- |
| Changement  | Ce qui change pour un consommateur, en une phrase                                                          |
| PR          | `#n`                                                                                                       |
| Origine     | Nouvelle en `X.Y`, reconduite de `<version précédente>`, ou écartée « pour plus tard » la dernière fois    |
| Nature      | Cassant / Déprécié / Migration de dette (un schematic proposé par la version) / Rien                       |
| Proposition | Étape « schematic », étape « manuelle », signalement dans le rapport (déprécié sans remplacement), ou rien |

Par défaut, proposer de reconduire toutes les étapes de dette qui s'appliquent encore. Puis **demander à l'auteur** quelles étapes garder et dans quel ordre. Ce qu'il écarte « pour plus tard » est noté pour être reproposé au `/release` de la version. Ne rien écrire avant sa réponse.

## Étape 3 — Rédiger les étapes, une à la fois

Pour chaque étape retenue, dans l'ordre choisi, rédiger la section avec la forme qui convient du [gabarit](./references/template.md), puis **la montrer à l'auteur et attendre sa validation avant de passer à la suivante**. Poser une question dès qu'un point n'est pas tranché par le code.

**Étape « schematic »** :

1. Lire le schematic : `packages/ng/schematics/<nom>/index.ts` (ligne de synthèse, rapport, avertissements), `schema.json`, et le rapport attendu dans `tests/output/`.
2. Vérifier ce qu'il produit en dry-run : une ligne de synthèse qui détaille chaque remplacement, et des raisons de non-conversion compréhensibles par un consommateur. Sinon, proposer de corriger le schematic dans une PR `fix` séparée (voir les Règles), et rédiger l'étape d'après le comportement corrigé.
3. Relever la version de dépréciation dans `docs/life-cycle.md`.
4. S'il existe un skill compagnon (`.github/skills/deprecated-components/<nom>`), ne pas le lancer : le citer dans les pistes du rapport.

**Étape reconduite** : recopier sa section depuis le skill précédent, puis vérifier qu'elle décrit toujours le schematic tel qu'il est dans `X.Y` (ligne de synthèse, raisons, options) : un schematic a pu être corrigé entre-temps. Montrer à l'auteur seulement ce qui change ; une étape inchangée n'a pas besoin d'être revalidée.

**Étape « manuelle »** : établir la table `avant → après` exhaustive depuis le diff de la PR, avec les motifs de recherche et les faux positifs connus (nom générique, homonyme…). Si la table est longue ou le remplacement risqué, proposer plutôt un schematic.

## Étape 4 — Assembler le skill

1. Créer la branche `chore/migrate-X-Y-skill` depuis `origin/release/X.Y`.
2. Écrire `.claude/skills/lucca-front-migrate-X-Y/SKILL.md` à partir du [gabarit](./references/template.md) : parties communes recopiées depuis `lucca-front-migrate-22-2`, tableau des étapes, motifs de repérage de l'Étape 0, sections des étapes validées.
3. Relire le fichier en entier : un passage écrit pour une version précédente de l'étape (comptage par `grep` remplacé par la synthèse, étape retirée…) ne doit pas rester.

## Étape 5 — Simuler sur un projet consommateur

La version n'est pas encore publiée : on teste avec les schematics buildés en local, sans rien écrire dans le projet.

1. **Choisir un projet** avec l'auteur (lui demander où sont ses dépôts) : celui qui couvre le plus d'étapes, d'après les motifs de repérage. Un second projet où une étape n'a rien à migrer teste aussi l'annonce du plan.
2. `node build.js` dans `lucca-front`, pour compiler les schematics dans `dist/`.
3. Pour chaque étape, lancer le dry-run :

   ```bash
   node .claude/skills/generate-migration-skill/scripts/dry-run.mjs --project <chemin du projet> --schematic <nom> \
     [--dump <fichier ou rapport> --out <scratchpad>/<fichier>]
   ```

   `--dump` récupère le contenu qu'aurait un fichier après migration (un template pour l'aperçu, le rapport du schematic pour les raisons).

4. **Dérouler le skill comme l'utilisateur le verrait** : introduction, Étape 0, plan, puis chaque étape avec son résumé et sa vraie question (`AskUserQuestion`, préfixée `[Simulation]`). Ce qui relève de la simulation (version ignorée, application simulée) est signalé entre crochets. Rien n'est appliqué, quelle que soit la réponse.
5. Chaque retour de l'auteur se corrige dans le skill (ou dans le schematic), puis la simulation reprend **depuis le début**, pour que l'auteur voie le parcours complet.
6. Vérifier à la fin que le projet n'a pas bougé (`git status`).

## Étape 6 — PR

1. Commiter le skill, puis demander à l'auteur si la PR est prête à être relue (sinon `--draft`).
2. Ouvrir la PR vers `release/X.Y` : titre `chore: add the lucca-front-migrate-X-Y skill`, template par défaut, milestone `X.Y`, labels `:hammer: Technical` et `🤖 Produced by AI`. La description dit ce que fait le skill en une phrase, sur quels projets il a été simulé, et de quelles PR de schematic il dépend.
3. Les corrections de schematic de l'Étape 3 partent dans leurs propres PR `fix`, avec `/recette-pr-fix`.
