# Détecter les PRs breaking

Le label `:boom: Breaking change` est le point de départ, **pas la source unique** : il est posé à la main et peut manquer. Le contrôle ci-dessous se fait en une passe sur le diff global de la version, pas PR par PR.

## 1. Partir du label

Les PRs déjà labellisées sont connues dès la récupération du milestone. Elles alimentent `✅ Actions required to update` et portent 💥 dans leur section.

## 2. Balayer le diff de la version

Poser les deux bornes : le tag de la dernière version publiée de la branche précédente, et la référence de la version en cours.

```bash
PREV=$(git tag --sort=-v:refname | grep -E '^v?21\.4\.[0-9]+$' | head -1)   # adapter la majeure
REF=origin/release/22.0
```

Puis un contrôle par famille de signaux. **Un grep brut sur le diff ne suffit pas** : une ligne supprimée est le plus souvent une ligne réécrite. Chaque commande ci-dessous compare un état avant/après plutôt que de lire les `-` du diff.

**Exports retirés d'une API publique** — le diff suffit ici, les `export * from` étant rarement réécrits :

```bash
git diff $PREV...$REF -- 'packages/*/**/public-api.ts' | grep -E '^-export'
```

**Inputs / outputs supprimés** — filtrer sur les symboles réellement absents du fichier actuel, sinon chaque `input()` dont la ligne a été retouchée remonte :

```bash
git diff $PREV...$REF -- 'packages/*/**/*.ts' \
 | awk '/^\+\+\+ b\//{f=substr($2,3)} /^-[[:space:]]*(readonly )?[a-zA-Z0-9_]+ = (input|output|model)/{
     line=$0; sub(/^-[[:space:]]*(readonly )?/,"",line); split(line,a," "); print f"\t"a[1] }' \
 | sort -u | while IFS=$'\t' read f sym; do
     [ -f "$f" ] && ! grep -qE "(^|[^a-zA-Z0-9_])$sym\s*=\s*(input|output|model)" "$f" && echo "$sym ($f)"
   done
```

**Variables et classes CSS supprimées** — comparer les **ensembles de noms** définis dans chaque référence. Lire les `-` du diff ne distingue pas une variable supprimée d'une valeur modifiée :

```bash
extract() {   # $1 = ref, $2 = motif (--[a-zA-Z0-9-]+ pour les vars, \.[a-zA-Z][a-zA-Z0-9_-]* pour les classes)
  git ls-tree -r --name-only "$1" -- packages/scss/src | grep '\.scss$' \
   | while read f; do git show "$1:$f" 2>/dev/null; done \
   | grep -oE "$2" | sort -u
}
comm -23 <(extract $PREV '\-\-[a-zA-Z0-9-]+[[:space:]]*:') <(extract $REF '\-\-[a-zA-Z0-9-]+[[:space:]]*:')
```

**Peer dependencies** :

```bash
git diff $PREV...$REF -- 'packages/*/package.json' | grep -E '^[-+].*"@angular/'
```

**Unions de types resserrées** (une valeur acceptée disparaît) :

```bash
git diff $PREV...$REF -- 'packages/*/**/*.type.ts' | grep -E '^-export const'
```

## 3. Écarter les faux positifs

Un signal n'est breaking que s'il change quelque chose pour le consommateur. Ne retenir ni :

- un export **réexporté ailleurs** — vérifier le fichier courant avant de conclure. Un `public-api.ts` réduit à `export * from '@lucca/prisme/<composant>'` déplace l'implémentation sans casser l'import ;
- un symbole préfixé **`ɵ`**, privé par convention Angular ;
- un fichier situé dans un dossier **sans `ng-package.json`**, donc interne à l'entrypoint ;
- la suppression d'une API **dépréciée dans une version antérieure** : elle est attendue et se traite comme une migration, sans être une découverte ;
- un déplacement ou renommage **interne** sans effet sur les imports publiés ;
- une ligne **réécrite** et non supprimée : un `input()` dont seul le `transform` change, une variable CSS dont seule la valeur change, une classe dont le sélecteur est composé différemment. C'est le bruit dominant — d'où les comparaisons d'ensembles ci-dessus ;
- un nom **construit par interpolation** SCSS (`.pr-u-#{$x}`), que l'extraction tronque.

### Seuil propre aux signaux CSS

Le CSS produit beaucoup de signaux pour peu de vrai breaking. Ne retenir que les changements **importants**, c'est-à-dire ceux qu'un produit ne peut pas absorber sans toucher son code :

Est breaking :

- la suppression ou le renommage d'une **classe de composant** publiée (`.composant`, `.composant-descendant`, `.mod-*`, `.is-*`) présente dans le markup des consommateurs ;
- la suppression d'un **token global** ou d'une **famille entière** de variables (palettes, `--pr-t-*`, jeu de couleurs) ;
- un changement de **structure DOM** imposé par les styles.

N'est pas breaking, et ne se mentionne pas :

- la suppression d'une **variable de composant isolée** (`--components-<composant>-…`), détail d'implémentation du composant ;
- le changement de **valeur** d'une variable ou d'un token ;
- un ajustement visuel, qui relève de `🎨 UI update`.

En cas d'hésitation sur une classe, vérifier si elle apparaît dans les templates du dépôt ou dans la documentation : une classe uniquement interne au SCSS n'est pas une API.

## 4. Attribuer un signal confirmé à sa PR

```bash
git log --oneline -S'<symbole supprimé>' $PREV..$REF -- <chemin>
```

Le numéro de PR figure en fin de message de merge : `Refactor/split batch 1 (#4741)`.

Si la PR trouvée n'a pas le label, la traiter comme breaking malgré tout : l'entrée porte 💥 et une action correspondante est ajoutée dans `✅ Actions required to update`. Le signaler dans la phrase de synthèse qui suit le changelog, pour que le label puisse être corrigé sur GitHub.
