---
name: analyze-bug-report
description: 'Produit une analyse des bugs de Lucca Front sur une période donnée (trimestre, mois…) en croisant deux populations : les issues de type `Bug` (demande) et les PR labellisées FIX (livraison) — volumes ouverts/traités/restants, criticité, sujets et comparatif trimestriel.'
---

Ce skill génère une analyse quantitative des bugs du dépôt `LuccaSA/lucca-front` sur une **période** (par défaut un trimestre). Il **croise deux populations complémentaires**, à analyser toutes les deux :

- **Côté demande — issues de type `Bug`** : les bugs *remontés*. Sert aux volumes ouverts/restants et à la criticité.
- **Côté livraison — pull requests labellisées `:bookmark::bug: FIX`** : les correctifs *livrés*. Sert au volume de fix et aux sujets (composants corrigés).

Les deux vues répondent à des questions différentes et **ne coïncident pas** (beaucoup de PR FIX n'ont pas d'issue `Bug` associée, et inversement) : toujours présenter les deux et commenter l'écart.

Questions couvertes :

1. **Bugs ouverts** sur la période (issues) + **PR FIX ouvertes/mergées** (livraison)
2. **Bugs traités** : issues `Bug` fermées **et** PR FIX mergées
3. **Bugs restants** (issues encore ouvertes)
4. **Criticité** des bugs (issues)
5. **Sujets** générant le plus de bugs (composants corrigés par les PR FIX)
6. Comparatif avec le trimestre précédent (intégré à la synthèse)

## Définir la période

Convertir la période demandée en une plage de dates `AAAA-MM-JJ..AAAA-MM-JJ` :

| Trimestre | Plage |
|---|---|
| Q1 | `AAAA-01-01..AAAA-03-31` |
| Q2 | `AAAA-04-01..AAAA-06-30` |
| Q3 | `AAAA-07-01..AAAA-09-30` |
| Q4 | `AAAA-10-01..AAAA-12-31` |

Noter la plage une fois pour toutes ; toutes les requêtes la réutilisent.

Dans le rapport, nommer les trimestres **Q1 à Q4** (`Q3 2026`), jamais T1 à T4, y compris dans les titres, tableaux et graphiques.

## Taxonomie des labels (source de vérité)

Vérifier que les labels n'ont pas changé avant de commencer :
`gh label list --repo LuccaSA/lucca-front --limit 200` (ou `curl -s "https://api.github.com/repos/LuccaSA/lucca-front/labels?per_page=100"`).

**Deux signaux de bug — à exploiter tous les deux**

*Côté issue (bug remonté) — type d'issue natif GitHub*
- Le dépôt utilise les **types d'issue GitHub** (`Bug`, `Feature`, `Task`…). Un bug remonté = une issue de **type `Bug`**. Signal fiable, à privilégier sur tout label.
- Recherche : `is:issue type:Bug` (le qualificateur `type:Bug` coexiste avec `is:issue`/`is:pr` sans conflit — vérifié).
- Via l'API REST, le type est exposé dans `.type.name` sur chaque issue (`GET /repos/LuccaSA/lucca-front/issues`). Via `gh` : `gh issue list --json number,title,type,...` ou `gh search issues 'repo:LuccaSA/lucca-front type:Bug'`.
- Ne PAS inférer le bug depuis les labels de priorité/sévérité : ceux-ci servent uniquement à la **criticité** (ci-dessous) et tous les bugs n'en portent pas.

*Côté PR (correctif livré) — label `:bookmark::bug: FIX`*
- Une correction livrée = une **PR portant le label `:bookmark::bug: FIX`** (bug / fix visuel). Signal fiable pour tout ce qui touche à la livraison : volume de correctifs et sujets.
- Recherche : `is:pr label:":bookmark::bug: FIX"` (ajouter `is:merged merged:<RANGE>` pour les correctifs livrés sur la période).

*Exclusion — ajouts d'icônes*
- Les PR d'**ajout d'icônes** (`[icons] add circle half`, `[icons] 3 new icons`…) portent le label FIX pour partir dans une release de fix, mais **ne sont ni des correctifs ni des régressions** : les **exclure de tous les compteurs et listes de PR FIX** (§1, §2, §4, §5, §6).
- Critère : titre préfixé `[icons]`/`[icon]` **sans** le mot `fix` (une PR `[icons] fix component selector` reste un correctif). Contrôle : ces PR régénèrent la police (`packages/icons/font/`). Ne pas exclure sur le seul critère des fichiers : les PR de release/sync touchent aussi la police.
- Les compteurs `total_count` de l'API search ne savent pas appliquer ce filtre : compter les PR d'icônes à part et les **soustraire** (`fix_net = total_count − icônes`). Pour les listes `gh pr list`, filtrer avec `$ICONS_JQ` :

```bash
# Filtre jq à brancher sur toute liste de PR FIX (gh pr list --json number,title,...)
ICONS_JQ='select((.title | test("^\\[icons?\\]"; "i")) and (.title | test("fix"; "i") | not) | not)'

# Nombre de PR d'ajout d'icônes à soustraire d'un total_count (adapter created:/merged: et --state)
icons(){ gh pr list --repo LuccaSA/lucca-front --state "$2" --limit 500 \
  --search "$1 label:\":bookmark::bug: FIX\"" --json title \
  --jq "[.[] | select(.title | test(\"^\\\\[icons?\\\\]\"; \"i\")) | select(.title | test(\"fix\"; \"i\") | not)] | length"; }
icons "merged:<RANGE>" merged   # à soustraire des PR mergées
icons "created:<RANGE>" all     # à soustraire des PR créées
```

Mentionner dans le rapport le nombre de PR d'icônes exclues.

*Exclusion — outillage, tests, stories, release*
- Des PR FIX ne corrigent aucun bug livré aux utilisateurs : skills, stylelint, tests/e2e, stories et pages QA, release/sync. Les correctifs de **schematics** restent comptés (catégorie « Schematics / migrations ») : ce sont des migrations livrées aux équipes produit, sauf quand la PR ne touche que leurs tests. Les **exclure aussi de tous les compteurs et listes de PR FIX** (§1, §2, §4, §5, §6).
- Critère : le classement par type du §5 C, catégories « Outillage / tests / stories » et « Release / versionning ». **Charger la fonction `classify` ci-dessous avant de commencer** (heuristique détaillée au §5 C) : elle filtre déjà les icônes et sort `numéro⇥catégorie⇥titre`. Un titre « fix X + story » ou « + QA » reste un correctif.
- Comme pour les icônes, soustraire ces PR des `total_count` (`fix_net = total_count − icônes − hors_bug`). `classify` interroge les fichiers de chaque PR mal classée par son titre : la lancer **une fois** par plage et par état, et réutiliser le résultat.

```bash
# classify <qualifier> <state> → numéro⇥catégorie⇥titre (icônes déjà exclues)
classify(){
gh pr list --repo LuccaSA/lucca-front --state "$2" \
  --search "$1 label:\":bookmark::bug: FIX\"" --limit 500 \
  --json number,title,labels --jq ".[] | $ICONS_JQ"' | "\(.number)\t\([.labels[].name]|join(","))\t\(.title)"' \
| awk -F'\t' '
{
  l=tolower($2); t=tolower($3); cat="Comportement / logique";
  gsub(/ *\+ *(story|stories|qa)/, "", t)   # « fix X + story / + QA » = un vrai correctif livré avec sa story
  if      (t ~ /release|update rc|^v[0-9]|^\[?[0-9]+\.[0-9]+\.[0-9]+\]|chore\(sync\)|^sync/)       cat="Release / versionning";
  else if (t ~ /stories|(^|[^i])story|e2e|qa|test|msw|mock|stylelint|peer dep|description|skill/) cat="Outillage / tests / stories";
  else if (t ~ /schematic|migration/)                                                             cat="Schematics / migrations";
  else if (t ~ /vulnerab|security|cve|xss/)                                                       cat="Sécurité";
  else if (t ~ /^\[?revert|regression|régression/)                                               cat="Régression";
  else if (t ~ /perf\(|memory|leak|re-measuring|debounce/)                                        cat="Performance";
  else if (l ~ /accessibility/ || t ~ /a11y|accessib|aria|keyboard|focus|escape key|contrast|screen ?reader|alt|announce|voiceover| vo /) cat="Accessibilité";
  else if (t ~ /translat|i18n|locale|plural/)                                                     cat="i18n / traduction";
  else if (t ~ /import|selector|component name|typo|package|dependenc|token|encapsulation/)       cat="Technique / intégration";
  else if (t ~ /crash|undefined|infinite|not displayed|no first or last|does not|doesn.t|remove .*(setting|header)/) cat="Comportement / logique";
  else if (t ~ /signal|zoneless|change detection|computed|two-way|model\(|reactivit|value initialization|pending value|binding|ngmodel|not triggered|mark as touched|value not/) cat="Réactivité / signaux / état";
  else if (t ~ /style|css|scss|visual|display|spacing|align|margin|padding|colo|palette|theme|background|border|shadow|z-index|overflow|ellipsis|truncat|wrap|scroll|icon|layout|responsive|position|width|height|[- ]size| ui|slot|panel|design|shrink|linebreak|indent/) cat="Correction graphique / visuelle";
  printf "%s\t%s\t%s\n", $1, cat, $3
}' \
| while IFS=$'\t' read -r n cat title; do
    # Filet de la catégorie par défaut : reclasser d'après les fichiers modifiés
    if [ "$cat" = "Comportement / logique" ]; then
      code=$(gh pr view "$n" --repo LuccaSA/lucca-front --json files --jq '.files[].path' | grep -v '^stories/')
      if [ -z "$code" ]; then cat="Outillage / tests / stories"
      elif ! grep -qvE '\.(scss|css|html)$' <<<"$code"; then cat="Correction graphique / visuelle"; fi
    fi
    printf '%s\t%s\t%s\n' "$n" "$cat" "$title"
  done
}

nonbug(){ classify "$1" "$2" | grep -cE $'\t(Outillage|Release)'; }  # à soustraire d'un total_count
bugs(){ classify "$1" "$2" | grep -vE $'\t(Outillage|Release)'; }     # vrais correctifs : numéro⇥catégorie⇥titre
nonbug "merged:<RANGE>" merged   # à soustraire des PR mergées
nonbug "created:<RANGE>" all     # à soustraire des PR créées
```

Mentionner dans le rapport le nombre de PR exclues à ce titre.

**Criticité** — uniquement les labels de priorité :
- `🔴 P0 - Urgent` — déclenche une release au plus vite.
- `🟠 P1 - Important` — à corriger vite, dans la prochaine release de fix.
- `🟡 P2 - Subsidiary` — bug de faible priorité.
- **Non trié** — bug (`type:Bug`) ne portant aucun de ces trois labels.

> Ne PAS utiliser les labels `Severity HIGH`/`Severity MEDIUM` : la criticité se mesure uniquement sur P0/P1/P2 (+ non trié).

**Sujets / thèmes** — ⚠️ **ne pas se fier aux labels de sujet** (`📦 Date`, `📦 Lists`, `📦 Overlays`, `📦 Selects`, `🧩 Rich text input`, `👥 …`) : ils sont appliqués de façon incohérente et sous-couvrent la réalité. Les regrouper par sujet à partir du **code réellement corrigé** (voir §5), pas de ces labels. Ils peuvent tout au plus servir d'indice complémentaire, jamais de compteur principal.

> Les noms de labels de criticité contiennent des emojis : toujours les citer **exactement**. Avec `gh api ... -f q=...` l'encodage est géré automatiquement ; avec `curl` sur l'API search, encoder le label en URL.

## Méthode de comptage

Utiliser de préférence `gh api` (l'endpoint search renvoie `total_count`, idéal pour des compteurs). Fallback : `curl` sur `https://api.github.com/search/issues`.

Modèle de requête (renvoie `total_count`, remplacer `<RANGE>`) :

```bash
# Nombre d'issues de bug OUVERTES pendant la période (peu importe leur état actuel)
gh api -X GET search/issues \
  -f q='repo:LuccaSA/lucca-front is:issue type:Bug created:<RANGE>' \
  --jq '.total_count'
```

### 1. Volume sur la période (les deux populations)
- **Bugs remontés (issues)** : `is:issue type:Bug created:<RANGE>`.
- **Correctifs ouverts (PR)** : `is:pr label:":bookmark::bug: FIX" created:<RANGE>`.
- **Correctifs livrés (PR mergées)** : `is:pr is:merged label:":bookmark::bug: FIX" merged:<RANGE>`.

Pour les deux compteurs de PR, soustraire les ajouts d'icônes et les PR hors bug (voir les deux *Exclusions*). Présenter les trois et commenter l'écart issues ↔ PR (le nombre de PR FIX est en général bien supérieur au nombre d'issues `Bug` : beaucoup de corrections n'ont pas d'issue dédiée).

### 2. Bugs traités sur la période
Deux angles, à présenter tous les deux :
- **Issues de bug fermées** : `is:issue type:Bug closed:<RANGE>`.
- **PR de fix mergées** : `is:pr is:merged merged:<RANGE> label:":bookmark::bug: FIX"`, moins les ajouts d'icônes et les PR hors bug — reflète les corrections réellement livrées.

### 3. Bugs restants
`is:issue type:Bug is:open created:<RANGE>` (bugs de la période non encore résolus).
Optionnellement, l'arriéré total : `is:issue type:Bug is:open` (tous bugs ouverts, toutes périodes).

### 4. Répartition par criticité (avec couverture)

⚠️ La criticité (P0/P1/P2) est une dimension **portée uniquement par les issues**. Les **PR FIX ne portent aucun label de priorité** (à vérifier, mais typiquement 0). Comme l'essentiel des correctifs passe par des PR **sans issue**, la criticité ne décrit qu'une **fraction** du travail de correction : toujours présenter les deux populations et la **part dont la criticité est connue**.

```bash
R="LuccaSA/lucca-front"; RANGE="<RANGE>"
cnt(){ gh api -X GET search/issues -f q="$1" --jq '.total_count'; }

# 1) Criticité des issues de la période
tot=$(cnt "repo:$R is:issue type:Bug created:$RANGE"); sum=0
for L in "🔴 P0 - Urgent" "🟠 P1 - Important" "🟡 P2 - Subsidiary"; do
  n=$(cnt "repo:$R is:issue type:Bug created:$RANGE label:\"$L\""); printf "issues  %-20s %s\n" "$L" "$n"; sum=$((sum+n))
done
printf "issues  %-20s %s\n" "Non trié" "$((tot-sum))"

# 2) Correctifs livrés (PR FIX) et leur priorité — attendus sans priorité
pr=$(( $(cnt "repo:$R is:pr is:merged label:\":bookmark::bug: FIX\" merged:$RANGE") - $(icons "merged:$RANGE" merged) - $(nonbug "merged:$RANGE" merged) ))
prp=0
for L in "🔴 P0 - Urgent" "🟠 P1 - Important" "🟡 P2 - Subsidiary"; do
  prp=$((prp + $(cnt "repo:$R is:pr is:merged label:\":bookmark::bug: FIX\" merged:$RANGE label:\"$L\"")))
done
echo "PR FIX mergées: $pr  (dont avec priorité: $prp, sans priorité: $((pr-prp)))"

# 3) Couverture de la criticité = issues / (issues + PR FIX sans issue)
echo "Couverture criticité ≈ $tot item(s) sur $((tot+pr)) correctifs → part avec criticité connue"
```

Commenter explicitement : « la criticité n'est renseignée que sur N issues, soit ~X % du travail de correction ; les M PR FIX (le gros du volume) sont sans criticité ».

### 5. Sujets générant le plus de bugs

Les labels de sujet n'étant pas fiables, mesurer les sujets à partir des **correctifs réellement livrés**. Le signal de référence : les **PR mergées portant le label `:bookmark::bug: FIX`** sur la période (c'est le marqueur officiel d'un correctif). Trois angles : **A** et **B** répondent « quel composant » (A par fichiers modifiés = le plus fiable, B par scope du titre), **C** répond « quel type de bug ».

**A. Par dossier de composant modifié (le plus fiable).** Partir des PR de fix mergées (hors bug exclues), puis tallier les dossiers de composant modifiés par chacune — **une fois par PR**, même si elle modifie plusieurs fichiers du composant. ⚠️ **Certains packages sont des conteneurs** (`packages/ng/forms/`, `packages/ng/date2/`, `packages/ng/date/`) qui regroupent plusieurs composants : y descendre **d'un niveau** pour ne pas masquer le détail (ex. `forms/checkbox-input`, `forms/radio-group-input`… plutôt qu'un « forms » fourre-tout). Le motif ci-dessous capture ce niveau grâce à l'ordre des alternatives (leftmost-longest) :

```bash
# 1) PR de fix mergées sur la période, hors icônes et hors bug (numéros)
# 2) pour chaque PR, ses dossiers de composant (dédoublonnés par clé normalisée), puis on cumule
bugs "merged:<RANGE>" merged | cut -f1 \
  | while read -r n; do
      gh api "repos/LuccaSA/lucca-front/pulls/$n/files" --paginate --jq '.[].filename' \
      | grep -oE 'packages/(ng/(forms|date2|date)/[^/]+|ng/[^/]+|scss/src/components/[^/]+)' \
      | sed -E 's#packages/(ng/|scss/src/components/)##' \
      | awk '{ k=tolower($0); gsub(/-/,"",k); print k "\t" $0 }' | sort -u -t$'\t' -k1,1
    done \
  | awk -F'\t' '{ c[$1]++; if ($2 ~ /-/ || !($1 in d)) d[$1]=$2 }
         END{ for (x in c) printf "%3d  %s\n", c[x], d[x] }' | sort -rn | head -25
```

> **Regroupement des variantes** : un même composant vit souvent dans deux dossiers (SCSS en camelCase `multiSelect`, Angular en kebab `multi-select`). Le premier `awk` les fusionne en normalisant la clé (minuscules + suppression des tirets), le second cumule et affiche l'étiquette kebab quand elle existe. Les sous-composants `forms/*` restent distincts (préfixe conservé).

Fallback hors ligne (dépôt cloné, si `gh` indisponible) : produire la même liste de fichiers via git, puis brancher le **même** `grep | sed | awk` que ci-dessus. Moins fiable car dépend des conventions de message (`fix(<scope>): …`, ancien style `[Composant] fix …`) :

```bash
git -C <repo> log --since=<START> --until=<END> --pretty=format:'%H %s' \
  | grep -iE ' (fix\(|\[.*\].*fix|^fix)' \
  | while read -r h _; do git -C <repo> show --name-only --pretty=format: "$h"; done \
  | grep -oE 'packages/(ng/(forms|date2|date)/[^/]+|ng/[^/]+|scss/src/components/[^/]+)' | ...  # idem : sed | awk | sort -rn | head -25
```

**B. Par scope du titre (complément rapide).** Extraire le scope conventionnel des titres des PR de fix mergées :

```bash
bugs "merged:<RANGE>" merged | cut -f3 \
  | grep -oiE 'fix\(([^)]+)\)' | sed -E 's/fix\(([^)]+)\)/\1/I' \
  | sort | uniq -c | sort -rn
```

> Un même fix peut toucher plusieurs composants : le total par sujet dépasse le nombre de PR. Le préciser. Réconcilier A et B (le dossier modifié prime sur le scope déclaré si les deux divergent).

**C. Par type de bug** (correction graphique, comportement/logique, réactivité/état, accessibilité, technique, schematics, i18n, sécurité, régression, outillage/tests, release…). Classer les PR FIX par **heuristique sur le titre** (+ label `👥 Accessibility`), une PR = une catégorie (premier motif qui matche, l'ordre compte). Beaucoup de PR FIX sont de l'outillage/tests/stories ou du versionning : ce classement les repère pour les **exclure** de tout le rapport (voir *Exclusion — outillage, tests, stories, release*).

L'**ordre des tests = priorité** : placer technique/perf/logique **avant** le graphique évite que des mots comme `header`/`display`/`size` (présents dans des noms de composants ou des bugs logiques) ne gonflent à tort le visuel.

« Comportement / logique » est la **catégorie par défaut** : toute PR dont le titre ne matche aucun motif y tombe (titres `[Composant] fix …`, formulations vagues). Le titre seul ne suffit donc pas : la boucle finale de `classify` (voir *Exclusion — outillage, tests, stories, release*) **reclasse ces PR d'après leurs fichiers modifiés** — uniquement des stories → outillage ; uniquement du `.scss`/`.css`/`.html` → visuel. Sans ce filet, environ un tiers de la catégorie est mal classé (16 PR sur 47 au Q3 2026).

```bash
classify "merged:<RANGE>" merged > all-types.tsv
grep -vE $'\t(Outillage|Release)' all-types.tsv > types.tsv   # vrais correctifs : base des sous-découpages ci-dessous
cut -f2 all-types.tsv | sort | uniq -c | sort -rn              # Outillage + Release = PR exclues du rapport
```

**Sous-découpage de « Correction graphique / visuelle »** : ne garder que les lignes « graphique » de `types.tsv`, puis les ventiler avec le sous-classement ci-dessous. Ces sous-types forment le premier des trois tableaux « Par type de bug » (voir *Format de sortie attendu*).

```bash
awk -F'\t' '
function subg(t){
  if (t~/colo|palette|theme|background|contrast/)                      return "Couleur / palette / thème";
  if (t~/spacing|margin|padding|align|gap/)                            return "Espacement / alignement";
  if (t~/overflow|ellipsis|truncat|wrap|scroll/)                       return "Débordement / scroll / troncature";
  if (t~/icon/)                                                        return "Icône";
  if (t~/border|shadow|z-index/)                                       return "Bordure / ombre";
  if (t~/[- ]size|width|height|layout|responsive|position|display/)    return "Dimension / layout / responsive";
  return "Autre UI (style, slot, panel…)";
}
$2 ~ /graphique/ { c[subg(tolower($3))]++ }
END{ for (k in c) printf "%3d  %s\n", c[k], k | "sort -rn" }' types.tsv
```

**Sous-découpage de « Comportement / logique »** : même principe, sur les lignes « Comportement » de `types.tsv`, affiché dans le deuxième tableau « Par type de bug ». Une PR qui finit en « Autre logique » signale un motif à ajouter.

```bash
awk -F'\t' '
function subl(t){
  if (t~/tooltip|dialog|modal|popover|dropdown|popup/)                                                   return "Overlays (tooltip, dialog, modal, popover)";
  if (t~/select|filter.?pill/ && t~/request|lookup|loader|total|paginat|reload|data source|homonym|api/) return "Selects : chargement et requêtes API";
  if (t~/select|filter.?pill|option/)                                                                    return "Selects et filter pills : sélection et valeur";
  if (t~/input|date|rich.?text|duration|caret|paste|erase|comment|read-more/)                           return "Champs de saisie : valeur et édition";
  if (t~/transform|typing|link|optional/)                                                                return "Typage et API publique";
  return "Autre logique";
}
$2 ~ /Comportement/ { c[subl(tolower($3))]++ }
END{ for (k in c) printf "%3d  %s\n", c[k], k | "sort -rn" }' types.tsv
```

> Classement **heuristique** (mots-clés de titre, puis fichiers modifiés pour la catégorie par défaut), une PR = une seule catégorie (ordre = priorité). Portables : **ne pas** utiliser les bornes de mot `\<`/`\>` (non supportées par l'awk macOS), ni nommer une fonction `sub` (réservée). Toujours signaler l'approximation et ajuster les motifs.
>
> **Tag équipe** : taguer chaque type `[UI]` (HTML/CSS/design, label `👥 UI`) ou `[Front]` (Angular/logique, label `👥 Front`). Convention : graphique/visuel et accessibilité = `[UI]` ; comportement, réactivité, technique, schematics, perf, sécurité, régression = `[Front]`.

### 6. Comparatif avec le trimestre précédent

Ces chiffres **alimentent directement la table de synthèse** en tête de rapport (colonnes *Précédente* et *Δ*) : il n'y a **pas de section de sortie dédiée**. Confronter la période à **la période précédente** de même durée. Un solde net positif (ouverts > traités) = l'arriéré grossit. Attention au passage d'année : le trimestre précédant Q1 `AAAA` est Q4 `AAAA-1`.

Le script ci-dessous couvre ouverts / traités / net / PR FIX mergées ; pour compléter les autres lignes de la synthèse (restants, taux de résorption, PR ouvertes), relancer les requêtes des §1–§3 sur la plage précédente.

```bash
# Déterminer la plage du trimestre précédent (ex. Q2 2026 -> Q1 2026)
CUR="2026-04-01..2026-06-30"; PREV="2026-01-01..2026-03-31"
for R in "$PREV" "$CUR"; do
  o=$(gh api -X GET search/issues -f q="repo:LuccaSA/lucca-front is:issue type:Bug created:$R" --jq '.total_count')
  c=$(gh api -X GET search/issues -f q="repo:LuccaSA/lucca-front is:issue type:Bug closed:$R"  --jq '.total_count')
  f=$(gh api -X GET search/issues -f q="repo:LuccaSA/lucca-front is:pr is:merged label:\":bookmark::bug: FIX\" merged:$R" --jq '.total_count')
  f=$((f - $(icons "merged:$R" merged) - $(nonbug "merged:$R" merged)))   # hors icônes et hors bug
  printf "%s  bugs_ouverts=%s  bugs_traités=%s  net=%+d  PR_FIX_mergées=%s\n" "$R" "$o" "$c" "$((o-c))" "$f"
done
```

Calculer la variation (%) de chaque indicateur entre les deux trimestres. Donner aussi l'**arriéré total actuel** : `is:issue type:Bug is:open`.

## Vérifications

- Certains bugs n'ont aucune priorité : compter explicitement les bugs **non triés** (sans label P0/P1/P2) pour ne pas les masquer.
- Rate-limit : l'API **search non authentifiée** ≈ 10 req/min (et l'API REST 60 req/h). Préférer `gh` (authentifié : 30 req/min pour search) ou espacer les appels `curl`.
- La somme par criticité/sujet peut dépasser le total (une issue peut porter plusieurs labels) ou être inférieure (issues non labellisées) : le préciser.
- Les PR FIX d'**ajout d'icônes** et les PR **hors bug** (outillage, tests, stories, release) sont exclues partout (compteurs, criticité, sujets, comparatif) : vérifier que chaque compteur de PR a bien été corrigé.
- Relire la liste des PR exclues comme hors bug : un mot-clé d'outillage peut se cacher dans un vrai correctif (`story` dans « history » a ainsi capté deux correctifs). Un faux positif = un motif à corriger.
- Bien séparer les **deux populations** dans les compteurs : issues `type:Bug` (demande) vs PR `FIX` (livraison). Ne jamais additionner les deux dans un même total ; les présenter côte à côte et commenter leur écart.

## Format de sortie attendu

Un rapport Markdown concis :

```markdown
# Analyse des bugs — <Période> (<RANGE>)

## Synthèse (période vs période précédente)
> Table unique en tête du document : chaque indicateur avec sa valeur période, la période précédente de même durée et le différentiel `Δ` (absolu + %). `=` si stable, `—` si non applicable (grandeur ponctuelle ou dérivée). **Cette table intègre le comparatif trimestriel — ne pas refaire une section « comparatif » séparée.**

| Population | Indicateur | Période | Précédente | Δ |
|---|---|---|---|---|
| Demande (issues `type:Bug`) | Issues entrantes | N | N₋₁ | ±Δ (±%) |
| Demande | Issues traitées | N | N₋₁ | ±Δ (±%) |
| Demande | Solde net (entrantes − traitées) | ±N | ±N₋₁ | ±Δ |
| Livraison (PR `:bookmark::bug: FIX`) | PR mergées | M | M₋₁ | ±Δ (±%) |

> **Δ** : différentiel brut (absolu + %), `=` si stable, `—` si non applicable. Ne pas qualifier une évolution de « favorable » / « défavorable » : présenter le chiffre et nuancer dans le texte (ex. une baisse de traitées/PR qui ne fait que suivre une baisse des entrantes).
> Les autres indicateurs (bugs restants, arriéré total, taux de résorption, écart demande ↔ livraison, couverture criticité…) restent commentés dans le texte, hors table de synthèse.

## Criticité (couverture partielle : les PR FIX n'ont pas de priorité)
| Niveau | Issues `type:Bug` | PR FIX (mergées) |
|---|---|---|
| 🔴 P0 - Urgent | … | 0 |
| 🟠 P1 - Important | … | 0 |
| 🟡 P2 - Subsidiary | … | 0 |
| Sans priorité / non trié | … | M |
| **Total** | N | M |

- **Couverture** : criticité connue sur N issues, soit ~X % des N+M correctifs (les M PR FIX sont sans criticité).

## Sujets les plus touchés (à partir des PR FIX)

### Par composant corrigé
> Détailler les packages conteneurs (`forms/*`, `date2/*`) par sous-composant.

| Composant | Fix livrés |
|---|---|
| dialog | … |
| forms/rich-text-input | … |
| core-select | … |
| … | … |

### Par type de bug *(classement heuristique par titre et fichiers, une PR = une catégorie)*
*Tag `[UI]` = HTML/CSS/design · `[Front]` = Angular/logique. Trois tableaux, dans cet ordre : les deux catégories subdivisées (titre = catégorie, tag et total), puis un tableau « Autres types » pour le reste. Lignes triées par volume décroissant.*

#### Correction graphique / visuelle [UI] — N PR

| Sous-type | PR FIX |
|---|---|
| Autre UI (style, slot, panel…) | … |
| Débordement / scroll / troncature | … |
| Dimension / layout / responsive | … |
| Icône | … |
| Espacement / alignement | … |
| Couleur / palette / thème | … |
| Bordure / ombre | … |

#### Comportement / logique [Front] — N PR

| Sous-type | PR FIX |
|---|---|
| Selects : chargement et requêtes API | … |
| Selects et filter pills : sélection et valeur | … |
| Champs de saisie : valeur et édition | … |
| Overlays (tooltip, dialog, modal, popover) | … |
| Typage et API publique | … |

#### Autres types — N PR

| Type | Tag | PR FIX |
|---|---|---|
| Accessibilité | [UI] | … |
| i18n / traduction | [Front] | … |
| Réactivité / signaux / état | [Front] | … |
| Technique / intégration | [Front] | … |
| Schematics / migrations | [Front] | … |
| Sécurité | [Front] | … |
| Régression | [Front] | … |
| Performance | [Front] | … |

## Points saillants
- Composant(s) dominant(s), tendance de l'arriéré vs trimestre précédent, bugs P0, etc.
```

Toujours rappeler que l'analyse croise **deux populations** — issues `type:Bug` (demande) et PR `:bookmark::bug: FIX` (livraison), jamais additionnées —, que les **sujets** viennent des composants corrigés (pas des labels), et la date d'extraction (les compteurs évoluent).
