# FancyBox — inputs dépréciés en 22.1

La 22.1 renomme les inputs de `lu-fancy-box` pour le RTL et change leur rendu. Les anciens inputs sont encore acceptés, mais **passent déjà par le nouveau rendu** (voir « Dès l'upgrade » ci-dessous).

| Avant (22.0) | Rendu 22.0 | Après (22.1) | Rendu 22.1 |
|---|---|---|---|
| `backgroundLeft` (requis) | `background-image` de `.fancyBox-content::before` | `backgroundEndStart` (optionnel, `bubbles` par défaut) | SVG inline dans `div.fancyBox-content-backgroundEndStart` |
| `backgroundRight` (requis) | `background-image` de `.fancyBox-content::after` | `backgroundStartEnd` (optionnel, `bubbles` par défaut) | SVG inline dans `div.fancyBox-content-backgroundStartEnd` |
| `foreground` | `background-image` de `div.fancyBox-content-foreground` | `foregroundStartEnd` | SVG inline dans `div.fancyBox-content-foregroundStartEnd` |

Les nouveaux inputs acceptent une URL **ou** le nom d'une illustration du CDN Prisme (`'plant'`, `'candies'`…). Le SVG est chargé avec `HttpClient` par le pipe `luSafeExternalSvg`, puis injecté dans le DOM. Dès qu'un des nouveaux `div` est présent, les pseudo-éléments `::before`/`::after` de `.fancyBox-content` passent en `content: none`.

Les tailles et positions par défaut de l'ancien rendu dérivent des nouvelles variables : sans surcharge, chaque illustration occupe le même cadre. Seul le dimensionnement de l'image change : `background-size: contain` avant, SVG en pleine largeur (hauteur automatique) après. Le rendu est identique pour un SVG au moins aussi large que le cadre (ratio 5:4) ; un SVG plus haut déborde du cadre et s'affiche plus grand. D'où le contrôle visuel demandé pour chaque FancyBox migrée.

## Dès l'upgrade : `lu-fancy-box` et markup HTML ne sont pas logés à la même enseigne

- **`lu-fancy-box`** : les anciens inputs alimentent les mêmes URL que les nouveaux (`backgroundEndStart() ?? backgroundLeft() ?? 'bubbles'`), rendues en SVG inline. Toute `lu-fancy-box` passe donc au nouveau rendu en montant en 22.1, **qu'on renomme ses inputs ou non**. Garder les anciens inputs ne protège rien : surcharge de l'ancien rendu, image non SVG, `http://`, chemin sans `./`, valeur vide ou absence de `HttpClient` cassent déjà à l'upgrade. Ces cas sont des **régressions à corriger**, pas des FancyBox « qui fonctionnent toujours ».
- **Markup HTML `.fancyBox`** : il garde l'ancien rendu (`::before`/`::after`, `background-image`) tant qu'il n'est pas converti. C'est la conversion (§4) qui change le rendu : d'où ses garde-fous.

## 1. Renommage

```html
<!-- Avant -->
<lu-fancy-box
	backgroundLeft="./assets/fancy-box/background-left.svg"
	backgroundRight="./assets/fancy-box/background-right.svg"
	foreground="./assets/fancy-box/foreground.svg"
>
	…
</lu-fancy-box>

<!-- Après -->
<lu-fancy-box
	backgroundEndStart="./assets/fancy-box/background-left.svg"
	backgroundStartEnd="./assets/fancy-box/background-right.svg"
	foregroundStartEnd="./assets/fancy-box/foreground.svg"
>
	…
</lu-fancy-box>
```

Même renommage pour les bindings : `[backgroundLeft]="x"` → `[backgroundEndStart]="x"`. Ne pas renommer les propriétés du composant hôte qui portent ces valeurs : hors périmètre.

Une URL d'illustration du CDN Prisme devient son nom typé (§2) : c'est la première option à appliquer.

## 2. Valeurs

Une nouvelle valeur est lue comme une **URL** si elle commence par `https://`, `/` ou `./`, et comme un **nom d'illustration du CDN** sinon. Une URL qui ne commence pas ainsi pointerait donc vers un fichier du CDN qui n'existe pas, sans erreur visible.

### Illustrations du CDN Prisme : nom typé en priorité

Les URL `https://cdn.lucca.fr/transverse/prisme/visuals/fancy-box/…` documentées en 22.0 sont remplacées par le nom typé de l'illustration (`FancyBoxBackgroundEndStart`, `FancyBoxBackgroundStartEnd`, `FancyBoxForegroundStartEnd`), à condition que l'ancien input corresponde à la nouvelle position :

| Ancien input | Fichier 22.0 (`…/visuals/fancy-box/`) | Nouvel input |
|---|---|---|
| `backgroundLeft` | `background-left-bubbles.svg` | Supprimer l'attribut : `backgroundEndStart` vaut `bubbles` par défaut |
| `backgroundLeft` | `background-left-plant.svg` | `backgroundEndStart="plant"` |
| `backgroundRight` | `background-right-bubbles.svg` | Supprimer l'attribut : `backgroundStartEnd` vaut `bubbles` par défaut |
| `backgroundRight` | `background-right-candies.svg` | `backgroundStartEnd="candies"` |
| `foreground` | `foreground-right-pizza.svg` | `foregroundStartEnd="pizza"` |

Dans tous les autres cas, ne pas utiliser de nom typé : reprendre l'URL telle quelle, selon le tableau suivant. C'est le cas d'un fichier placé sur un autre input que celui de la table (par exemple `foreground-left-clips.svg` sur `foreground`, qui s'affichait en haut à droite), d'un fichier absent de la table ou d'une URL hors CDN.

**Le rendu change.** La forme des illustrations est la même, mais les nouveaux fichiers colorent les bulles avec les variables de palette (`--palettes-assets-*`) alors que les anciens utilisaient des couleurs fixes. Les bulles suivent donc la `palette` du composant (`product` par défaut) : dans une application produit, elles prennent ses couleurs. C'est le rendu attendu par le Design System, mais il faut le contrôler visuellement (étape 4).

### Autres valeurs

| Valeur d'origine | Action |
|---|---|
| `https://…`, `/…`, `//…`, `./…` hors table ci-dessus | Reprendre telle quelle. |
| Chemin relatif sans `./` : `assets/x.svg`, `../x.svg` | Préfixer par `./` (`./assets/x.svg`, `./../x.svg`) : la résolution est la même. |
| `foreground=""` | Supprimer l'attribut : la chaîne vide n'affichait rien, l'absence d'input non plus. |
| `backgroundLeft=""` / `backgroundRight=""` | **Ne pas renommer, signaler comme régression** : en 22.1, la chaîne vide est lue comme un nom d'illustration inexistant, et aucune valeur des nouveaux inputs ne permet de retrouver l'absence d'image (`bubbles` par défaut). |
| `http://…`, `data:…` | **Ne pas renommer, signaler comme régression** : déjà lus comme un nom d'illustration en 22.1. |
| Image non SVG (`.png`, `.jpg`, `.webp`, `.gif`…) | **Ne pas renommer, signaler comme régression** : le pipe ne sait injecter que du SVG, l'image ne s'affiche plus depuis l'upgrade. |
| Binding `[…]="expr"` | Remonter à la source de l'expression (constante, propriété, `input()`). Si toutes ses valeurs possibles sont migrables, renommer, et remplacer par le nom typé les constantes qui portent une URL de la table. Sinon (valeur issue d'une API, d'une concaténation inconnue, chaîne vide possible), **ne pas renommer**, et signaler le risque de régression. |

Une valeur non migrable sur un markup HTML (§4) bloque la conversion, sans régression : le markup garde l'ancien rendu.

## 3. Surcharges de l'ancien rendu

Une surcharge SCSS de l'ancien rendu ne s'applique plus au nouveau rendu. Son effet dépend de ce qu'elle cible :

- **`lu-fancy-box`** : la surcharge est **déjà inactive depuis l'upgrade**, renommage ou non. Renommer les inputs normalement, et signaler la surcharge comme une régression à corriger : elle est morte, et l'écran a peut-être perdu une illustration ou un réglage de position.
- **Markup HTML** : la surcharge fonctionne encore. Elle **bloque la conversion** (§4).

Motifs :

```scss
.fancyBox-content::before { … }        // backgroundLeft
.fancyBox-content::after { … }         // backgroundRight
.fancyBox-content { &::before, &::after { … } }
.fancyBox-content-foreground { … }     // foreground

// Variables lues uniquement par l'ancien rendu
--components-fancyBox-offsetInline
--components-fancyBox-offsetBlock
--components-fancyBox-imageWidth
--components-fancyBox-imageHeight
--components-fancyBox-background-left
--components-fancyBox-background-right
--components-fancyBox-foreground
```

Cas fréquents à reconnaître :

- **Décalage ou taille d'une illustration** : variables `offset*` / `image*`, ou `inset-*` / `inline-size` sur un pseudo-élément.
- **Illustration ajoutée en SCSS** : un `background-image` posé sur `::before` ou `::after`, souvent pour une quatrième image. Avec le nouveau rendu, elle disparaît. L'équivalent 22.1 est `foregroundEndStart`, à proposer dans le rapport.
- **Surcharge globale** (`shame`, `styles.scss`, sélecteur `.fancyBox` sans classe d'hôte) : elle touche toutes les FancyBox qu'elle atteint.

Ne surcharger que des variables qui ne sont pas listées ci-dessus (`--components-fancyBox-paddingInline`, `contentMinInlineSize`, `contentPaddingInline`…) n'a pas d'impact.

Dans le rapport, pour chaque surcharge : fichier et ligne du template, fichier et sélecteur de la surcharge, et s'il s'agit d'une régression (`lu-fancy-box`) ou d'une conversion bloquée (markup HTML). Ne pas tenter de transposer la surcharge vers les nouvelles classes.

## 4. Markup HTML `.fancyBox`

```html
<!-- Avant -->
<div class="fancyBox mod-S" [attr.style]="'--components-fancyBox-background-left: url(./assets/left.svg); --components-fancyBox-background-right: url(./assets/right.svg); --components-fancyBox-foreground: url(./assets/fg.svg)'">
	<div class="fancyBox-content">
		…
		<div class="fancyBox-content-foreground"></div>
	</div>
</div>

<!-- Après -->
<lu-fancy-box size="S" backgroundEndStart="./assets/left.svg" backgroundStartEnd="./assets/right.svg" foregroundStartEnd="./assets/fg.svg">
	…
</lu-fancy-box>
```

La conversion fait passer le markup de l'ancien au nouveau rendu : elle doit rester iso-rendu. À remplacer seulement si **toutes** ces conditions sont réunies :

- le template est un template Angular ;
- aucune surcharge de l'ancien rendu ne le touche (§3) ;
- `--components-fancyBox-background-left` **et** `--components-fancyBox-background-right` sont tous deux définis, avec des valeurs migrables (§2). Sinon, `lu-fancy-box` affiche `bubbles` du côté manquant, là où l'ancien CSS n'affichait rien ;
- chaque SVG est au moins aussi large que le cadre, en proportion : rapport largeur/hauteur de son `viewBox` (ou de `width`/`height`) **≥ 1,25** (cadre 5:4, 12,5 × 10 rem, ou 9,375 × 7,5 rem en `mod-S`). Un SVG plus haut s'affiche plus grand en SVG inline qu'en `background-size: contain` (un SVG carré passe de 160 × 160 à 200 × 200). Les illustrations du CDN Prisme (200 × 160) remplissent la condition. Si le fichier n'est pas lisible (URL externe, chemin construit à l'exécution), ne pas convertir.

Conversion :

1. `div.fancyBox` devient `lu-fancy-box`. `mod-S` devient `size="S"`. Les autres classes passent telles quelles sur `lu-fancy-box`.
2. Les variables `--components-fancyBox-background-left|right|foreground: url(…)` deviennent les inputs correspondants, sans `url()`. Les autres variables du `style` restent sur `lu-fancy-box`.
3. Le contenu de `div.fancyBox-content` est projeté dans `lu-fancy-box`. `div.fancyBox-content` et `div.fancyBox-content-foreground` disparaissent.
4. Importer `FancyBoxComponent` (`@lucca-front/ng/fancy-box`) dans le composant hôte.

Dans tous les autres cas (hors template Angular, surcharge, arrière-plan manquant, SVG trop haut ou illisible, valeur non migrable), ne rien faire et signaler la raison. Le markup garde l'ancien rendu, qui fonctionne toujours.

## 5. Prérequis `HttpClient`

Le pipe `luSafeExternalSvg` injecte `HttpClient`. **Toute application qui utilise `lu-fancy-box`**, migrée ou non, doit fournir `provideHttpClient()` (ou `HttpClientModule`) : sinon, `lu-fancy-box` lève une `NullInjectorError` au rendu depuis l'upgrade. Le vérifier dès qu'une `lu-fancy-box` existe ou qu'un markup est converti, l'ajouter dans la config de l'application si besoin, et le signaler.

Les SVG passent aussi par les intercepteurs de l'application. Le CDN Lucca n'autorise que l'en-tête `Content-Type` : un intercepteur qui ajoute un en-tête à **toutes** les requêtes (auth, tracking) ou qui préfixe les URLs relatives fait échouer le chargement, et l'illustration disparaît sans erreur. Ne pas modifier les intercepteurs : lister ceux qui ne filtrent pas l'URL, à vérifier visuellement.
