---
name: recette-pr-fix
description: "Recette d'une branche de fix Lucca Front avant ouverture de la PR : contexte de la branche et conventions du repo (script), lint et tests ciblés sur le diff, points de vigilance et marche à suivre pour tester. Rapide (~30 s) : build et suites complètes restent à la CI. Une fois la PR ouverte, preuves visuelles avant/après depuis les previews Storybook, et rejeu du bug dans Chromium quand aucun spec ne le reproduit, publiés en commentaire de la PR. À lancer avant tout `gh pr create` d'une branche fix/*, ou quand l'utilisateur demande une recette / une vérification de sa branche de fix."
argument-hint: "[--base origin/<branche>]"
---

# recette-pr-fix

Objectif : en **trente secondes**, dire à l'auteur d'un fix si sa branche est prête à partir en PR, et sinon quoi corriger. Le build, le lint complet, la suite de tests et les e2e sont rejoués par la CI : ne jamais les lancer ici.

Périmètre : branches de fix (`fix/*`), quelle que soit leur base (`master`, `release/*`, `*-lts`). Ne rien corriger ni commiter de soi-même : rapporter, puis proposer.

## 1. Contexte de la branche et conventions du repo (≈ 1 s)

```bash
node .claude/skills/recette-pr-fix/scripts/branch-context.mjs [--base origin/<branche>]
```

Le script compare l'état courant (commité, non commité, non suivi) à la base — celle de la PR si elle existe, sinon la plus proche parmi `master`, `release/*`, `*-lts`. Il sort une ligne par constat (`✅` `⚠️` `❌` `ℹ️`) et le code 1 s'il y a au moins un `❌`. Ses lignes `ℹ️` donnent la base, les entrypoints et composants SCSS touchés : les réutiliser, ne pas les recalculer.

Ne pas revérifier à la main ce que le script couvre (nom de branche, présence d'un test, code partagé touché).

## 2. Lint, tests et couverture du fix (en arrière-plan, ≈ 15 s)

Lancer **en arrière-plan** (`run_in_background`), dès la sortie du script, les deux commandes ci-dessous en parallèle, et passer à l'étape 3 sans attendre.

**Couverture du fix** — les specs touchés par la branche doivent échouer sans le fix (exécutés contre les sources de la base, dans un worktree temporaire) :

```bash
node .claude/skills/recette-pr-fix/scripts/regression-check.mjs --base <base>
```

Il sort `✅` (au moins un test échoue sans le fix), `⚠️` (un test ajouté ou modifié passe aussi sans le fix) ou `ℹ️` (sauté ou non évaluable : spec qui ne charge pas sur la base, diff sans specs…). Un `ℹ️` n'est pas un défaut.

**Lint et tests ciblés :**

```bash
MB=$(git merge-base <base> HEAD)
FILES=$( (git diff --name-only --diff-filter=d $MB; git ls-files --others --exclude-standard) | sort -u)
TS=$(echo "$FILES" | grep -E '^packages/.+\.(ts|mjs|js)$')
SCSS=$(echo "$FILES" | grep -E '^packages/.+\.scss$')
[ -n "$TS" ] && npx eslint --quiet ${=TS}
[ -n "$SCSS" ] && npx stylelint ${=SCSS}
[ -n "$TS" ] && npx vitest related --run ${=TS}
```

(`${=VAR}` : découpage en mots sous zsh ; sous bash, `$VAR` suffit.)

`vitest related` reçoit sources **et** specs : il lance les specs qui dépendent des sources modifiées, et les specs modifiés eux-mêmes — y compris quand le fix ne touche que du HTML ou du SCSS. Sauter une commande dont la liste est vide. Pas de build, pas de `tsc` (la config `tsconfig.src.json` remonte des erreurs de `rootDir` sans rapport avec le diff) : la compilation est vérifiée par la CI.

## 3. Points de vigilance et test manuel

Appliquer le skill `audit-pr` **en mode branche locale** (sans argument), avec la base donnée par le script, en ne produisant que deux de ses sections :

- **Points de vigilance** — mêmes critères et même échelle 🔴🟡🔵, trois points au maximum, section omise s'il n'y a rien. Pour un fix, regarder en priorité si le fix change un comportement pour d'autres cas que celui visé. La couverture du cas corrigé est donnée par `regression-check` : ne pas la réévaluer à la main. Ne pas proposer de backport.
- **Comment tester** — trois à cinq étapes, utilisables telles quelles dans la description de la PR.

Ne pas répéter un constat déjà fait par le script. Ne lire au-delà du diff que si c'est nécessaire pour comprendre le comportement antérieur.

## 4. Rapport

Attendre la fin de l'étape 2, puis répondre en français, court, sans préambule :

```markdown
**Recette `<branche>`** · base `<base>` · <n> fichiers · <verdict>

### Vérifications
<lignes ❌ et ⚠️ du script, telles quelles ; « ✅ Conventions du repo » s'il n'y en a aucune>
<✅ ou ❌ Lint (eslint/stylelint) — en cas d'échec, les erreurs utiles, pas le log complet>
<✅ ou ❌ Tests (n fichiers, n tests) — en cas d'échec, le test et l'assertion>
<ligne ✅ / ⚠️ de regression-check, ou rien si ℹ️ « sauté »>

### Points de vigilance   ← omise s'il n'y a rien
- 🟡 …

### Comment tester
1. …

### Non vérifié
- <ce que la recette n'a pas contrôlé et pourquoi : build et e2e (CI), preuve visuelle à venir ou sans objet, état ou thème non capturé…>
```

« Non vérifié » est toujours présent : un manque passé sous silence se lit comme « couvert ».

Verdict, en un mot : **✅ Prête** (aucun ❌, aucun 🔴), **⚠️ À vérifier** (des ⚠️ ou 🟡 seulement), **❌ À corriger** (au moins un ❌ ou 🔴).

Si le verdict est ❌, ne pas ouvrir la PR : proposer les corrections et attendre l'accord de l'utilisateur. Sinon, la PR peut être ouverte (template `bugfix.md`), en traduisant « Comment tester » en anglais dans sa section `### How to test` (second bloc). Dans la checklist « Recette », ne cocher qu'une case, et seulement si elle est prouvée : « A test fails without the fix, or a before/after visual proof is posted » — `regression-check` en ✅, ou, pour un fix de rendu, une fois le commentaire « Visual proof » publié (étape 5). Les autres cases (cause identifiée, bug non reproductible sur la preview, absence de régression et UI diff) sont des constats de l'auteur : les lui laisser.

## 5. Preuves visuelles (après ouverture de la PR)

**Seulement si le rendu change** : SCSS, template ou style d'un composant. Un fix de pure logique (aucun rendu modifié) n'a pas de capture : sa preuve est `regression-check`, et la recette le dit dans « Non vérifié » plutôt que de publier une capture qui ne prouve rien.

Prérequis : `gh` ≥ 2.99.0 (`gh pr comment --help | grep -q -- --attach`). En dessous, laisser les fichiers à l'utilisateur pour un glisser-déposer et le dire.

1. **Attendre la preview** de la PR, en arrière-plan, sans bloquer l'utilisateur : le job `Deploy Lucca Front staging` doit avoir **réussi sur le dernier commit** (environ 3 à 4 minutes). Le job `qa` du même workflow ne compte pas.

   ```bash
   SHA=$(git rev-parse HEAD); STATE=timeout; for i in $(seq 40); do
     RUN=$(gh run list --workflow deploy-staging.yml --commit $SHA --json databaseId --jq '.[0].databaseId')
     [ -n "$RUN" ] && S=$(gh run view $RUN --json jobs --jq '.jobs[] | select(.name == "Deploy Lucca Front staging") | if .status == "completed" then .conclusion else .status end')
     [[ "$S" == success || "$S" == failure || "$S" == cancelled || "$S" == skipped ]] && { STATE=$S; break; }; sleep 20; done; echo "deploy: $STATE"
   ```

   **Ne capturer que sur `deploy: success`.** Sur un échec, une annulation ou `timeout` (environ 13 minutes), la preview peut encore montrer un commit précédent : ne rien publier, et le dire dans « Non vérifié ».

2. **URLs** : l'après est la preview de la PR, `<domaine>/PR-<n>`, le domaine se lit dans le commentaire du bot (« Storybook preview deployed »). L'avant est `<domaine>/master` **seulement si la base est `master`** : `release/*` et `*-lts` ne sont pas déployés, dans ce cas capturer l'après seul et le dire dans « Non vérifié ».
3. **Choisir une à trois stories** parmi celles des composants touchés (lignes `ℹ️` de `branch-context`) — la story de doc HTML&CSS qui montre la variante concernée d'abord, la story QA ensuite :

   ```bash
   node .claude/skills/recette-pr-fix/scripts/visual-proof.mjs --list <after> <composant>...
   ```

4. **Capturer** dans un dossier du scratchpad, **en chemin absolu** :

   ```bash
   node .claude/skills/recette-pr-fix/scripts/visual-proof.mjs --before <before> --after <after> --out <dossier> [--hover <sélecteur>] [--touch] <storyId>...
   ```

   Même cadrage pour l'avant et l'après, recadré sur le contenu peint, overlays compris (tooltips, menus). `--hover` survole un élément avant la capture — il s'applique à toutes les stories de l'appel : un appel par sélecteur ; `--touch` émule un appareil tactile (`hover: none`). Un fix d'état (survol, focus, tactile) ne se voit pas sur une capture au repos : choisir les options qui reproduisent le cas corrigé, et ajouter le cas témoin qui doit rester identique (par exemple `--hover` sans `--touch`).

5. **Regarder chaque image** avant d'écrire sa légende. Une paire marquée `⚠️ identical` n'est pas une preuve du changement : changer d'état ou de story, ou la garder seulement comme cas témoin (« inchangé à la souris »). `❌ not found` : la story n'existe pas dans cette preview. `❌ hover … failed` : le sélecteur n'a pas pu être survolé, rien n'est capturé pour cette story — corriger le sélecteur plutôt que de publier un état au repos.
6. **Rejouer le bug (facultatif)** — pour un fix qu'aucun spec ne reproduit (`regression-check` sauté ou non évaluable) et dont le bug tient à un comportement du navigateur : focus, clavier, overlay, survol, mise en page réelle, cycle de vie Storybook. Écrire un scénario d'après « Comment tester », dans `<dossier>/scenario.mjs` :

   ```js
   // <the bug, in one sentence>
   export default async function ({ page, consoleErrors, settle }) {
   	// act on the rendered story, then read an observable fact: computed style, focused element, DOM, console errors
   	await settle(); // finishes CSS transitions before reading computed styles
   	return { reproduced: <the bug happened>, detail: '<what was observed>' };
   }
   ```

   ```bash
   node .claude/skills/recette-pr-fix/scripts/bug-repro.mjs --before <before> --after <after> --story <storyId> --scenario <dossier>/scenario.mjs [--touch] --video <dossier>
   ```

   Lancer le scénario **dans les conditions du bug** (`--touch` pour un bug tactile) : hors de ces conditions, il ne décrit plus un bug. Lire le verdict :
   - `✅ Reproduced without the fix, no longer with it` : la preuve est faite, la vidéo des deux côtés rejoint le commentaire ;
   - `⚠️ … does not reproduce the bug without the fix` : le scénario ne prouve rien, quel que soit le résultat avec le fix — le corriger (souvent : lire l'état avant la fin d'une transition, sans `settle()`) ou y renoncer, jamais le publier ;
   - `❌ … still reproduced with the fix` : le fix ne corrige pas ce cas, ou le scénario lit autre chose que le bug — à creuser avant tout ;
   - `ℹ️ … no "before"` : base non déployée, la reproduction seule ne prouve rien.

   Un scénario en ✅ qui protégerait durablement contre la régression mérite de devenir un test e2e : le proposer à l'utilisateur, via le skill `generate-e2e-test` (`stories/e2e/`), pour que la CI le rejoue à chaque PR.
7. **Publier** en commentaire de la PR, en anglais, après avoir montré le brouillon à l'utilisateur et obtenu son accord. Écrire `<dossier>/comment.md`, puis :

   ```bash
   gh pr comment <n> --body-file <dossier>/comment.md --attach <dossier>/<id>--before.png --attach <dossier>/<id>--after.png [--attach <dossier>/<id>--before.webm --attach <dossier>/<id>--after.webm]
   ```

   Chaque image ou vidéo est référencée dans le body **avec exactement le même chemin absolu** que dans `--attach` : `gh` remplace la référence par l'URL du fichier envoyé. Un fichier attaché mais non référencé, ou référencé avec un autre chemin (`~`, chemin relatif), atterrit en fin de commentaire. Une vidéo n'est lue que si sa référence est **seule dans son paragraphe** (pas dans un tableau), et doit rester sous 10 Mo.

Anatomie du commentaire :

```markdown
## Visual proof

**1. <what the reviewer should check, e.g. "On touch devices, a tapped primary button no longer keeps its hover color">**

| Before (`master`) | After (this PR) |
| --- | --- |
| ![](<dossier>/<id>--before.png) | ![](<dossier>/<id>--after.png) |

**2. <control case, e.g. "Unchanged with a mouse">** …

<sub>Captured from the Storybook previews `master` and `PR-<n>` · story `<storyId>` · 1280×800 @2x · <options: hover `.button`, touch emulation></sub>

**Bug replay** ← only with a ✅ replay: <scenario in one sentence, and what was observed on each side>

Before (`master`):

![](<dossier>/<id>--before.webm)

After (this PR):

![](<dossier>/<id>--after.webm)

**Not covered:** <states, themes or stories not captured, and why>
```

Une légende par capture, qui dit **ce que le relecteur doit vérifier** ; l'environnement et les options de capture en pied, pour que n'importe qui puisse la refaire.
