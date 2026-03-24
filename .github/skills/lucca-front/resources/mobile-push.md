# pr-MobilePush

## Quand utiliser ce composant
- Pour afficher des notifications ou des alertes sous forme de push mobile.
- Lorsque vous souhaitez informer les utilisateurs d'événements importants de manière discrète et efficace.
- Pour des interactions rapides grâce à un affichage temporaire de messages sur les appareils mobiles.

## Stories Storybook
- [Documentation complète](https://lucca-front.lucca.io/storybook/?path=/docs/documentation-feedback-mobile-push-angular-basic--docs)
- [Template](https://lucca-front.lucca.io/storybook/?path=/story/documentation-feedback-mobile-push-angular-basic--template)

## Composant Figma
[Vue du composant dans Figma](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=29907-398). Ce composant présente des variantes pour l'alignement du badge : à droite et en bas.

## Import

```typescript
import { MobilePushComponent } from '@lucca-front/ng/feedback';
```

## Usage de base

```html
<lu-mobile-push>Votre message ici</lu-mobile-push>
```

## Directive / Composant : `lu-mobile-push`

Composant utilisé pour afficher des notifications sur mobile. Applicable sur les éléments HTML.

### Valeurs

| Valeur | Description |
|--------|-------------|
| `""` (vide)  | Variante par défaut |
| `"badge-right"` | Badge aligné à droite |
| `"badge-bottom"` | Badge aligné en bas |

```html
<lu-mobile-push badge-alignment="badge-right">Message avec badge à droite</lu-mobile-push>
```

## Inputs

### `badgeAlignment`
Type: `'badge-right' | 'badge-bottom'` — Default: `''`

Permet de définir la position du badge sur le composant.

```html
<lu-mobile-push [badgeAlignment]="'badge-bottom'">Message avec badge en bas</lu-mobile-push>
```

## Patterns courants

### Notification simple
```html
<lu-mobile-push>Nouvelle mise à jour disponible!</lu-mobile-push>
```

## Accessibilité
S'assurer que le composant est lisible et offre une interaction tactile adéquate pour les utilisateurs d'appareils mobiles.

## Guidelines Prisme
- Utiliser le composant pour des notifications nécessaires et non intrusives.
- Ne pas surcharger l'écran avec des messages multiples en même temps.
- S'assurer que le contenu du message est concis et clair.