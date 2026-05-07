# MobilePush

## Quand utiliser ce composant
- Pour afficher une notification pour pose d'absence dans l'application mobile.
- Lorsque vous souhaitez offrir un accès rapide aux plateformes de téléchargement d'applications.
- Pour inciter les utilisateurs à télécharger l'application Lucca depuis leur mobile.

## Stories Storybook
- [Documentation complète](https://lucca-front.lucca.io/storybook/?path=/docs/documentation-feedback-mobile-push-angular-basic--docs)
- [Template](https://lucca-front.lucca.io/storybook/?path=/story/documentation-feedback-mobile-push-angular-basic--template)

## Composant Figma
[pr-MobilePush (v20.1)](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=29907-398) + Ce composant présente des notifications avec des options de badge à droite ou en bas.

## Import

```typescript
import { MobilePushComponent } from '@lucca-front/ng/mobile-push';
```

## Usage de base

```html
<!-- Usage minimal -->
<lu-mobile-push>
	Posez une absence depuis n’importe où avec l’application Lucca.
</lu-mobile-push>
```

## Directive / Composant : `lu-mobile-push`

Ce sélecteur est utilisé pour afficher une notification mobile. Applicable sur les éléments HTML spécifiques au composant.

### Valeurs

| Valeur                     | Description                  |
|----------------------------|------------------------------|
| `""` (vide)                | Variante par défaut          |
| `"right"`                  | Badge aligné à droite        |
| `"bottom"`                 | Badge aligné en bas          |

```html
<lu-mobile-push [alignment]="'right'">...</lu-mobile-push>
```

## Inputs

### `appStoreLinkClicked`
Type: `() => void` — Default: `null`

Événement déclenché lors du clic sur le bouton App Store.

```html
<lu-mobile-push [appStoreLinkClicked]="onAppStoreClick">...</lu-mobile-push>
```

### `googlePlayLinkClicked`
Type: `() => void` — Default: `null`

Événement déclenché lors du clic sur le bouton Google Play.

```html
<lu-mobile-push [googlePlayLinkClicked]="onGooglePlayClick">...</lu-mobile-push>
```

## Patterns courants

### Notification de Pose d'Absence
```html
<lu-mobile-push 
	appStoreLinkClicked="handleAppStoreClick" 
	googlePlayLinkClicked="handleGooglePlayClick">
	Posez une absence depuis n’importe où avec l’application Lucca.
</lu-mobile-push>
```

## Accessibilité
Assurez-vous que le composant dispose de textes suffisamment contrastés et de labels accessibles pour les boutons.

## Guidelines Prisme
- Favorisez l'utilisation de notifications concises et claires pour une meilleure expérience utilisateur.
- Ne surchargez pas le composant avec trop d'informations ou d'options.