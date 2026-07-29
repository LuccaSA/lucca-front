---
name: generate-story-qa
description: 'Génère une story QA à partir de guidelines et du contrat d’interface d’un composant.'
---

Chaque composant possède une story QA qui liste les cas d’usage permettant de tester ses différentes options. Ces stories sont situées dans `stories/qa/<composant>/` et suivent un format strict pour être facilement maintenues et utilisées par les équipes de développement et de QA.
## Processus de génération

### 1. Analyser le contrat d'interface du composant

Avant de générer la story, explorer le code source du composant dans `packages/ng/<composant>/` pour identifier :

- Les **inputs** (`@Input()`) : chaque input avec plusieurs valeurs possibles doit avoir une ligne dans la table
- Les **outputs** (`@Output()`) : à mentionner si nécessaire dans un cas de test interactif
- Les **classes CSS modificatrices** (`mod-*`, `is-*`, `palette-*`) définies dans le SCSS
- Les **éléments enfants** ou slots de contenu (ex: icône, badge, texte)
- Les **états** (`disabled`, `loading`, `error`, `success`…)

Chaque combinaison significative d'options donne lieu à une ligne dans la table QA.

### 2. Intégrer les guidelines design (optionnel)

Si des guidelines design sont fournies (texte, Figma, documentation), les utiliser pour :

- Enrichir les labels des cas de test avec la terminologie officielle
- Ajouter des cas de test couvrant les règles d'usage (ex: "ne pas utiliser X avec Y")
- Suggérer des cas limites ou d'accessibilité mentionnés dans les guidelines
- Ordonner les lignes selon la logique de présentation du design system

Si aucune guideline n'est fournie, demander à l'utilisateur s'il souhaite en fournir une (lien Figma, documentation, texte libre) avant de générer la story, en précisant que cela permettra de couvrir les règles d'usage officielles et les cas limites. Si l'utilisateur confirme qu'il n'en a pas, se baser uniquement sur le contrat d'interface.

### 3. Déduire les cas de test

Ordre de priorité recommandé pour les lignes de la table :
1. **Default** — rendu de base sans option particulière
2. **Variantes visuelles** (styles, modes, apparences)
3. **Palettes** — si le composant supporte `palette-*`
4. **Tailles** — si le composant supporte `mod-S`, `mod-M`, `mod-XS`…
5. **Contenu enrichi** — icône, badge, slot supplémentaire
6. **États** — `loading`, `success`, `error`
7. **Disabled**
8. **Cas spécifiques** — deprecated, groupes, combinaisons remarquables## Structure des fichiers générés

Chaque dossier contient exactement **2 fichiers** :

```
stories/qa/<composant>/
├── <composant>.stories.ts
└── <composant>.stories.html
```

## `<composant>.stories.ts`

```typescript
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MonComposantComponent } from '@lucca-front/ng/mon-composant';
import { Meta, StoryObj } from '@storybook/angular-vite';

@Component({
	selector: 'mon-composant-stories',
	templateUrl: './mon-composant.stories.html',
	imports: [MonComposantComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class MonComposantStory {
	// Propriétés réactives si nécessaire (ex: données pour les selects)
}

export default {
	title: 'QA/MonComposant',
	component: MonComposantStory,
} as Meta;

const template = () => ({});

export const Basic: StoryObj<MonComposantStory> = {
	args: {},
	render: template,
};
```

Règles :
- Le `selector` suit le pattern `<kebab-case>-stories`
- `changeDetection: ChangeDetectionStrategy.OnPush` est toujours présent
- `title` suit le pattern `'QA/<NomPascalCase>'`
- Un seul export `Basic` dans la grande majorité des cas
- Les propriétés de classe ne sont ajoutées que si le template en a besoin (données, état)

## `<composant>.stories.html`

```html
<table class="demo-QAtable">
	<tbody>
		<tr>
			<td></td>
			<td>
				<div class="demo-QAtable-list">HTML</div>
			</td>
			<td>
				<div class="demo-QAtable-list">Angular</div>
			</td>
		</tr>
		<tr>
			<td>Default</td>
			<td>
				<div class="demo-QAtable-list">
					<!-- Implémentation HTML pure avec classes CSS -->
				</div>
			</td>
			<td>
				<div class="demo-QAtable-list">
					<!-- Implémentation Angular avec composants/directives -->
				</div>
			</td>
		</tr>
		<tr>
			<td>Variante A</td>
			<td>
				<div class="demo-QAtable-list"><!-- ... --></div>
			</td>
			<td>
				<div class="demo-QAtable-list"><!-- ... --></div>
			</td>
		</tr>
		<!-- Une ligne par cas de test -->
	</tbody>
</table>

<!-- To tell the ui-diff tool that the page has finished rendering -->
<span id="ready"></span>
```

Règles :
- Table à **3 colonnes** : label du cas | HTML | Angular
- La première ligne est un en-tête avec les libellés des colonnes
- Chaque `<tr>` représente un cas de test (Default, Style, Size, States, Disabled…)
- `demo-QAtable-list` est toujours présent pour wrapper les exemples d'une même cellule
- `<span id="ready"></span>` est obligatoire en fin de fichier (signal pour l'outil ui-diff)
- Quand une colonne n'a pas d'équivalent (ex: cas HTML only), la `<td>` reste vide
