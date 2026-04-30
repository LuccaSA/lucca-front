# Slot

## Quand utiliser ce composant
- Lorsque vous avez besoin d'afficher des éléments qui doivent flotter au-dessus du reste du contenu.
- Pour créer des interfaces dynamiques où certains éléments doivent être mis en avant, comme des notifications ou des appels à l'action.
- Dans les cas où une petite zone d'information ou une action est requise, que ce soit au-dessus d'autres éléments ou dans un coin de l'écran.

## Stories Storybook
- [Documentation complète](https://lucca-front.lucca.io/storybook/?path=/docs/documentation-integration-utilities-float--docs)

## Composant Figma
[Slot Figma](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=13461-13359) - Le composant Slot est utilisé pour positionner des éléments flottants, avec des variantes disponibles : Type=Text, Type=Slot, Type=Slot - Mini.

## Import

```typescript
import { FloatComponent } from '@lucca-front/ng/float';
// ou
import { FloatDirective } from '@lucca-front/ng/float';
```

## Usage de base

```html
<!-- Usage minimal -->
<element luFloat>...</element>
```

## Directive / Composant : `luFloat` ou `<lu-float>`

Directive permettant de gérer des éléments flottants. Applicable sur tous les éléments HTML.

### Valeurs

| Valeur | Description |
|--------|-------------|
| `""` (vide) | Variante par défaut, affiche un élément flottant standard. |
| `"Text"` | Affiche un élément flottant sous forme de texte. |
| `"Slot"` | Affiche un élément flottant en tant que slot. |
| `"Slot - Mini"` | Affiche un petit slot flottant. |

```html
<element luFloat="Type">...</element>
```

## Inputs

### `type`
Type: `'Text' | 'Slot' | 'Slot - Mini'` — Default: `'Text'`

Définit le type de slot à afficher.

```html
<element luFloat [type]="'Slot'">...</element>
```

## Patterns courants

### Éléments flottants
```html
<!-- Un élément flottant standard -->
<element luFloat type="Slot">Contenu flottant</element>
```

## Accessibilité
Assurez-vous que les éléments flottants ne masquent pas le contenu essentiel et qu'ils disposent d'un focus visible pour les utilisateurs de clavier.

## Guidelines Prisme
- Suivez les guidelines de Prisme, le design selon Lucca, pour l'utilisation des composants, notamment en ce qui concerne l'accessibilité et l'esthétique.