# pr-ReadMore

## Quand utiliser ce composant
- Pour afficher un texte long qui peut être réduit à un nombre limité de lignes pour une meilleure lisibilité.
- Lorsque vous souhaitez donner à l'utilisateur la possibilité de voir plus ou moins de contenu sans changer de page.
- Dans des contextes où l'espace est limité, comme les aperçus ou les cartes d'information.

## Stories Storybook
- [Documentation complète](https://lucca-front.lucca.io/storybook/?path=/docs/documentation-texts-readmore-angular-ai--docs)
- [Basic](https://lucca-front.lucca.io/storybook/?path=/story/documentation-texts-readmore-angular-ai--basic)
- [Basic](https://lucca-front.lucca.io/storybook/?path=/story/documentation-texts-readmore-angular-basic--basic)

## Composant Figma
[Design dans Figma](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=27984-193). Variantes disponibles : Size=M, Surface=Sunken, Size=M, Surface=Raised, Size=S, Surface=Default, Size=S, Surface=Sunken, Size=M, Surface=Default, Size=S, Surface=Raised.

## Import

```typescript
import { ReadMoreComponent } from '@lucca-front/ng/read-more';
```

## Usage de base

```html
<!-- Usage minimal -->
<lu-read-more></lu-read-more>
```

## Directive / Composant : `lu-read-more` ou `<lu-read-more>`

Directive utilisée pour afficher un texte avec des options pour le réduire ou l'étendre. Applicable sur des éléments HTML pour gérer le contenu textuel.

### Valeurs

| Valeur | Description |
|--------|-------------|
| `""` (vide) | Variante par défaut |

```html
<lu-read-more lineClamp="3" surface="default" textFlow="true">...</lu-read-more>
```

## Inputs

### `lineClamp`
Type: `number` — Default: `3`

Modifie le nombre de lignes visibles avant que le contenu ne soit masqué.

```html
<lu-read-more [lineClamp]="lineClampValue">...</lu-read-more>
```

### `surface`
Type: `'default' | 'sunken' | null` — Default: `null`

Modifie la couleur de fond sous le bouton "Lire plus / moins".

```html
<lu-read-more [surface]="'sunken'">...</lu-read-more>
```

### `textFlow`
Type: `boolean` — Default: `false`

Applique les espacements du composant Text flow.

```html
<lu-read-more [textFlow]="true">...</lu-read-more>
```

### `openOnly`
Type: `boolean` — Default: `false`

Empêche la fermeture du composant en masquant le bouton "Lire moins".

```html
<lu-read-more [openOnly]="true">...</lu-read-more>
```

### `innerContent`
Type: `boolean` — Default: `false`

Permet de passer le contenu via un innerHTML.

```html
<lu-read-more [innerContent]="true">...</lu-read-more>
```

## Patterns courants

### Affichage de texte
```html
<!-- Exemple d'utilisation du composant pour afficher un texte avec options -->
<lu-read-more [lineClamp]="2" [surface]="'raised'" [openOnly]="false">
  <p>Voici un exemple de texte qui peut être étendu ou réduit.</p>
</lu-read-more>
```

## Accessibilité
Assurez-vous que le texte réduit est clairement visible et qu'il y a un bouton identifiable pour l'expansion. Utilisez des attributs ARIA pour indiquer l'état de l'élément (développé ou réduit).

## Guidelines Prisme
- Favorisez un espacement adéquat pour une meilleure lisibilité.
- Évitez d'afficher trop de contenu à la fois pour ne pas submerger l'utilisateur.
- Utilisez des couleurs contrastantes pour les surfaces afin d'améliorer l'accessibilité visuelle.