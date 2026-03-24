# Callout

## Quand utiliser ce composant
1. Pour afficher des messages contextuels importants, par exemple des alertes ou des notifications.
2. Pour présenter des informations guidées ou des suggestions contextuelles à l'utilisateur.
3. Pour afficher des listes d'actions ou de retours d'informations dans un contexte clair et structuré.

## Stories Storybook
- [Documentation complète](https://lucca-front.lucca.io/storybook/?path=/docs/documentation-feedback-callout-angular-ai--docs)
- [Action](https://lucca-front.lucca.io/storybook/?path=/story/documentation-feedback-callout-angular-ai--action)
- [Event](https://lucca-front.lucca.io/storybook/?path=/story/documentation-feedback-callout-angular-ai--event)
- [Suggestion](https://lucca-front.lucca.io/storybook/?path=/story/documentation-feedback-callout-angular-ai--suggestion)
- [Basic](https://lucca-front.lucca.io/storybook/?path=/story/documentation-feedback-callout-angular-ai--basic)
- [Template](https://lucca-front.lucca.io/storybook/?path=/story/documentation-feedback-callout-angular-basic--template)

## Composant Figma
[Lien Figma](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=6053-35275)  
Le composant Callout est visuellement conçu pour être utilisé dans des contextes d'information et d'interaction structurés. Les variantes disponibles permettent de choisir entre différentes tailles (S, M) et palettes de couleurs (Critical, Success, Neutral, Warning, AI).

## Import

```typescript
import { CalloutComponent, CalloutActionsComponent, CalloutFeedbackItemComponent, CalloutFeedbackListComponent } from '@lucca-front/ng/callout';
```

## Usage de base

```html
<!-- Usage minimal -->
<lu-callout>Contenu du callout</lu-callout>
```

## Composant : `<lu-callout>`

Le composant principal pour afficher un message contextuel. Utilisé comme conteneur.

### Inputs

#### `iconAlt`
Type: `string | null` — Default: `null`  
Permet de configurer un texte alternatif pour l'icône du callout.

```html
<lu-callout iconAlt="Description de l'icône">Contenu du callout</lu-callout>
```

#### `AI`
Type: `boolean` — Default: `false`  
Active un style particulier pour les callouts relatifs à l'intelligence artificielle.

```html
<lu-callout [AI]="true">Contenu du callout lié à l'IA</lu-callout>
```

---

## Composant : `<lu-callout-actions>`

Ce composant est utilisé comme conteneur pour placer des actions (boutons) spécifiques à l'intérieur d'un callout.

### Exemple

```html
<lu-callout>
	<p>Texte descriptif du callout</p>
	<lu-callout-actions>
		<button luButton="outlined" type="button">Annuler</button>
		<button luButton="outlined" type="button">Confirmer</button>
	</lu-callout-actions>
</lu-callout>
```

---

## Directive : `ul[lu-callout-feedback-list]`

Utilisée pour afficher une liste de retours associés à un callout.

```html
<lu-callout>
	<p>Retours associés :</p>
	<ul lu-callout-feedback-list>
		<li lu-feedback-item-description>Premier retour</li>
		<li lu-feedback-item-description>Deuxième retour</li>
	</ul>
</lu-callout>
```

---

## Patterns courants

### Callout avec actions
```html
<lu-callout [AI]="false" iconAlt="Description de l'icône">
	<p>Ce message est important pour l'utilisateur.</p>
	<lu-callout-actions>
		<button luButton="outlined" type="button">Accepter</button>
		<button luButton="outlined" type="button">Refuser</button>
	</lu-callout-actions>
</lu-callout>
```

### Callout de type AI
```html
<lu-callout [AI]="true" iconAlt="Icône AI">
	<p>Ceci est une suggestion basée sur une intelligence artificielle.</p>
</lu-callout>
```

### Callout avec liste de feedback
```html
<lu-callout>
	<p>Voici les retours :</p>
	<ul lu-callout-feedback-list>
		<li lu-feedback-item-description>Achat validé</li>
		<li lu-feedback-item-description>Objectif atteint</li>
	</ul>
</lu-callout>
```

## Accessibilité
- L'attribut `iconAlt` doit être fourni pour les callouts incluant une icône afin de ne pas laisser le champ vide pour les lecteurs d'écran.
- Utilisez des balises sémantiques pour structurer correctement le contenu interne du callout.

## Guidelines Prisme
Pas de guidelines disponibles actuellement.