# pr-DataPresentation (v21.1) 🎉

## Quand utiliser ce composant
1. Affichage clair et lisible de données descriptives ou de métadonnées dans un formulaire ou un résumé.
2. Prévoir un champ en mode "lecture seule" ayant une étiquette et une valeur associée.
3. Cas où l'utilisateur ne doit pas modifier l'information affichée, mais où elle est nécessaire pour contextualiser d'autres interactions.

## Stories Storybook
- [Documentation complète](https://lucca-front.lucca.io/storybook/?path=/docs/documentation-forms-data-presentation-angular-basic--docs)
- [Exemple interactif](https://lucca-front.lucca.io/storybook/?path=/story/documentation-forms-data-presentation-angular-basic--template)

## Composant Figma
- [Lien Figma](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=34358-99807)
- Variant disponible : pr-DataPresentation (v21.1) 🎉
- Affiche une donnée associée à une étiquette, style conforme à Lucca Design System.

## Import

```typescript
import { DataPresentationComponent } from '@lucca-front/ng/form-field';
```

## Usage de base

```html
<!-- Usage minimal avec une étiquette et une valeur -->
<lu-data-presentation label="label">Value</lu-data-presentation>
```

## Directive / Composant : `<lu-data-presentation>`

Le sélecteur `lu-data-presentation` est utilisé pour afficher une donnée accompagnée de son libellé descriptif. Ce composant se place généralement dans les formulaires ou lorsqu'une donnée doit être affichée en mode lecture seule.

### Inputs

#### `label`
Type : `string` — Default : `undefined`

Libellé descriptif de la donnée affichée.

```html
<lu-data-presentation label="Nom complet">John Doe</lu-data-presentation>
```

## Patterns courants

### Présentation simple de donnée
```html
<lu-data-presentation label="Email">example@email.com</lu-data-presentation>
```

### Utilisation dans un formulaire en lecture seule
```html
<form>
	<lu-data-presentation label="Nom">Léa Dupont</lu-data-presentation>
	<lu-data-presentation label="Âge">28 ans</lu-data-presentation>
</form>
```

### Donnée complexe avec HTML
```html
<lu-data-presentation label="Adresse">
	123 Rue de l'Innovation<br>
	75001 Paris, France
</lu-data-presentation>
```

## Accessibilité
- Le libellé (`label`) est accessible aux lecteurs d'écran.
- Veiller à ce que le contenu affiché sous `<lu-data-presentation>` soit compréhensible et distinct.
- Favorisez des libellés explicites qui fournissent un contexte clair pour la donnée affichée.

## Guidelines Prisme
- [Guidelines Prisme pour Data Presentation](https://prisme.lucca.io/94310e217/v/latest/p/02bfb1)
- Ne surchargez pas le contenu du composant avec trop d'informations à la fois.
- Utilisez des libellés courts et explicites pour clarifier les données présentées.