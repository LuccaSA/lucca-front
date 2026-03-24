# Slot

## Quand utiliser ce composant
- Pour afficher des informations dynamiques dans un espace limité.
- Lorsque vous souhaitez intégrer des éléments interactifs dans votre interface tout en respectant la structure de mise en page.
- Pour gérer des contenus variés sous forme de "slots" qui peuvent être personnalisés.

## Stories Storybook
[Documentation complète](https://lucca-front.lucca.io/storybook/?path=/docs/documentation-integration-utilities-float--docs)

## Composant Figma
[Slot sur Figma](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=13461-13359) - Ce composant permet de créer des puces d'informations avec plusieurs variantes disponibles : Type=Text, Type=Slot, Type=Slot - Mini.

## Import

```typescript
import { SlotComponent } from '@lucca-front/ng/float';
```

## Usage de base

```html
<!-- Usage minimal -->
<lu-slot>...</lu-slot>
```

## Directive / Composant : `luSlot` ou `<lu-slot>`

Directive utilisée pour gérer l'affichage du contenu dans le composant Slot. Applicable sur les éléments HTML prévus pour le contenu dynamique.

### Valeurs (si directive avec valeurs)

| Valeur      | Description                           |
|-------------|---------------------------------------|
| `""` (vide) | Variante par défaut                   |
| `"Text"`    | Variante affichant du texte           |
| `"Slot"`    | Variante affichant un slot standard   |
| `"Mini"`    | Variante affichant un slot miniature   |

```html
<lu-slot type="Text">...</lu-slot>
```

## Inputs

### `type`
Type: `'Text' | 'Slot' | 'Mini'` — Default: `'Text'`

Définit le type de contenu à afficher dans le slot.

```html
<lu-slot [type]="'Slot'">...</lu-slot>
```

## Patterns courants

### Affichage d'informations dynamiques
```html
<lu-slot type="Slot">Contenu dynamique ici</lu-slot>
```

## Accessibilité
Assurez-vous que le contenu du Slot soit accessible au travers de technologies d'assistance. Utilisez des attributs ARIA si nécessaire pour décrire le contenu du slot.

## Guidelines Prisme
- Utiliser les Slots pour des contenus variés, en respectant les limites de chaque type.
- Ne pas surcharger le Slot avec trop d'informations.