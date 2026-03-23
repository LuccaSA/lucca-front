# pr-TextFlow

## Quand utiliser ce composant
- Lorsque vous souhaitez afficher un contenu textuel structuré avec des titres et des paragraphes.
- Pour créer une hiérarchie visuelle dans vos documents textuels, facilitant la lecture et la compréhension.
- Lors de la présentation de listes (à puces ou ordonnées) dans un format stylisé.

## Stories Storybook
- [Documentation complète](https://lucca-front.lucca.io/storybook/?path=/docs/documentation-texts-text-flow-angular-basic--docs)
- [Basic](https://lucca-front.lucca.io/storybook/?path=/story/documentation-texts-text-flow-angular-basic--basic)

## Composant Figma
[Link Figma](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=30462-137476) - Composant pr-TextFlow (v19.2) permettant de styliser différents éléments textuels. Variantes disponibles : pr-TextFlow (v19.2).

## Import

```typescript
import { TextFlowComponent } from '@lucca-front/ng/text-flow';
```

## Usage de base

```html
<!-- Usage minimal -->
<lu-text-flow>
	<h1>Heading 1</h1>
	<h2>Heading 2</h2>
	<p>Paragraph</p>
	<p>Paragraph</p>
	<h2>Heading 2</h2>
	<p>Paragraph</p>
	<ul>
		<li>List item</li>
		<li>List item</li>
		<li>List item</li>
	</ul>
	<h3>Heading 3</h3>
	<p>Paragraph</p>
	<h4>Heading 4</h4>
	<ol>
		<li>List item</li>
		<li>List item</li>
		<li>List item</li>
	</ol>
</lu-text-flow>
```

## Directive / Composant : `lu-text-flow` ou `<lu-text-flow>`

Composant utilisé pour encapsuler du contenu textuel structuré. Applicable sur des éléments HTML qui contiennent du texte et des éléments enfants comme `<h1>`, `<h2>`, `<p>`, `<ul>`, et `<ol>`.

## Inputs

Aucun input ou valeur spécifique n'est défini pour ce composant.

## Patterns courants

### Exemple de contenu textuel
```html
<lu-text-flow>
	<h1>Mon Titre Principal</h1>
	<p>Ceci est un exemple d'utilisation du composant pr-TextFlow pour afficher un contenu textuel avec une structure hiérarchique.</p>
	<ul>
		<li>Élément de la liste</li>
		<li>Élément de la liste</li>
		<li>Élément de la liste</li>
	</ul>
</lu-text-flow>
```

## Accessibilité
Assurez-vous que les titres sont utilisés de manière hiérarchique (de `<h1>` à `<h6>`) pour maintenir la structure et l'accessibilité des contenus textuels.

## Guidelines Prisme
- Utiliser des titres pour segmenter le contenu.
- Éviter de surcharger le composant avec trop de texte.
- Maintenir une hiérarchie visuelle claire tout au long du texte.