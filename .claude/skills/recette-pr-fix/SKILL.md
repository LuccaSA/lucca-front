---
name: recette-pr-fix
description: "Recette d'une branche de fix Lucca Front avant ouverture de la PR : contexte de la branche et conventions du repo (script), lint et tests ciblés sur le diff, points de vigilance et marche à suivre pour tester. Rapide (~30 s) : build et suites complètes restent à la CI. À lancer avant tout `gh pr create` d'une branche fix/*, ou quand l'utilisateur demande une recette / une vérification de sa branche de fix."
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
SRC=$(echo "$TS" | grep -vE '\.spec\.ts$')
[ -n "$TS" ] && npx eslint --quiet ${=TS}
[ -n "$SCSS" ] && npx stylelint ${=SCSS}
[ -n "$SRC" ] && npx vitest related --run ${=SRC}
```

(`${=VAR}` : découpage en mots sous zsh ; sous bash, `$VAR` suffit.)

Sauter une commande dont la liste est vide. Pas de build, pas de `tsc` (la config `tsconfig.src.json` remonte des erreurs de `rootDir` sans rapport avec le diff) : la compilation est vérifiée par la CI.

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
```

Verdict, en un mot : **✅ Prête** (aucun ❌, aucun 🔴), **⚠️ À vérifier** (des ⚠️ ou 🟡 seulement), **❌ À corriger** (au moins un ❌ ou 🔴).

Si le verdict est ❌, ne pas ouvrir la PR : proposer les corrections et attendre l'accord de l'utilisateur. Sinon, la PR peut être ouverte (template `bugfix.md`), en reprenant « Comment tester » dans le second bloc (contexte pour les relecteurs). Dans la checklist du template, ne cocher que ce que la recette a réellement vérifié (« E2E test or UI diff is added » si le script a vu un test) — jamais `npm run build`, jamais `npm run lint` (seul le lint ciblé a tourné) : la CI fait foi.
