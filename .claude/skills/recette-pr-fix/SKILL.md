---
name: recette-pr-fix
description: "Recette d'une branche de fix Lucca Front avant ouverture de la PR : contexte de la branche et conventions du repo (script), lint et tests ciblés sur le diff, points de vigilance et marche à suivre pour tester. Rapide (~30 s) : build et suites complètes restent à la CI. Une fois la PR ouverte, preuve du fix dans Chromium depuis les previews Storybook — le bug rejoué avant/après, prouvé par capture ou par valeurs observées (style calculé, ARIA, focus) quand une capture ne montre rien, avec cas témoin, audit d'accessibilité axe et erreurs console —, publiée en commentaire de la PR. À lancer avant tout `gh pr create` d'une branche fix/*, ou quand l'utilisateur demande une recette / une vérification de sa branche de fix."
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

- **Points de vigilance** — mêmes critères et même échelle 🔴🟡🔵, trois points au maximum, section omise s'il n'y a rien. Pour un fix, regarder en priorité si le diff traite bien le cas décrit par l'issue liée (ligne `ℹ️ Linked issue` du script ; sans issue, l'utilisateur peut en donner une avec `--issue <n>`), puis s'il change un comportement pour d'autres cas que celui visé. La couverture du cas corrigé est donnée par `regression-check` : ne pas la réévaluer à la main. Ne pas proposer de backport.
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
- <ce que la recette n'a pas contrôlé et pourquoi : build et e2e (CI), preuve du fix à venir ou sans objet, état ou thème non prouvé…>
```

« Non vérifié » est toujours présent : un manque passé sous silence se lit comme « couvert ».

Verdict, en un mot : **✅ Prête** (aucun ❌, aucun 🔴), **⚠️ À vérifier** (des ⚠️ ou 🟡 seulement), **❌ À corriger** (au moins un ❌ ou 🔴).

Si le verdict est ❌, ne pas ouvrir la PR : proposer les corrections et attendre l'accord de l'utilisateur. Sinon, la PR peut être ouverte (template `bugfix.md`), en traduisant « Comment tester » en anglais dans sa section `### How to test` (second bloc). Dans la checklist « Recette », ne cocher qu'une case, et seulement si elle est prouvée : « A test fails without the fix, or a before/after visual proof is posted » — `regression-check` en ✅, ou une fois publié le commentaire « Visual proof » d'un cas corrigé en ✅ (étape 5). Les autres cases (cause identifiée, bug non reproductible sur la preview, absence de régression et UI diff) sont des constats de l'auteur : les lui laisser.

## 5. Preuve du fix (après ouverture de la PR)

**Enchaîner sans demander.** Dans la même réponse que `gh pr create`, lancer l'attente de la preview (étape 1) en arrière-plan, et préparer les scénarios pendant le déploiement. Ne pas finir le tour sur une proposition (« je peux faire la preuve une fois la preview déployée ») : l'attente ne justifie pas de s'arrêter. Seule la publication du commentaire (étape 7) attend l'accord de l'utilisateur.

Dans Chromium, sur les previews Storybook de la base et de la PR, un seul script prouve trois choses : **le fix change ce qu'il doit changer** (cas corrigé), **et rien d'autre** (cas témoin), **sans nouvelle violation d'accessibilité ni erreur console**. Il met la story dans l'état du bug, puis collecte toutes les preuves dans cet état — capture, valeurs observées, audit axe, erreurs console, vidéo sur demande — et dit lesquelles diffèrent. Quel que soit le fix (rendu, curseur, ARIA, focus, comportement), l'une d'elles peut le montrer.

**Ne jamais s'arrêter sur un contrôle.** Chaque appel finit sur un verdict et sa cause. Un état qui échoue ou ne prouve rien va dans « Non vérifié » avec sa cause, et la recette passe au suivant ; le commentaire publie ce qui a abouti. Une capture identique n'est pas une impasse : c'est le signal d'observer autre chose (étape 4).

**Quels fix** : tout fix qui touche un template, du SCSS, des attributs ARIA ou un comportement dans le navigateur. Un fix de pure logique sans effet visible dans une story (service, utilitaire) a pour preuve `regression-check` : le dire dans « Non vérifié ». Dès qu'une story du composant existe, la lancer au moins au repos, sans scénario : son verdict `⚠️ No observable difference` est alors attendu et ne se rapporte pas, mais ses lignes `a11y` et `console` comptent.

Prérequis : `gh` ≥ 2.99.0 (`gh pr comment --help | grep -q -- --attach`). En dessous, laisser les fichiers à l'utilisateur pour un glisser-déposer et le dire. Si Chromium ne se lance pas : `npx playwright install chromium` ; si c'est le sandbox qui bloque le lancement ou le réseau, demander à l'utilisateur de relancer hors sandbox plutôt que d'abandonner.

1. **Attendre la preview** de la PR, en arrière-plan, sans bloquer l'utilisateur : le job `Deploy Lucca Front staging` doit avoir **réussi sur le dernier commit** (environ 3 à 4 minutes). Le job `qa` du même workflow ne compte pas.

   ```bash
   SHA=$(git rev-parse HEAD); STATE=timeout; for i in $(seq 40); do
     RUN=$(gh run list --workflow deploy-staging.yml --commit $SHA --json databaseId --jq '.[0].databaseId')
     [ -n "$RUN" ] && S=$(gh run view $RUN --json jobs --jq '.jobs[] | select(.name == "Deploy Lucca Front staging") | if .status == "completed" then .conclusion else .status end')
     [[ "$S" == success || "$S" == failure || "$S" == cancelled || "$S" == skipped ]] && { STATE=$S; break; }; sleep 20; done; echo "deploy: $STATE"
   ```

   **Ne prouver que sur `deploy: success`.** Sur un échec, une annulation ou `timeout` (environ 13 minutes), la preview peut encore montrer un commit précédent : ne rien publier, le dire dans « Non vérifié », et proposer de relancer l'étape 5 une fois la preview déployée.

2. **URLs** : l'après est la preview de la PR, `<domaine>/PR-<n>`, le domaine se lit dans le commentaire du bot (« Storybook preview deployed »). L'avant est `<domaine>/master` **seulement si la base est `master`** : `release/*` et `*-lts` ne sont pas déployés, dans ce cas prouver l'après seul (verdict `ℹ️`) et le dire dans « Non vérifié ».
3. **Choisir une à trois stories** parmi celles des composants touchés (lignes `ℹ️` de `branch-context`) — la story qui montre la variante concernée d'abord, la story QA ensuite :

   ```bash
   node .claude/skills/recette-pr-fix/scripts/prove.mjs --list <after> <composant>...
   ```

4. **Écrire un scénario par état**, dans `<dossier>/<état>.mjs` (scratchpad, chemin absolu) :
   - **le cas corrigé** — l'état du bug, d'après les étapes de reproduction de l'issue liée s'il y en a, sinon d'après « Comment tester » ;
   - **un cas témoin** — un état voisin qui doit rester identique : à la souris pour un fix tactile, champ désactivé, autre variante du composant.

   Le scénario **observe ce que le fix change**, pas seulement l'image : style calculé (`cursor`, couleur, `outline`), attribut ou ARIA, élément focus, DOM, position. Un fix qui ne se dessine pas — curseur, ARIA, ordre de focus — se prouve par ses valeurs, une capture n'y montrerait rien. `reproduced` se renvoie quand le bug a un critère net : c'est le rejeu.

   ```js
   // <the bug, in one sentence>
   export default async function ({ page, settle }) {
   	// put the story in the state of the bug: hover, tap, focus, keyboard, open an overlay…
   	await settle(); // finishes CSS transitions before reading computed styles
   	return { observed: { '<what is read>': <value> }, reproduced: <the bug happened>, detail: '<what was observed>' };
   }
   ```

   Sans scénario, la story est prouvée au repos (ou survolée, avec `--hover <sélecteur>`).
5. **Lancer un appel par état** :

   ```bash
   node .claude/skills/recette-pr-fix/scripts/prove.mjs --before <before> --after <after> --out <dossier> --story <storyId> \
     --scenario <dossier>/<état>.mjs --name <état> [--control] [--touch] [--hover <sélecteur>] [--video]
   ```

   `--control` pour le cas témoin. `--touch` émule un appareil tactile (`hover: none`) : lancer le cas corrigé **dans les conditions du bug**, hors d'elles il ne décrit plus rien. `--video` quand le bug se déroule dans le temps (focus, clavier, overlay, animation).
6. **Lire le verdict** :
   - `✅ Differs: <preuves>`, `✅ Reproduced without the fix, no longer with it`, ou pour un cas témoin `✅ Unchanged, as expected` : la preuve est faite ;
   - `⚠️ No observable difference` : l'état ou l'observation ne correspond pas au fix — revoir le scénario (souvent : mauvais élément, ou lecture avant la fin d'une transition, sans `settle()`), jamais le publier ;
   - `⚠️ The scenario does not reproduce the bug without the fix` : le scénario ne prouve rien, quel que soit le résultat avec le fix — le corriger ou y renoncer ;
   - `⚠️ The control case changed` : le fix change autre chose que le cas visé — à signaler dans le rapport, en 🔴 si c'est une régression ;
   - `❌ The bug is still reproduced with the fix` : le fix ne corrige pas ce cas, ou le scénario lit autre chose que le bug — à creuser avant tout ;
   - `❌ Could not prove` : story introuvable, survol ou scénario en échec — corriger le sélecteur ou le scénario ; après deux essais, « Non vérifié » avec la cause ;
   - `ℹ️ No "before"` : base non déployée, les valeurs seules ne prouvent rien.

   Les lignes `a11y` et `console` valent quel que soit le verdict. `a11y` (axe, le moteur de l'addon a11y de Storybook, dont les violations ne font jamais échouer la CI) ne compte que ce que la PR change : `⚠️ n new` — violations ajoutées par le fix, à signaler dans le rapport et le commentaire, en 🔴 si elles touchent le clavier ou les lecteurs d'écran ; `✅ n fixed` — violations corrigées ; `already on the base` (dans cet état ou au repos) ne se rapporte pas. `console: ⚠️ n new error(s)` : erreurs absentes de la base, à signaler. Seules les stories prouvées sont auditées : le dire dans « Non vérifié ».

   **Regarder chaque image** avant d'écrire sa légende. Une image ne se publie que si elle `differs`, ou pour un cas témoin. Un rejeu en ✅ qui protégerait durablement contre la régression mérite de devenir un test e2e : le proposer à l'utilisateur, via le skill `generate-e2e-test` (`stories/e2e/`), pour que la CI le rejoue à chaque PR.
7. **Publier** en commentaire de la PR, en anglais, après avoir montré le brouillon à l'utilisateur et obtenu son accord. Chaque appel a écrit `<dossier>/<storyId>--<état>.json` (verdict, valeurs, a11y, fichiers) : s'en servir pour rédiger `<dossier>/comment.md`, puis :

   ```bash
   gh pr comment <n> --body-file <dossier>/comment.md --attach <dossier>/<fichier>.png [--attach <dossier>/<fichier>.webm]...
   ```

   Chaque image ou vidéo est référencée dans le body **avec exactement le même chemin absolu** que dans `--attach` : `gh` remplace la référence par l'URL du fichier envoyé. Un fichier attaché mais non référencé, ou référencé avec un autre chemin (`~`, chemin relatif), atterrit en fin de commentaire. Une vidéo n'est lue que si sa référence est **seule dans son paragraphe** (pas dans un tableau), et doit rester sous 10 Mo.

Anatomie du commentaire — une section par état, avec la preuve qui diffère : images, valeurs, ou les deux :

```markdown
## Visual proof

**1. <what the reviewer should check, e.g. "On touch devices, a tapped primary button no longer keeps its hover color">**

| Before (`master`) | After (this PR) |
| --- | --- |
| ![](<dossier>/<fichier>--before.png) | ![](<dossier>/<fichier>--after.png) |

| Observed | Before (`master`) | After (this PR) |
| --- | --- | --- |
| <e.g. background after tap> | `rgb(174, 46, 3)` | `rgb(224, 96, 41)` |

**2. <control case, e.g. "Unchanged with a mouse">** …

<sub>Proved on the Storybook previews `master` and `PR-<n>` · story `<storyId>` · Chromium 1280×800 @2x · <state: tap with touch emulation, hover `.button`…></sub>

**Accessibility (axe):** <"no new violation on the proved stories", or the new and fixed rules per story>

**Bug replay** ← only with a ✅ replay and a video: <scenario in one sentence, and what was observed on each side>

Before (`master`):

![](<dossier>/<fichier>--before.webm)

After (this PR):

![](<dossier>/<fichier>--after.webm)

**Not covered:** <states, themes or stories not proved, and why>
```

Une légende par état, qui dit **ce que le relecteur doit vérifier** ; l'environnement et l'état en pied, pour que n'importe qui puisse refaire la preuve.
