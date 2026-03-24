# AssetsFooter

## Quand utiliser ce composant
- Lorsque vous avez besoin d'afficher un pied de page pour des listes ou des tableaux dans votre application.
- Pour présenter des informations de totalisation ou de résumé en bas d'une liste.
- Lorsqu'une interaction utilisateur est requise, notamment des boutons pour des actions spécifiques (ex: imprimer, exporter).

## Stories Storybook
- [Documentation complète](https://lucca-front.lucca.io/storybook/?path=/docs/documentation-listings-index-table-html-css-footer--docs)
- [Basic](https://lucca-front.lucca.io/storybook/?path=/story/documentation-structure-footer-angular-basic--basic)

## Composant Figma
[AssetsFooter dans Figma](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=30336-1613) — Composant représentant le pied de page avec des variantes disponibles : AssetsFooter et Total.

## Import

```typescript
import { FooterComponent } from '@lucca-front/ng/listes-tableaux';
```

## Usage de base

```html
<!-- Usage minimal -->
<lu-footer>...</lu-footer>
```

## Directive / Composant : `lu-footer` ou `<lu-footer>`

Description courte du sélecteur. Applicable sur les éléments `<lu-footer>` pour définir un pied de page dans les listes ou tableaux.

## Inputs

Aucun input défini pour ce composant.

## Patterns courants

### Pied de page avec total
```html
<!-- Utilisation du footer pour un pied de page de tableau avec total -->
<lu-footer>...</lu-footer>
```

## Accessibilité
Assurez-vous que le contenu du pied de page est descriptif et accessible via des technologies d'assistance. Utilisez des éléments HTML appropriés pour garantir une navigation fluide.

## Guidelines Prisme
- Utilisez le composant `lu-footer` pour afficher des informations essentielles à l'utilisateur.
- Évitez d'encombrer le pied de page avec trop d'informations.
- Assurez-vous que les actions ou boutons sont clairement étiquetés pour une meilleure compréhension.