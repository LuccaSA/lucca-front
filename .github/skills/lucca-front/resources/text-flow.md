# pr-TextFlow

## Quand utiliser ce composant
- Pour créer des présentations de contenu textuel hiérarchique, comme des articles avec titres et paragraphes.
- Lorsqu'il est nécessaire d'appliquer des styles typographiques cohérents dans un document ou une interface.
- Pour organiser des listes avec des éléments de texte dans une interface utilisateur tout en respectant les bonnes pratiques d'accessibilité.

## Stories Storybook
- [Documentation complète](https://lucca-front.lucca.io/storybook/?path=/docs/documentation-texts-text-flow-angular-basic--docs)
- [Basic](https://lucca-front.lucca.io/storybook/?path=/story/documentation-texts-text-flow-angular-basic--basic)

## Composant Figma
[https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=30462-137476](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=30462-137476) - Le pr-TextFlow est illustré avec différentes variantes typographiques pour le contenu texte.

## Import

```typescript
import { TextFlowComponent } from '@lucca-front/ng/texts';
```

## Usage de base

```html
<!-- Usage minimal -->
<lu-text-flow>... contenu textuel ...</lu-text-flow>
```

## Directive / Composant : `lu-text-flow`

Composant permettant de structurer et styliser un contenu textuel. Applicable sur des éléments de contenu textuel.

## Inputs

Aucun input spécifique n'est mentionné dans la documentation.

## Patterns courants

### Exemple de structure de contenu
```html
<!-- Exemples d'utilisation des éléments typographiques avec le composant -->
<lu-text-flow>
  <h1>Titre principal</h1>
  <p>Un paragraphe descriptif ici.</p>
  <ul>
    <li>Élément de liste 1</li>
    <li>Élément de liste 2</li>
  </ul>
</lu-text-flow>
```

## Accessibilité
Le composant pr-TextFlow respecte les bonnes pratiques d'accessibilité en garantissant une hiérarchie visuelle claire des éléments textuels. Assurez-vous que les titres et paragraphes sont correctement étiquetés.

## Guidelines Prisme
- Suivre les directives de typographie et d'agencement fournies dans le styleguide de Prisme pour garantir la cohérence visuelle.