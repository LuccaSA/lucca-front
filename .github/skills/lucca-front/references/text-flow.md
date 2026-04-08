# Text Flow

## Quand utiliser ce composant
- Pour afficher un ensemble structuré de contenu textuel avec une hiérarchie visuelle claire.  
- Pour structurer et styliser différents types d'éléments textuels tels que titres, paragraphes ou listes.  
- Pour présenter du contenu qui nécessite une hiérarchie organisée au sein de designs éditoriaux et informatifs.

## Stories Storybook
[Documentation complète](https://lucca-front.lucca.io/storybook/?path=/docs/documentation-texts-text-flow-angular-basic--docs)  
[Basic](https://lucca-front.lucca.io/storybook/?path=/story/documentation-texts-text-flow-angular-basic--basic)  

## Composant Figma
Lien : [pr-TextFlow (v19.2)](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=30462-137476)  
Description : Le composant Text flow est présenté dans une variété de styles pour être adapté à des cas d'usage variés. Il inclut des exemples avec des titres, des sous-titres, des paragraphes et des listes.

## Import

```typescript
import { TextFlowComponent } from '@lucca-front/ng/text-flow';
```

## Usage de base

```html
<!-- Structuration d'un texte simple -->
<lu-text-flow>
  <h1>Titre principal</h1>
  <p>Voici un paragraphe introductif décrivant une section.</p>
  <h2>Sous-titre niveau 2</h2>
  <p>Un autre paragraphe situé sous le sous-titre.</p>
  <ul>
    <li>Élément de liste 1</li>
    <li>Élément de liste 2</li>
  </ul>
</lu-text-flow>
```

## Directive / Composant : `<lu-text-flow>`

Le sélecteur `lu-text-flow` permet d'encapsuler et de styliser du contenu textuel varié.  
Enveloppez vos éléments HTML (`<h1>`, `<h2>`, `<p>`, `<ul>`, etc.) pour appliquer les styles définis par le design system.

## Inputs

Il n'y a pas d'inputs à configurer pour ce composant.

## Patterns courants

### Structuration de texte avec liens et listes numérotées
```html
<lu-text-flow>
  <h2>Titre de section</h2>
  <p>Voici un texte de description avec un lien vers <a href="#">une autre page</a>.</p>
  <ol>
    <li>Liste numérotée, élément 1</li>
    <li>Liste numérotée, élément 2</li>
  </ol>
</lu-text-flow>
```

### Texte complexe avec plusieurs niveaux hiérarchiques
```html
<lu-text-flow>
  <h1>Titre principal</h1>
  <p>Un texte introductif.</p>
  <h2>Niveau 2</h2>
  <p>Un contenu de niveau intermédiaire.</p>
  <h3>Niveau 3</h3>
  <p>Un détail approfondi ou complémentaire.</p>
</lu-text-flow>
```

## Accessibilité
- Structure sémantique conforme pour les lecteurs d'écran : utilisez des balises HTML appropriées (`<h1>`, `<p>`, `<ul>`, etc.) pour refléter la hiérarchie et optimiser l'accessibilité.
- Vérifiez que les contrastes de texte suivent les standards AA/AAA pour une lecture claire.

## Guidelines Prisme
Le Text flow est documenté dans Prisme : [Text flow](https://prisme.lucca.io/94310e217/v/latest/p/51e878).  
Ce guide fournit des recommandations sur l'utilisation correcte du composant, en expliquant la hiérarchisation des textes dans différents contextes de design.