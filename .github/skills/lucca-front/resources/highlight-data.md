# pr-HighlightData

## Quand utiliser ce composant
1. Pour mettre en évidence des données importantes dans une interface utilisateur mobile ou desktop.
2. Lorsqu'il est nécessaire de fournir un retour visuel critique sur l'état d'une donnée affichée.
3. Pour afficher des messages d'alerte ou de succès de manière claire et concise dans des tableaux ou des cartes.

## Stories Storybook
- [Documentation complète](https://lucca-front.lucca.io/storybook/?path=/docs/documentation-structure-highlight-data-angular-basic--docs)
- [Template](https://lucca-front.lucca.io/storybook/?path=/story/documentation-structure-highlight-data-angular-basic--template)

## Composant Figma
[pr-HighlightData (v19.3) Figma](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=28445-185189) - Composant qui présente des données avec plusieurs variations de taille et de thème ; il est conçu pour attirer l'attention de l'utilisateur sur des informations critiques.

## Import

```typescript
import { HighlightDataComponent } from '@lucca-front/ng/structure';
```

## Usage de base

```html
<!-- Usage minimal -->
<lu-highlight-data>Texte important</lu-highlight-data>
```

## Directive / Composant : `lu-highlight-data`

Composant utilisé pour afficher des données mises en avant de manière graphique. Applicable à tout élément HTML.

### Valeurs (si directive avec valeurs)

| Valeur       | Description                   |
|--------------|-------------------------------|
| `""` (vide)  | Variante par défaut           |
| `"XS"`       | Petite taille                 |
| `"S"`        | Taille petite                 |
| `"M"`        | Taille moyenne                |
| `"Theme"`    | Thème de couleur             |
| `"Data first"` | Affichage prioritaire des données |
| `"Feedback"`  | Indicateur de retour         |

```html
<lu-highlight-data size="S" theme="Dark" dataFirst="false" feedback="Critical">Texte important</lu-highlight-data>
```

## Inputs

### `size`
Type: `'XS' | 'S' | 'M'` — Default: `'M'`

Définit la taille du composant.

```html
<lu-highlight-data [size]="'S'">Texte important</lu-highlight-data>
```

### `theme`
Type: `'Light' | 'Dark' | 'White'` — Default: `'Light'`

Sélectionne le thème de couleur du composant.

```html
<lu-highlight-data [theme]="'Dark'">Texte important</lu-highlight-data>
```

### `dataFirst`
Type: `boolean` — Default: `false`

Indique si les données doivent être affichées en priorité.

```html
<lu-highlight-data [dataFirst]="true">Texte important</lu-highlight-data>
```

### `feedback`
Type: `'None' | 'Critical' | 'Success' | 'Warning'` — Default: `'None'`

Indique le retour d'état du composant.

```html
<lu-highlight-data [feedback]="'Critical'">Texte important</lu-highlight-data>
```

## Patterns courants

### Affichage d'une donnée critique
```html
<lu-highlight-data size="M" theme="Light" dataFirst="true" feedback="Critical">Attention : Vérifiez les informations!</lu-highlight-data>
```

## Accessibilité
Assurez-vous que le texte mis en évidence soit suffisamment contrasté par rapport à l'arrière-plan pour garantir la lisibilité.

## Guidelines Prisme
- Évitez d'utiliser le composant pour des informations de peu d'importance.
- N'utilisez pas plusieurs instances du composant dans des contextes où la clarté est essentielle.