# pr-SoftwareIcon

## Quand utiliser ce composant
- Pour afficher des icônes de logiciels spécifiques dans une application.
- Pour représenter des fonctionnalités ou des produits dans un tableau ou une liste.
- Pour personnaliser l'apparence d'un produit en utilisant des variantes (couleur, produit spécifique).

## Stories Storybook
- [Documentation complète](https://lucca-front.lucca.io/storybook/?path=/docs/documentation-structure-software-icon-angular-basic--docs)
- [Basic](https://lucca-front.lucca.io/storybook/?path=/story/documentation-structure-software-icon-angular-basic--basic)

## Composant Figma
[Visuel Figma](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=27992-3088) - L'icône de logiciel représente divers produits avec 49 variantes, certaines avec couleur activée et d'autres sans. Chaque produit a une représentation visuelle unique.

## Import

```typescript
import { SoftwareIconComponent } from '@lucca-front/ng/software-icon';
```

## Usage de base

```html
<!-- Usage minimal -->
<lu-software-icon></lu-software-icon>
```

## Directive / Composant : `lu-software-icon`

Représente une icône de logiciel. Applicable sur les éléments HTML pour afficher des icônes correspondant à des produits spécifiques.

### Inputs

### `icon`
Type: `string` — Default: `undefined`

Modifie l'icône produit affichée.

```html
<lu-software-icon [icon]="'EA-Shared-documents'"></lu-software-icon>
```

### `disabled`
Type: `boolean` — Default: `false`

Marque le produit comme inactif.

```html
<lu-software-icon [disabled]="true"></lu-software-icon>
```

## Patterns courants

### Icône avec produit spécifique
```html
<!-- Affichage de l'icône pour un produit spécifique -->
<lu-software-icon [icon]="'CB-Payroll-Assistant'"></lu-software-icon>
```

## Accessibilité
Assurez-vous d'utiliser des attributs ARIA appropriés pour les icônes si elles sont cliquables ou interactives pour garantir une navigation accessible.

## Guidelines Prisme
- Toujours utiliser des icônes appropriées et les étiqueter clairement dans le contexte de leur utilisation.
- Ne pas dépasser les limites de la palette de couleurs définie pour chaque produit.