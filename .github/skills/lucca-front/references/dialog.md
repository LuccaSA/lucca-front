# AssetsDialogs

## Quand utiliser ce composant
- Pour afficher des informations importantes qui nécessitent l'attention de l'utilisateur.
- Lors de la confirmation d'actions critiques, comme la suppression d'un élément.
- Pour collecter des informations auprès de l'utilisateur via des formulaires intégrés dans le dialogue.

## Stories Storybook
[Documentation complète](https://lucca-front.lucca.io/storybook/?path=/docs/documentation-overlays-dialog-basic--docs)

## Composant Figma
[AssetsDialogs sur Figma](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=11108-69338) - Le composant présente un dialogue modale avec une option de backdrop. 

## Import

```typescript
import { AssetsDialogsComponent } from '@lucca-front/ng/dialog';
```

## Usage de base

```html
<!-- Usage minimal -->
<lu-assets-dialogs>...</lu-assets-dialogs>
```

## Directive / Composant : `luAssetsDialogs` ou `<lu-assets-dialogs>`

Description courte du sélecteur. Applicable sur les éléments `<lu-assets-dialogs>`.

## Inputs

### `isOpen`
Type: `boolean` — Default: `false`

Indique si le dialogue est ouvert ou fermé.

```html
<lu-assets-dialogs [isOpen]="true">...</lu-assets-dialogs>
```

## Patterns courants

### Dialogue de confirmation
```html
<!-- Utilisation d'un dialogue pour confirmer une action -->
<lu-assets-dialogs [isOpen]="isDialogOpen">
  <h2>Êtes-vous sûr ?</h2>
  <button type="button" (click)="confirm()">Oui</button>
  <button type="button" (click)="cancel()">Non</button>
</lu-assets-dialogs>
```

## Accessibilité
Le composant doit être utilisable via le clavier et doit respecter les rôles ARIA pour les dialogues afin d'indiquer clairement à l'utilisateur que c'est un dialogue modale.

## Guidelines Prisme
- Favoriser l'utilisation des dialogues pour des confirmations critiques ou des informations urgentes.
- Éviter d'utiliser des dialogues pour des messages d'information classiques, préférez des notifications moins intrusives.
- Assurer que le dialogue est accessible par la tabulation et dispose de boutons clairs pour confirmer ou annuler les actions.