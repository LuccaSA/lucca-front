# pr-DataPresentation (v21.1) 🎉

## Quand utiliser ce composant
- Pour afficher des données de manière structurée et esthétique dans des formulaires.
- Pour présenter des informations complexes de manière claire et concise.
- Lorsque vous avez besoin d'un composant réutilisable pour afficher des groupes de données dans différentes sections d'une application.

## Stories Storybook
- [Documentation complète](https://lucca-front.lucca.io/storybook/?path=/docs/documentation-forms-data-presentation-angular-basic--docs)
- [Template](https://lucca-front.lucca.io/storybook/?path=/story/documentation-forms-data-presentation-angular-basic--template)

## Composant Figma
[Style Figma](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=34358-99807) - Composant de présentation visuelle pour des ensembles de données, avec variantes disponibles pour personnaliser l'affichage.

## Import

```typescript
import { DataPresentationComponent } from '@lucca-front/ng/forms';
```

## Usage de base

```html
<!-- Usage minimal -->
<lu-data-presentation>...</lu-data-presentation>
```

## Directive / Composant : `lu-data-presentation` ou `<lu-data-presentation>`

Ce sélecteur est utilisé pour le composant de présentation de données, applicable sur les éléments HTML définis.

## Inputs
Aucun input spécifique n'est disponible pour ce composant.

## Patterns courants

### Présentation standard
```html
<!-- Exemple d'utilisation pour afficher des données -->
<lu-data-presentation>
  <!-- Contenu des données à afficher -->
</lu-data-presentation>
```

## Accessibilité
Assurez-vous que le composant respecte les bonnes pratiques d'accessibilité en fournissant des éléments de navigation clairs et en utilisant des attributs ARIA si nécessaire.

## Guidelines Prisme
- Respectez les principes de clarté et de simplicité dans la présentation des données.
- Évitez d'encombrer le composant avec trop d'informations à la fois.
- Utilisez des espaces et des séparateurs pour améliorer la lisibilité.