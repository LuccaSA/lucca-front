# pr-Callout

## Quand utiliser ce composant
- Pour afficher des informations sans ambigüité ou de façon pro-active dans des contextes de feedback.
- Lorsque vous devez transmettre des suggestions ou des alertes à l'utilisateur par rapport à une action réalisée.
- Pour présenter des événements ou des actions utilisateur importants en mettant en avant des détails supplémentaires.

## Stories Storybook
- [Documentation complète](https://lucca-front.lucca.io/storybook/?path=/docs/documentation-feedback-callout-angular-ai--docs)
- [Action](https://lucca-front.lucca.io/storybook/?path=/story/documentation-feedback-callout-angular-ai--action)
- [Event](https://lucca-front.lucca.io/storybook/?path=/story/documentation-feedback-callout-angular-ai--event)
- [Suggestion](https://lucca-front.lucca.io/storybook/?path=/story/documentation-feedback-callout-angular-ai--suggestion)
- [Basic](https://lucca-front.lucca.io/storybook/?path=/story/documentation-feedback-callout-angular-ai--basic)
- [Template](https://lucca-front.lucca.io/storybook/?path=/story/documentation-feedback-callout-angular-basic--template)

## Composant Figma
[Pr-Callout Figma](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=6053-35275) - Composant visuellement distinct permettant de mettre en avant des messages variés selon des palettes et tailles.

## Import

```typescript
import { CalloutComponent, CalloutActionsComponent, CalloutFeedbackItemComponent, CalloutFeedbackListComponent } from '@lucca-front/ng/callout';
```

## Usage de base

```html
<!-- Usage minimal -->
<lu-callout icon="weatherStars" iconAlt="Description de l'icône">Votre message ici</lu-callout>
```

## Directive / Composant : `luCallout` ou `<lu-callout>`

Description courte du sélecteur. Applicable aux éléments qui nécessitent une mise en avant de messages ou d'informations importantes.

### Valeurs

| Valeur | Description |
|--------|-------------|
| `""` (vide) | Variante par défaut |
| `"AI"` | Variante IA |
| `"Success"` | Palette de succès |
| `"Warning"` | Palette d'avertissement |
| `"Critical"` | Palette critique |
| `"Neutral"` | Palette neutre |
| `"Product"` | Palette produit |

```html
<lu-callout AI>...</lu-callout>
```

## Inputs

### `icon`
Type: `'weatherStars' | 'officePenStar' | 'bubbleStars'` — Default: `'weatherStars'`

Icône à afficher à gauche du message.

```html
<lu-callout [icon]="'officePenStar'">...</lu-callout>
```

### `iconAlt`
Type: `string` — Default: `''`

Texte alternatif pour l'icône.

```html
<lu-callout iconAlt="Icône d'exemple">...</lu-callout>
```

### `actions`
Type: `boolean` — Default: `false`

Affiche la section d'actions si défini sur true.

```html
<lu-callout [actions]="true">...</lu-callout>
```

## Patterns courants

### Utilisation avec actions

```html
<lu-callout icon="weatherStars" iconAlt="Assistance" [actions]="true">
    Votre message ici
    <lu-callout-actions>
        <button luButton="outlined">Action 1</button>
        <button luButton="outlined">Action 2</button>
    </lu-callout-actions>
</lu-callout>
```

## Accessibilité
- Assurez-vous d'utiliser des descriptions d'icônes alternatives claires avec `iconAlt` pour aider les utilisateurs d'assistances.

## Guidelines Prisme
- Se référer à la ligne directrice de style "Prisme, le design selon Lucca" pour la conception et l'utilisation appropriée des composants.