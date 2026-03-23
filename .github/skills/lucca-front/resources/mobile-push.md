# MobilePush

## Quand utiliser ce composant
- Pour afficher des notifications ou des rappels importants concernant l'application mobile à l'utilisateur.
- Lorsque vous souhaitez diriger les utilisateurs vers l'App Store ou Google Play depuis une application web.
- Pour améliorer l'engagement des utilisateurs avec des messages contextuels sur les fonctionnalités de l'application Lucca.

## Stories Storybook
- [Documentation complète](https://lucca-front.lucca.io/storybook/?path=/docs/documentation-feedback-mobile-push-angular-basic--docs)
- [Template](https://lucca-front.lucca.io/storybook/?path=/story/documentation-feedback-mobile-push-angular-basic--template)

## Composant Figma
[Pr-MobilePush (v20.1)](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=29907-398) - Composant mettant en avant des notifications avec la possibilité d'aligner le badge soit à droite soit en bas.

## Import

```typescript
import { MobilePushComponent } from '@lucca-front/ng/mobile-push';
```

## Usage de base

```html
<!-- Usage minimal -->
<lu-mobile-push>Posez une absence depuis n’importe où avec l’application Lucca.</lu-mobile-push>
```

## Directive / Composant : `lu-mobile-push`

Composant pour afficher des notifications liées à l'application mobile. Applicable sur les éléments HTML pour intégrer des messages d'engagement.

### Valeurs (si directive avec valeurs)

| Valeur                | Description                             |
|-----------------------|-----------------------------------------|
| `""` (vide)           | Variante par défaut                     |
| `"right"`             | Alignment du badge à droite             |
| `"bottom"`            | Alignment du badge en bas               |

```html
<lu-mobile-push badgeAlignment="right">...</lu-mobile-push>
```

## Inputs

### `appStoreLinkClicked`
Type: `null` — Default: `null`

Événement déclenché lors d'un clic sur le bouton App Store.

```html
<lu-mobile-push (appStoreLinkClicked)="action()">...</lu-mobile-push>
```

### `googlePlayLinkClicked`
Type: `null` — Default: `null`

Événement déclenché lors d'un clic sur le bouton Google Play.

```html
<lu-mobile-push (googlePlayLinkClicked)="action()">...</lu-mobile-push>
```

## Patterns courants

### Notification basique
```html
<!-- Notification simple pour rediriger vers l'application mobile -->
<lu-mobile-push (appStoreLinkClicked)="onAppStoreClick()" (googlePlayLinkClicked)="onGooglePlayClick()">Posez une absence depuis n’importe où avec l’application Lucca.</lu-mobile-push>
```

## Accessibilité
S'assurer que les liens vers l'App Store et Google Play sont clairs et accessibles pour les lecteurs d'écran.

## Guidelines Prisme
- Utiliser des messages clairs et concis.
- Éviter de surcharger l'utilisateur avec trop d'informations dans les notifications.
- Assurez-vous que les boutons sont facilement cliquables sur les appareils mobiles.