# pr-BubbleIllustration

## Quand utiliser ce composant
1. Pour afficher une illustration représentant un état ou un concept (erreur, succès, avertissement) de manière visuelle.
2. Lors de la réalisation d'une interface utilisateur qui nécessite des représentations graphiques pour renforcer la compréhension utilisateur.
3. Dans des situations où une métaphore visuelle peut remédier à une information qui pourrait paraître sèche ou complexe via du texte seul.

## Stories Storybook
- [Documentation complète](https://lucca-front.lucca.io/storybook/?path=/docs/documentation-structure-bubble-illustration-angular-basic--docs)
- [Basic](https://lucca-front.lucca.io/storybook/?path=/story/documentation-structure-bubble-illustration-angular-basic--basic)

## Composant Figma
[Voir le Figma](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=34491-10009) - Le composant se présente sous différentes variantes visuelles, représentant des émotions ou des événements (ex: succès, erreur, animations). Variantes disponibles incluent des illustrations pour "Success - Thumb up", "Error", "Warning", etc.

## Import

```typescript
import { BubbleIllustrationComponent } from '@lucca-front/ng/bubble-illustration';
```

## Usage de base

```html
<!-- Usage minimal -->
<lu-bubble-illustration></lu-bubble-illustration>
```

## Directive / Composant : `luBubbleIllustration` ou `<lu-bubble-illustration>`

Directive pour afficher une illustration bulle. Applicable sur les éléments `<lu-bubble-illustration>`.

### Valeurs

| Valeur                  | Description                   |
|-------------------------|-------------------------------|
| `""` (vide)             | Variante par défaut           |
| `"Error"`               | Illustration d'erreur         |
| `"Success - Thumb up"`  | Illustration de succès (pouce en l'air) |
| `"Success - Award"`     | Illustration de succès (prix) |
| `"Warning"`             | Illustration d'avertissement   |
| `"Default"`             | Illustration par défaut        |
| `"Empty search"`        | Illustration sans résultat de recherche |
| `"Success - Party popper"` | Illustration de succès (fête)  |

```html
<lu-bubble-illustration illustration="Error"></lu-bubble-illustration>
```

## Inputs

### `illustration`
Type: `'moodAngry' | 'moodBored' | 'moodHappy' | 'moodJoyful' | 'moodMoody' | 'moodSad' | 'moodShoked' | 'moodSly' | 'moodSmirking' | 'moodSurprised' | 'absence' | 'anniversary' | 'awardRibbon' | 'banknote' | 'battery' | 'bell' | 'binders' | 'biscuit' | 'bookmark' | 'books' | 'bronzeMedal' | 'building' | 'bulb' | 'calculator' | 'calendar' | 'camera' | 'charts' | 'chat' | 'checkmark' | 'chemistry' | 'clipboard' | 'clock' | 'coffee' | 'cup' | 'diamond' | 'equity' | 'error' | 'export' | 'file' | 'fish' | 'folder' | 'gear' | 'gift' | 'goldMedal' | 'graduate' | 'growth' | 'hearth' | 'home' | 'hourglass' | 'import' | 'invoice' | 'jigsaw' | 'link' | 'lock' | 'magnifyingGlass' | 'mail' | 'map' | 'mapPin' | 'medical' | 'megaphone' | 'mix' | 'mobile' | 'multipleReceipts' | 'newbie' | 'newsFeed' | 'office' | 'outside' | 'paint' | 'paperplane' | 'party' | 'paymentCards' | 'payslip' | 'pen' | 'percent' | 'phone' | 'picture' | 'polaroid' | 'receipt' | 'recruit' | 'reload' | 'restaurant' | 'rocket' | 'save' | 'screwdriver' | 'security' | 'silverMedal' | 'sliders' | 'speed' | 'stopwatch' | 'subjects' | 'survey' | 'target' | 'tasklist' | 'temperature' | 'thumbtack' | 'thumbUp' | 'timer' | 'trash' | 'userID' | 'video' | 'warning'` — Default: `''`

Description de l'illustration à afficher.

```html
<lu-bubble-illustration [illustration]="'moodHappy'"></lu-bubble-illustration>
```

## Patterns courants

### Utilisation d'une illustration d'erreur
```html
<!-- Affichage d'un message d'erreur visuellement -->
<lu-bubble-illustration illustration="Error"></lu-bubble-illustration>
```

## Accessibilité
Assurez-vous que les illustrations utilisées sont accompagnées d'un texte alternatif approprié pour que les utilisateurs de lecteurs d'écran puissent comprendre le contenu visuel.

## Guidelines Prisme
- Utiliser les illustrations pour enrichir l'expérience utilisateur, mais ne pas surcharger l'interface.
- S'assurer que les illustrations sont pertinentes par rapport au contexte dans lequel elles sont utilisées.
- Éviter les illustrations qui pourraient être considérées comme biaisées ou stéréotypées.