# pr-PLGPush

## Quand utiliser ce composant
- Pour mettre en avant une fonctionnalité spécifique dans une interface Lucca.
- Lorsqu'il est nécessaire d'encourager l'utilisateur à découvrir d'autres applications Lucca.
- Pour améliorer l'engagement des utilisateurs en présentant des solutions pertinentes.

## Stories Storybook
- [Documentation complète](https://lucca-front.lucca.io/storybook/?path=/docs/documentation-feedback-plg-push-angular-basic--docs)
- [Template](https://lucca-front.lucca.io/storybook/?path=/story/documentation-feedback-plg-push-angular-basic--template)

## Composant Figma
[Pr-PLGPush sur Figma](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=22031-14975) - Ce composant présente une publicité stylisée pour attirer l'attention sur une fonctionnalité ou une application, avec des variantes spécifiques disponibles.

## Import

```typescript
import { PLGPushComponent } from '@lucca-front/ng/feedback';
```

## Usage de base

```html
<!-- Usage minimal -->
<lu-plg-push>...</lu-plg-push>
```

## Directive / Composant : `lu-plg-push`

Le sélecteur `lu-plg-push` est utilisé pour appliquer le composant pr-PLGPush dans vos templates Angular. Il peut être utilisé avec tout élément HTML.

## Inputs

_Non spécifié dans les données fournies._

## Patterns courants

### Exemple de mise en avant
```html
<lu-plg-push>Découvrez notre nouvelle fonctionnalité !</lu-plg-push>
```

## Accessibilité
Assurez-vous que le contenu de la publicité soit accessible par les lecteurs d'écran et facilement compréhensible. Utilisez des attributs ARIA si nécessaire pour fournir un contexte supplémentaire aux utilisateurs ayant des besoins spécifiques.

## Guidelines Prisme
- Utilisez des call-to-action clairs et visibles.
- Ne surchargez pas le composant avec trop d'informations, restez concis.
- Évitez de dissimuler des fonctionnalités existantes derrière le composant pr-PLGPush.