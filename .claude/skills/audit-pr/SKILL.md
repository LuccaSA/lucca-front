---
name: audit-pr
description: "Résume une pull request en clair : sa raison d'être, les points de vigilance s'il y en a, et la marche à suivre pour la tester à la main. Se déclenche quand l'utilisateur écrit « audit » suivi d'une URL de PR (ou d'un numéro de PR), ou demande un audit / une relecture de haut niveau d'une PR ou de la branche courante. Sans argument, audite la branche locale avant ouverture de la PR. Ce n'est pas une revue de code ligne à ligne (voir /code-review pour ça)."
argument-hint: "[pr-url | pr-number]"
---

# audit-pr

Objectif : donner à un relecteur humain, en une lecture de trente secondes, **pourquoi cette PR existe**, **ce sur quoi il doit ouvrir l'œil**, et **comment la vérifier lui-même**.

Ce n'est pas une revue de code : ne pas signaler les nits, ne pas énumérer le diff, ne pas ouvrir de discussion sur le style. Si un vrai problème de correction saute aux yeux, le mentionner en une ligne dans les points de vigilance et proposer `/code-review` pour aller plus loin.

## 1. Récupérer la PR (ou la branche locale)

L'argument est une URL (`https://github.com/<owner>/<repo>/pull/<n>`) ou un simple numéro — dans ce cas, la PR est dans le repo courant.

**Sans argument — mode branche locale** (PR pas encore ouverte, typiquement appelé par `recette-pr-fix`) : le diff est celui de la branche courante contre sa base, modifications non commitées comprises. La base est celle qu'affiche `branch-context.mjs` (recette-pr-fix) si l'appelant l'a déjà lancé, sinon `origin/master`.

```bash
git diff --stat $(git merge-base <base> HEAD)
git diff $(git merge-base <base> HEAD)
git log --format='%s%n%b' $(git merge-base <base> HEAD)..HEAD
```

Il n'y a ni description, ni labels, ni reviews, ni preview : l'intention se reconstitue depuis les messages de commit et le diff, sans le signaler comme un manque. Sauter les signaux ci-dessous qui n'existent pas encore.

Mode PR :

```bash
gh pr view <url|numéro> --json number,title,body,author,state,isDraft,baseRefName,headRefName,labels,url,additions,deletions,changedFiles,reviews,comments
gh pr diff <numéro>
```

`gh pr diff` n'accepte qu'un seul argument : pour filtrer, écrire le diff complet dans un fichier du scratchpad et l'y découper. Si le diff dépasse quelques centaines de lignes, cadrer d'abord avec `gh pr diff --name-only`, puis ne lire que les fichiers qui portent le comportement (pas les stories, snapshots, translations, lockfiles).

Signaux à ne pas manquer :

- la **description** de la PR (premier bloc = description fonctionnelle destinée au changelog) et le ticket ou la PR liée s'il y en a ;
- la **base** : `master` = fix, `release/vX.X` = feature du cycle en cours ;
- les **labels** (`FIX`, `Feature`, `Technical`, `🤖 Produced by AI`) et l'état (draft, reviews en attente) ;
- les **commentaires automatiques** : celui de `github-actions` donne l'URL de la preview Storybook déployée pour la PR — c'est le moyen de test le moins coûteux, à citer en priorité ;
- les reviews déjà présentes : ce qui a déjà été discuté n'a pas à être redécouvert.

Si la description est vide ou inutilisable, reconstituer l'intention depuis le diff et **le dire explicitement** — c'est une information utile pour l'auteur.

## 2. Comprendre la raison d'être

Répondre à : quel problème l'utilisateur final ou le développeur consommateur rencontrait-il avant cette PR ? Formuler en termes d'usage, pas d'implémentation. « Les options désactivées d'un select n'étaient pas annoncées par les lecteurs d'écran » plutôt que « ajout de `aria-disabled` sur `selectable-item` ».

Aller lire le code autour du diff si nécessaire pour comprendre l'état antérieur — le diff seul ne dit pas toujours ce qui était cassé.

## 3. Points de vigilance

**Section conditionnelle : ne l'écrire que s'il y a réellement quelque chose à signaler.** Un fix local, évident et couvert par un spec n'a aucun point de vigilance — dans ce cas, omettre la section entièrement plutôt que d'écrire « rien à signaler » ou de fabriquer un risque théorique. Ne jamais lister les bénéfices de la PR : ils découlent de la raison d'être.

Trois points maximum, chacun en une à deux phrases : un **risque concret** pour le relecteur, pas une observation. Le critère de sélection est « si ceci se passe mal, quelqu'un s'en aperçoit en production ou à la review suivante ».

Chaque point commence par un emoji de criticité — les couleurs des niveaux High / Medium / Low de Copilot code review —, et les points sont triés du plus critique au moins critique :

- 🔴 **Bloquant** : à traiter avant de merger. Bug de correction avéré, breaking change non documenté pour les consommateurs, régression d'accessibilité, fuite de données, chaîne de production cassée.
- 🟡 **À surveiller** : la PR peut partir, mais quelqu'un doit avoir vérifié. Cas de bord non couvert, effet de bord sur un composant partagé, comportement retiré sans mention dans le changelog, changement de comportement sans spec ni story.
- 🔵 **Mineur** : à noter sans bloquer. Doc ou JSDoc inexacte, erreur d'aiguillage de branche ou de label, incohérence de nommage, dette assumée.

En cas d'hésitation entre deux niveaux, prendre le moins grave : un audit qui crie au rouge à chaque PR ne sert plus à rien. Un point déjà corrigé dans un commit ultérieur de la PR redescend d'un cran (souvent en 🔵) plutôt que de disparaître, s'il reste non couvert par un test.

Pistes à examiner :

- **Contrat public** : un input/output ajouté, renommé ou dont le type change, une classe CSS ou un token supprimé → breaking change pour les consommateurs.
- **Dépendance externe** : la PR suppose un déploiement, une PR liée, une version d'API ou un asset CDN déjà en ligne. Si ce n'est pas le cas, qu'est-ce qui casse et jusqu'où ?
- **Effet de bord hors périmètre** : le changement touche un composant partagé (`core-select`, `core/*`, SCSS commun) ou modifie un défaut appliqué à d'autres cas que celui visé.
- **Comportement retiré silencieusement** : fallback supprimé, cas limite plus géré, support navigateur réduit — surtout quand ce n'est pas dans la description, donc absent du changelog.
- **Couverture** : changement de comportement sans spec ni story, alors que le composant en a par ailleurs.
- **Accessibilité, i18n** : clavier et lecteurs d'écran sont prioritaires sur ce repo ; une chaîne codée en dur hors `translations.ts` est un manque.
- **Convention de branche** : une PR labellisée `Feature` basée sur `master` (ou l'inverse) mérite une ligne — souvent une erreur d'aiguillage.

## 4. Comment tester

**Décrire, ne pas exécuter.** Pas de `git checkout`, pas de `npm` lancé, pas de Storybook démarré ni tué : l'utilisateur garde la main sur son working tree et sur le port 6006.

Trois à cinq étapes numérotées, une ligne chacune, sans justification ni commentaire :

1. **Par où entrer** : l'URL de la preview Storybook de la PR si le bot l'a postée, sinon `gh pr checkout <numéro>` + `npm start`. Une seule option, la moins coûteuse. En mode branche locale : « la preview Storybook une fois la PR ouverte ».
2. **Où regarder** : le nom exact de la story, vérifié comme existant dans le diff ou dans `stories/` — sinon dire qu'il n'y en a pas.
3. **Quoi vérifier** : deux ou trois observations, dont un cas de non-régression (clavier, lecteur d'écran, RTL, contenu long, valeur vide, disabled). Une observation = un résultat attendu, pas un paragraphe.
4. La commande de spec ciblée **seulement si** la PR touche un spec : `npx vitest run <chemin>`. Ne pas mentionner `npm run lint` ni les commandes sans rapport avec le diff.

## 5. Format de la réponse

Markdown dans le terminal, en français, court. Pas de préambule, pas de conclusion, pas de récapitulatif du diff.

```markdown
**#<numéro> — <titre>** · <auteur> · base `<branche>` · <n> fichiers
← en mode branche locale : **`<branche>`** · base `<base>` · <n> fichiers

### Pourquoi
<une à trois phrases, en termes d'usage>

### Points de vigilance   ← section omise s'il n'y a rien de concret à signaler
- 🔴 <risque bloquant, une à deux phrases>
- 🟡 <risque à surveiller>
- 🔵 <point mineur>

### Comment tester
1. <par où entrer>
2. <où regarder>
3. <quoi vérifier>
```

Viser une vingtaine de lignes. Au-delà, la PR mérite une vraie revue, pas un audit.
