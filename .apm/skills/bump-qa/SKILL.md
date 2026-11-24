---
name: bump-qa
description: 'Fait tourner la QA des principaux projets consommateurs sur une version de Lucca Front (`/bump-qa 22.2.0`, `/bump-qa 22.2.0-rc.1`) : ouvre une PR draft de montée de version dans Cleemy.Procurement, Poplee.Talent, Figgo, Poplee.Engagement et Talent.Training, lance la QA Webservice (🎮) une fois leur CI front verte, fait le rapport des runs, puis ferme les PR à la demande.'
argument-hint: '<version> [status|close] (ex. 22.2.0, 22.2.0-rc.1)'
disable-model-invocation: true
---

# Skill : bump-qa

Vérifie qu'une version de Lucca Front ne casse pas les projets qui l'utilisent le plus, avant de la diffuser : chaque projet reçoit une PR draft qui monte LF à **`$ARGUMENTS`**, sa CI front joue le build, puis sa QA Webservice joue les tests E2E, UI diff et Swagger diff.

Tout passe par un script :

```bash
node .claude/skills/bump-qa/scripts/bump-qa.mjs (open|status|close) <version> [--repos A,B]
```

Le travail se fait en trois temps, séparés par l'attente de la CI et de la QA. Ne jamais attendre en boucle : rendre la main avec l'état, et proposer de relancer plus tard.

## Prérequis

- `gh` authentifié, avec les droits de push sur les cinq dépôts.
- `git` configuré pour signer les commits (LuccaSA impose les commits signés).
- npm : le lockfile de chaque projet est recalculé avec `npm install --package-lock-only`. Les paquets déjà verrouillés ne sont pas retéléchargés, mais si npm doit relire un paquet privé `@lucca/*`, un `E404` veut dire que le token npm de `~/.npmrc` n'y donne pas accès.
- Pour le rapport : `lucca dd api` (devtools ≥ 5.35.0) et WARP. Les devtools s'installent dans `~/.dotnet/tools`, que le shell de l'agent n'a pas toujours dans son `PATH` : si le rapport répond `cannot run lucca` alors que `lucca --version` marche dans un terminal, préfixer la commande par `PATH="$HOME/.dotnet/tools:$PATH"`.

## 1. Ouvrir les PR (`open`)

La version doit être publiée sur npm pour `@lucca-front/ng`, `scss`, `icons` et `@lucca/prisme` : la QA installe depuis le registre. Une pré-version (`22.2.0-rc.1`) convient.

D'abord à blanc, pour montrer à l'utilisateur ce qui va se passer :

```bash
node .claude/skills/bump-qa/scripts/bump-qa.mjs open <version> --dry-run
```

Pour chaque dépôt, le script clone la branche par défaut, épingle les paquets LF de chaque `package.json` qui les déclare sur la version exacte, et recalcule le lockfile qui gouverne chacun, une seule fois, même s'il est dans un dossier parent (workspaces). La version est épinglée sans le préfixe du dépôt (`~`, `^`), car npm pourrait sinon résoudre une version plus récente que celle testée ; ces PR ne sont jamais mergées. Le script vérifie ensuite que le lockfile ne résout que la version demandée, et s'arrête sinon. Les paquets LF publiés se déclarent en peers exacts les uns des autres (`@lucca-front/icons@22.1.2` exige `@lucca/prisme@22.1.2`), et npm ne sait pas déplacer ce groupe verrouillé paquet par paquet : le script retire donc les quatre paquets LF du lockfile avant de le recalculer. Un conflit de peers avec une autre dépendance du projet apparaît à cette étape, avant tout push. Il saute un dépôt avec sa raison quand :

- ce dépôt est sur une autre majeure de LF (une majeure se migre, elle ne se bump pas) ;
- il est déjà sur la version ;
- la branche `chore/lucca-front-<version>` existe déjà.

**S'arrêter et demander confirmation** en montrant la sortie à blanc : la suite pousse une branche et ouvre une PR dans chaque dépôt, et les équipes des BU la voient. La même confirmation couvre le 🎮 de l'étape 2. Puis :

```bash
node .claude/skills/bump-qa/scripts/bump-qa.mjs open <version>
```

Chaque PR est un draft labellisé `:hammer: Technical`, avec un commit signé `chore(deps): update lucca-front to <version>` et une description qui passe le contrôle c-3po des dépôts qui l'activent.

## 2. Suivre et lancer la QA (`status`)

```bash
node .claude/skills/bump-qa/scripts/bump-qa.mjs status <version> --trigger
```

Le tableau donne, par dépôt, la PR, l'état de `front / ci` (build, lint et tests du front), l'état de la QA et le run dd. Avec `--trigger`, le script poste le 🎮 sur chaque PR dont `front / ci` est vert et qui n'en a pas encore : on ne lance jamais une QA sur un front qui ne builde pas.

- `front / ci` en échec : c'est le résultat le plus important, la version casse le build de ce projet. Donner le lien du job et lire son log (`gh run view --job <id> --log-failed --repo LuccaSA/<repo>`).
- `missing` : la CI n'a pas encore démarré.
- `queued` : le 🎮 est posté, le run QA n'a pas encore commencé.
- `running` puis `done` : le check `QA Webservice` de la PR suit le run dd.

Code de sortie 3 tant qu'une QA n'est pas finie. Sur les 100 derniers runs mesurés le 2026-11-17, la QA a duré 9 min en médiane et 23 min au 90ᵉ percentile : proposer de relancer `status` dans un quart d'heure, après la CI front.

## 3. Faire le rapport

Une fois toutes les QA à `done`, faire le rapport de chaque run dd donné par `status`.

- Avec le skill `dd-qa-report` (ai-tools) : `node <dd-qa-report>/scripts/qa-report.mts --run <run>` pour chaque run. Il classe chaque échec en nouveau, déjà en échec sur la branche par défaut, ou corrigé, et dit combien d'autres branches échouent sur le même test.
- Sans lui : `lucca dd api api/qa/v2/test-run/<run>` pour l'état et les compteurs, puis `api/qa/test-runs/<run>/e2e-results`, `…/ui-diff-results` et `…/swagger-diff-results` pour les tests ; un test échoue quand son `status` n'est ni `Passed` ni `Skipped`.

Puis une synthèse en tête : par dépôt, CI front, nombre d'échecs nouveaux par suite, et ce qui pointe vers LF. Un UI diff qui échoue sur un écran qui utilise un composant changé dans cette version de LF est attendu : le dire, sans le classer en régression. Seul l'utilisateur tranche entre changement voulu et régression.

## 4. Fermer (`close`)

Sur demande de l'utilisateur seulement, une fois le rapport fait :

```bash
node .claude/skills/bump-qa/scripts/bump-qa.mjs close <version>
```

Ferme chaque PR ouverte sur `chore/lucca-front-<version>` et supprime sa branche.

## Tests du script

```bash
node --test .claude/skills/bump-qa/scripts/bump-qa.test.mjs
```

`status` et `close` sont testés avec un faux `gh` sur le `PATH`. `open` n'a pas de test de bout en bout : sa mise à jour des `package.json` est testée dans `lib.mjs`, le reste se vérifie avec `--dry-run`.
