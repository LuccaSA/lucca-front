# Ce que fait le schematic `lu-label`

`npx ng g @lucca-front/ng:lu-label` remplace le composant déprécié `.label` par `lu-numeric-badge`, `lu-status-badge` ou `lu-tag`. Il convertit même en cas de doute — une mauvaise cible ne change que l'affichage — et consigne chaque décision dans un rapport que ce skill relit.

## Garde-fou

Le schematic ne tourne que si le projet importe le CSS du Label. `.label` n'a pas de composant Angular : ses styles arrivent par l'un de ces imports, dans un fichier `.scss` / `.css` ou dans les `styles` d'`angular.json` :

- `@lucca-front/scss/src/components/label`
- `@lucca-front/scss/src/components` ou `…/components/index` (tous les composants)
- `@lucca-front/scss/src/main-all`

Les lignes commentées ne comptent pas. Sans aucun de ces imports, les `.label` des templates sont des classes du projet : rien n'est modifié et le schematic logge `Label CSS not imported, nothing to migrate`.

## Détection

- Templates de composants Angular uniquement, inline ou `templateUrl`. Les `.cshtml`, `.js` et templates AngularJS sont ignorés.
- Éléments dont l'attribut `class` statique contient exactement le token `label`. `label-group`, `label-format`, `labelX` sont ignorés.

## Cible

| Label | Cible |
|---|---|
| porte `mod-number` | `lu-numeric-badge` |
| palette sémantique (`success`, `warning`, `error`, `critical`) **et** signal de statut | `lu-status-badge` |
| palette `product`, `neutral`, décorative ou aucune | `lu-tag outlined` |
| palette sémantique sans signal de statut | non converti |
| handler ou lien sur le Label lui-même (`(click)`, `routerLink`, `href`) | non converti |

Un **signal de statut** est le mot entier `status`, `state`, `statut` ou `approval`, dans un identifiant ou un texte de l'élément (contenu, expression de palette, `i18nSelect`, `ngClass`…), hors attribut `class`. `approvalState` et `STATUS_PENDING` en sont, `statementTooltip` et « estate » non. Un Label *placé dans* un bouton ou un lien n'est pas interactif : il est converti normalement.

Ces règles suivent les guidelines Prisme : le Tag est toujours `outlined` et n'accepte pas de palette sémantique ; le StatusBadge porte le statut d'une ressource ; aucune cible n'est interactive. La Chip n'est jamais une cible.

## Palette

| Label | Résultat |
|---|---|
| aucune palette | NumericBadge : `palette="product"` · StatusBadge : aucune (retombe sur `product`) · Tag : `palette="product"` |
| `palette-x` statique | `palette="x"` |
| `palette-grey` / `palette-primary` (supprimées en 22) | `neutral` / `product` |
| un seul `[class.palette-y]="c"`, avec ou sans `palette-x` statique | `[palette]="c ? 'y' : 'x'"` (`x` vaut `product` par défaut) |
| plusieurs conditions, `[ngClass]`, `[class]="…"`, classe interpolée | non converti |

## Contenu

| Contenu du Label | NumericBadge | StatusBadge / Tag |
|---|---|---|
| texte statique | `value="2"` | `label="Texte"` |
| une seule interpolation `{{ e }}` | `value="{{ e }}"` | `label="{{ e }}"` |
| texte + interpolations | non converti | `label="Texte {{ e }}"` |
| icône (`.label-icon` ou `<lu-icon icon="…">`) + texte | non converti | Tag : `icon="…"` + `label` · StatusBadge : icône retirée (point + texte uniquement) |
| directive `translate="KEY"` (ngx-translate) | non converti | `[label]="'KEY' \| translate"` |
| HTML imbriqué, `i18n` Angular, plusieurs icônes, guillemets `"`, contenu vide | non converti | **fallback HTML** |

Les interpolations restent des interpolations : comme le texte du Label, elles convertissent la valeur en chaîne. Un binding (`[label]="e"`) passerait le type brut et casserait `strictTemplates` (`string | undefined`, nombres), et un nombre passé à `value` serait plafonné à `maxValue` (« 999+ »).

`translate="yes"` / `translate="no"` est l'attribut HTML natif, pas la directive ngx-translate : il est conservé tel quel.

Pour `translate="KEY"`, si le composant n’importe que `TranslateDirective`, le schematic ajoute `TranslatePipe` à ses `imports` (`TranslateModule` couvre déjà les deux). Il retire `TranslateDirective` quand plus aucun élément du template n’utilise la directive.

**Fallback HTML** : l'élément garde son contenu et reçoit `class="statusBadge palette-x"` ou `class="tag mod-outlined palette-x"`. Aucun composant Angular n'apporte ces styles : le schematic ajoute donc `@forward '@lucca-front/scss/src/components/<statusBadge|tag>';` dans le fichier qui importe le CSS du Label (même règle `@use` / `@forward`, sans le `as …` ni le `with (…)` de l'import du Label), sauf si `main-all` ou l'index `components` le couvre déjà.

## Élément

- L'élément devient le composant Angular (`<lu-numeric-badge … />`, `<lu-status-badge … />`, `<lu-tag … />`), quelle que soit sa balise (`span`, `label`, `p`).
- Conservés : les autres classes (`pr-u-*`, classes du projet), les attributs (`id`, `aria-*`, `luTooltip`…), les directives structurelles.
- Retirés : `label`, `mod-number`, `mod-S` / `mod-XS` (deviennent `size`), `palette-*`.
- La classe du composant est ajoutée aux `imports` du composant, avec son import TS depuis `@lucca-front/ng/<numeric-badge|status-badge|tag>`, sans doublon.
- Composant `standalone: false` : le template est migré mais les `imports` ne sont pas touchés (Angular les refuse). La ligne du rapport passe en `low` et indique les composants à importer dans le NgModule.
- Limite connue : dans un fichier qui déclare plusieurs composants, l'import est ajouté au dernier.
- L'import CSS du Label n'est jamais retiré : des Labels non convertis peuvent rester.

## Rapport

La console affiche un résumé : conversions par cible, Labels non convertis par raison. Le schematic écrit aussi `lu-label-migration-report.md` à la racine du projet, une ligne par Label (en anglais, comme toute sortie du schematic) :

```md
| File:line | Target | Confidence | Reason |
|---|---|---|---|
| src/app/foo.component.html:12 | lu-status-badge | high | palette-error + `x.status` |
| src/app/bar.component.html:40 | tag (HTML) | low | nested HTML, HTML fallback |
| src/app/baz.component.html:8 | — | not converted | (click) on the label |
```

| Confiance | Cas |
|---|---|
| `high` | `mod-number`, StatusBadge avec signal de statut, Tag avec palette statique `neutral` ou décorative |
| `low` | Tag issu de `product` ou sans palette (peut être un statut « en cours »), fallback HTML, icône retirée, composant `standalone: false` |
| `not converted` | tous les cas « non converti » ci-dessus |

## Fixtures

`packages/ng/schematics/lu-label/tests/input` → `output`, avec un `styles.scss` qui importe le CSS du Label et le rapport attendu :

1. `numeric-badge` — statique, interpolation, `mod-S` / `mod-XS`, palettes (aucune, statique, une condition, `grey` / `primary`)
2. `status-badge` — palette sémantique + signal de statut, icône retirée
3. `tag` — `product` / `neutral` / décorative / aucune, `.label-icon` et `<lu-icon>`
4. `html-fallback` — HTML imbriqué, imports `statusBadge` / `tag` ajoutés dans `styles.scss` (sans le `as label` de l'import du Label, en ignorant un `main-all` commenté)
5. `translate` / `translate-kept` — `translate="KEY"` → `[label]="'KEY' | translate"`, `TranslatePipe` ajouté, `TranslateDirective` retiré ou conservé selon les usages restants
6. `not-converted` — palette sémantique sans statut, Label interactif, palette à plusieurs conditions, `[ngClass]`
7. `preserved` — `pr-u-*`, `id`, `luTooltip`, `@if` / `*ngIf`, éléments `<label>` / `<p>`
8. `false-positives` — `label-group`, `labelX` : aucune modification
9. `template-url` + `imports` — template externe, import TS ajouté une seule fois
10. `review-cases` — `translate="no"` natif, `i18n`, faux signal de statut (`statementTooltip`), `[ngClass]="{ label: … }"`
11. `legacy-module` — composant `standalone: false` : template migré, `imports` inchangés

Plus un test séparé : un projet sans import du CSS du Label reste inchangé.
