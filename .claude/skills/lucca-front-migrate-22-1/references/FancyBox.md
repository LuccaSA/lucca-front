# FancyBox — inputs dépréciés en 22.1

La 22.1 renomme les inputs de `lu-fancy-box` pour le RTL et change leur rendu. Les anciens inputs fonctionnent toujours.

| Avant (22.0) | Rendu 22.0 | Après (22.1) | Rendu 22.1 |
|---|---|---|---|
| `backgroundLeft` (requis) | `background-image` de `.fancyBox-content::before` | `backgroundEndStart` (optionnel, `bubbles` par défaut) | SVG inline dans `div.fancyBox-content-backgroundEndStart` |
| `backgroundRight` (requis) | `background-image` de `.fancyBox-content::after` | `backgroundStartEnd` (optionnel, `bubbles` par défaut) | SVG inline dans `div.fancyBox-content-backgroundStartEnd` |
| `foreground` | `background-image` de `div.fancyBox-content-foreground` | `foregroundStartEnd` | SVG inline dans `div.fancyBox-content-foregroundStartEnd` |

Les nouveaux inputs acceptent une URL **ou** le nom d'une illustration du CDN Prisme (`'plant'`, `'candies'`…). Le SVG est chargé avec `HttpClient` par le pipe `luSafeExternalSvg`, puis injecté dans le DOM. Dès qu'un des nouveaux `div` est présent, les pseudo-éléments `::before`/`::after` de `.fancyBox-content` passent en `content: none`.

Les tailles et positions par défaut de l'ancien rendu dérivent des nouvelles variables : sans surcharge, chaque illustration occupe le même cadre. Seul le dimensionnement de l'image change : `background-size: contain` avant, SVG en pleine largeur (hauteur automatique) après. Le rendu est identique pour un SVG au moins aussi large que le cadre (ratio 5:4) ; un SVG plus haut déborde du cadre et s'affiche plus grand. D'où le contrôle visuel demandé pour chaque FancyBox migrée.

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

Ne pas en profiter pour remplacer une URL par un nom d'illustration du CDN, même quand le fichier semble identique : signaler la piste dans le rapport.

## 2. Valeurs

Une nouvelle valeur est lue comme une **URL** si elle commence par `https://`, `/` ou `./`, et comme un **nom d'illustration du CDN** sinon. Une URL qui ne commence pas ainsi pointerait donc vers un fichier du CDN qui n'existe pas, sans erreur visible.

| Valeur d'origine | Action |
|---|---|
| `https://…`, `/…`, `//…`, `./…` | Reprendre telle quelle. |
| Chemin relatif sans `./` : `assets/x.svg`, `../x.svg` | Préfixer par `./` (`./assets/x.svg`, `./../x.svg`) : la résolution est la même. |
| `foreground=""` | Supprimer l'attribut : la chaîne vide n'affichait rien, l'absence d'input non plus. |
| `backgroundLeft=""` / `backgroundRight=""` | **Ne pas migrer** : les nouveaux inputs affichent `bubbles` par défaut, aucune valeur ne permet de retrouver l'absence d'image. |
| `http://…`, `data:…` | **Ne pas migrer** : lus comme un nom d'illustration. |
| Image non SVG (`.png`, `.jpg`, `.webp`, `.gif`…) | **Ne pas migrer** : le pipe ne sait injecter que du SVG. |
| Binding `[…]="expr"` | Remonter à la source de l'expression (constante, propriété, `input()`). Si toutes ses valeurs possibles relèvent de la première ligne, renommer. Sinon (valeur issue d'une API, d'une concaténation inconnue, chaîne vide possible), **ne pas migrer**. |

## 3. Surcharges de l'ancien rendu (bloquantes)

Une surcharge SCSS de l'ancien rendu ne s'applique plus après renommage : la FancyBox concernée reste avec ses anciens inputs, et le cas est signalé. Motifs :

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
- **Illustration ajoutée en SCSS** : un `background-image` posé sur `::before` ou `::after`, souvent pour une quatrième image. Avec les nouveaux inputs, elle disparaît. L'équivalent 22.1 est `foregroundEndStart`, à proposer en piste hors périmètre.
- **Surcharge globale** (`shame`, `styles.scss`, sélecteur `.fancyBox` sans classe d'hôte) : elle bloque toutes les FancyBox qu'elle atteint.

Ne surcharger que des variables qui ne sont pas listées ci-dessus (`--components-fancyBox-paddingInline`, `contentMinInlineSize`, `contentPaddingInline`…) n'est pas bloquant.

Dans le rapport, pour chaque FancyBox bloquée : fichier et ligne du template, fichier et sélecteur de la surcharge. Ne pas tenter de transposer la surcharge vers les nouvelles classes.

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

À remplacer seulement si le template est un template Angular, sans surcharge de l'ancien rendu (§3), avec des valeurs migrables (§2) :

1. `div.fancyBox` devient `lu-fancy-box`. `mod-S` devient `size="S"`. Les autres classes passent telles quelles sur `lu-fancy-box`.
2. Les variables `--components-fancyBox-background-left|right|foreground: url(…)` deviennent les inputs correspondants, sans `url()`. Les autres variables du `style` restent sur `lu-fancy-box`.
3. Le contenu de `div.fancyBox-content` est projeté dans `lu-fancy-box`. `div.fancyBox-content` et `div.fancyBox-content-foreground` disparaissent.
4. Importer `FancyBoxComponent` (`@lucca-front/ng/fancy-box`) dans le composant hôte.

Un markup sans variable d'image (FancyBox sans illustration) n'a pas d'équivalent exact : `lu-fancy-box` affiche `bubbles` par défaut. Le laisser et le signaler.

Hors template Angular (Razor, HTML statique, e-mail), ne rien faire : signaler.

## 5. Prérequis `HttpClient`

Le pipe `luSafeExternalSvg` injecte `HttpClient`. Avant la première FancyBox migrée, vérifier que l'application fournit `provideHttpClient()` (ou `HttpClientModule`). Sinon, `lu-fancy-box` lève une `NullInjectorError` au rendu. L'ajouter dans la config de l'application et le signaler.

Les SVG passent aussi par les intercepteurs de l'application. Le CDN Lucca n'autorise que l'en-tête `Content-Type` : un intercepteur qui ajoute un en-tête à **toutes** les requêtes (auth, tracking) ou qui préfixe les URLs relatives fait échouer le chargement, et l'illustration disparaît sans erreur. Ne pas modifier les intercepteurs : lister ceux qui ne filtrent pas l'URL, à vérifier visuellement.
