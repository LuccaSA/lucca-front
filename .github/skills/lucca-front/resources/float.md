# Slot

## Quand utiliser ce composant
- Lorsqu'il est nécessaire de créer une zone flottante pour insérer du contenu dans un layout.
- Pour intégrer des éléments dans des interfaces sans perturber le flux principal.
- Pour afficher des informations contextuelles ou des actions associées à un élément particulier.

## Stories Storybook
[Documentation complète](https://lucca-front.lucca.io/storybook/?path=/docs/documentation-integration-utilities-float--docs)

## Composant Figma
[Slot Figma](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=13461-13359) - Composant visuel représentant une zone flottante avec les variantes disponibles : Type=Text, Type=Slot, Type=Slot - Mini.

## Import

```typescript
import { FloatComponent } from '@lucca-front/ng/utilities';
// ou
import { FloatDirective } from '@lucca-front/ng/utilities';
```

## Usage de base

```html
<!-- Usage minimal -->
<element luFloat>...</element>
```

## Directive / Composant : `luFloat` ou `<lu-float>`

Directives pour créer un slot flottant pouvant être utilisé sur divers éléments HTML.

### Valeurs (si directive avec valeurs)

| Valeur            | Description                          |
|-------------------|--------------------------------------|
| `""` (vide)       | Variante par défaut                  |
| `"text"`          | Affiche le contenu sous forme de texte |
| `"slot"`          | Affiche un slot personnalisé        |
| `"slot-mini"`     | Affiche une variante mini du slot   |

```html
<element luFloat="text">...</element>
```

## Inputs

### `type`
Type: `'text' | 'slot' | 'slot-mini'` — Default: `'text'`

Détermine le type d'affichage du slot.

```html
<element luFloat [type]="value">...</element>
```

## Patterns courants

### Exemple d'usage avec un slot
```html
<!-- Utilisation d'un slot pour afficher du contenu contextuel -->
<element luFloat type="slot">Contenu du slot</element>
```

## Accessibilité
Assurez-vous que le contenu du slot est accessible via des technologies d'assistance. Fournissez des descriptions claires pour les éléments interactifs.

## Guidelines Prisme
- Respecter les principes de design de Lucca.
- Ne pas utiliser des couleurs non conformes au guide de style.
- S'assurer que tous les slots sont correctement intégrés dans le flux de l'interface utilisateur.