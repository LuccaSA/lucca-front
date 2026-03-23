# pr-SoftwareIcon

## Quand utiliser ce composant
- Lorsque vous devez afficher une icône correspondant à un produit spécifique de Lucca dans votre application.
- Si vous souhaitez indiquer visuellement un produit comme actif ou inactif grâce à la propriété `disabled`.
- Pour ajuster la taille de l'icône en fonction de votre design ou de l'emplacement sur l'interface utilisateur via la propriété `size`.

## Stories Storybook
- [Documentation complète](https://lucca-front.lucca.io/storybook/?path=/docs/documentation-structure-software-icon-angular-basic--docs)
- [Basic](https://lucca-front.lucca.io/storybook/?path=/story/documentation-structure-software-icon-angular-basic--basic)

## Composant Figma
[Accéder au design sur Figma](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=27992-3088) – Icône représentant divers produits Lucca, avec plusieurs variantes de couleur et de type de produit.

## Import

```typescript
import { SoftwareIconComponent } from '@lucca-front/ng/software-icon';
```

## Usage de base

```html
<!-- Usage minimal -->
<lu-software-icon icon="absences" size="" disabled></lu-software-icon>
```

## Directive / Composant : `lu-software-icon`

Composant permettant d'afficher une icône de produit Lucca. Applicable sur tous les éléments où une icône peut être intégrée.

### Valeurs

| Valeur | Description |
|--------|-------------|
| `""` (vide) | Variante de taille par défaut |
| `"XXS"` | Icône très petite |
| `"XS"` | Icône petite |
| `"S"` | Icône standard |
| `"L"` | Icône grande |

```html
<lu-software-icon icon="absences" size="S"></lu-software-icon>
```

## Inputs

### `icon`
Type: `'absences' | 'productName'` — Default: `'absences'`

Modifie l'icône produit affichée.

```html
<lu-software-icon [icon]="'absences'"></lu-software-icon>
```

### `size`
Type: `'XXS' | 'XS' | 'S' | 'L'` — Default: `''`

Détermine la taille de l'icône. Si aucune taille n'est spécifiée, la taille par défaut est utilisée.

```html
<lu-software-icon [size]="'L'"></lu-software-icon>
```

### `disabled`
Type: `boolean` — Default: `false`

Marque l'icône comme inactive. Visuellement, cela indique à l'utilisateur que l'icône n'est pas cliquable.

```html
<lu-software-icon [disabled]="true"></lu-software-icon>
```

## Patterns courants

### Affichage d'une icône avec désactivation
```html
<!-- Icône désactivée indiquant un produit inactif -->
<lu-software-icon icon="absences" disabled="true"></lu-software-icon>
```

## Accessibilité
Utilisez des attributs `aria-disabled` sur les icônes désactivées pour indiquer leur état aux technologies d'assistance.

## Guidelines Prisme
- Suivez les standards de style établis dans le guide Pareto pour l'utilisation des icônes à travers l'interface utilisateur.
- Évitez d'utiliser des icônes trop petites qui ne seront pas lisibles par l'utilisateur.