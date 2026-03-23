# AssetsDialogs

## Quand utiliser ce composant
1. Pour afficher des informations complémentaires sans quitter la page actuelle.
2. Lorsqu'il est nécessaire de confirmer une action utilisateur (ex: suppression, validation).
3. Pour guider l'utilisateur à travers un processus nécessitant plusieurs étapes ou formulaires.

## Stories Storybook
[Documentation complète](https://lucca-front.lucca.io/storybook/?path=/docs/documentation-overlays-dialog-basic--docs)

## Composant Figma
[AssetsDialogs Figma](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=11108-69338) — Composant de dialogue avec supports visuels pour les interactions utilisateur. Variantes disponibles : AssetsDialogs et Backdrop.

## Import

```typescript
import { AssetsDialogsComponent } from '@lucca-front/ng/dialog';
```

## Usage de base

```html
<!-- Usage minimal -->
<lu-assets-dialogs></lu-assets-dialogs>
```

## Directive / Composant : `luAssetsDialogs` ou `<lu-assets-dialogs>`

Composant dialogue qui s'affiche comme une fenêtre modale. Applicable sur les éléments pour afficher des messages ou des formulaires.

### Valeurs

| Valeur | Description |
|--------|-------------|
| `""` (vide) | Variante AssetsDialogs par défaut |
| `"backdrop"` | Variante avec un arrière-plan masquant |

```html
<lu-assets-dialogs value="backdrop">...</lu-assets-dialogs>
```

## Inputs

### `isOpen`
Type: `boolean` — Default: `false`

Contrôle l'état d'ouverture du dialogue. 

```html
<lu-assets-dialogs [isOpen]="true">...</lu-assets-dialogs>
```

## Patterns courants

### Dialogue de confirmation
```html
<!-- Un dialogue simple pour confirmer une action -->
<lu-assets-dialogs [isOpen]="true">Êtes-vous sûr de vouloir continuer ?</lu-assets-dialogs>
```

## Accessibilité
S'assurer que le dialogue est focusable et que l'utilisateur peut naviguer à l'intérieur avec le clavier. Utiliser des alternatives textuelles pour les images.

## Guidelines Prisme
- Ne pas superposer plusieurs dialogues.
- Le dialogue doit être fermé après action ou en cliquant à l'extérieur de celui-ci.
- Toujours fournir une option de fermeture claire (ex: bouton "Annuler" ou "Fermer").