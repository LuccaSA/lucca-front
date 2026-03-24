# AssetsDialogs

## Quand utiliser ce composant
- Pour afficher des dialogues d'information ou d'alerte aux utilisateurs.
- Lorsqu'il est nécessaire de demander une confirmation à l'utilisateur avant d'effectuer une action.
- Pour afficher des formulaires ou des contenus supplémentaires sans quitter la page courante.

## Stories Storybook
- [Documentation complète](https://lucca-front.lucca.io/storybook/?path=/docs/documentation-overlays-dialog-basic--docs)

## Composant Figma
[AssetsDialogs Figma](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=11108-69338) - Ce composant permet de créer des dialogues avec des variants tels que AssetsDialogs et Backdrop.

## Import

```typescript
import { AssetsDialogsComponent } from '@lucca-front/ng/dialog';
// ou
import { AssetsDialogsDirective } from '@lucca-front/ng/dialog';
```

## Usage de base

```html
<lu-assets-dialog>...</lu-assets-dialog>
```

## Directive / Composant : `lu-assets-dialog` ou `<lu-assets-dialog>`

Directive utilisée pour créer des dialogues. Applicable sur tous les éléments HTML.

## Inputs

### `isOpen`
Type: `boolean` — Default: `false`

Indique si le dialogue est ouvert ou non.

```html
<lu-assets-dialog [isOpen]="true">...</lu-assets-dialog>
```

### `title`
Type: `string` — Default: `''`

Titre du dialogue.

```html
<lu-assets-dialog [title]="'Mon Titre'">...</lu-assets-dialog>
```

## Patterns courants

### Dialogue de confirmation
```html
<lu-assets-dialog [isOpen]="isOpen" [title]="'Confirmer'">
  Êtes-vous sûr de vouloir continuer ?
  <button type="button" (click)="confirm()">Oui</button>
  <button type="button" (click)="cancel()">Non</button>
</lu-assets-dialog>
```

## Accessibilité
Assurez-vous que le dialogue est modale et que l'utilisation au clavier est prise en compte, avec un focus sur le premier élément interactif à l'ouverture.

## Guidelines Prisme
- Ne pas surcharger le dialogue avec trop d'informations.
- Toujours fournir des options claires pour l'utilisateur.
- Éviter d'utiliser des dialogues pour des interactions mineures ou fréquentes.