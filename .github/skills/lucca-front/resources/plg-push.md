# PLGPush

## Quand utiliser ce composant
- Pour attirer l'attention des utilisateurs sur une nouvelle fonctionnalité de Lucca.
- Lors de la mise en avant d'une solution incitant les utilisateurs à acheter ou essayer un service.
- Pour promouvoir des essais gratuits d'applications Lucca, facilitant ainsi l'engagement des utilisateurs.

## Stories Storybook
- [Documentation complète](https://lucca-front.lucca.io/storybook/?path=/docs/documentation-feedback-plg-push-angular-basic--docs)
- [Template](https://lucca-front.lucca.io/storybook/?path=/story/documentation-feedback-plg-push-angular-basic--template)

## Composant Figma
[Design Figma](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=22031-14975) - Composant visuel pour une publicité représentant une fonctionnalité avec des options d'interaction, comme une icône et un lien. Variante disponible : pr-PLGPush.

## Import

```typescript
import { PLGPushComponent } from '@lucca-front/ng/plg-push';
```

## Usage de base

```html
<lu-plg-push>
	Bénéficiez de toutes les options liées au télétravail avec Timmi Office.
	<a class="link mod-icon" href="#" target="_blank" rel="noopener noreferrer">
		<span class="link-text">Demander un essai gratuit</span><span class="link-icon"><lu-icon class="pr-u-displayContents" icon="arrowExternal" alt="Ouvrir dans une nouvelle fenêtre" /></span>
	</a>
</lu-plg-push>
```

## Directive / Composant : `lu-plg-push`

Composant utilisé pour afficher une publicité mise en avant dans l'interface Lucca. Applicable à tout élément HTML.

### Valeurs

| Valeur | Description |
|--------|-------------|
| `""` (vide) | Variante par défaut |

```html
<lu-plg-push></lu-plg-push>
```

## Inputs

### `heading`
Type: `string` — Default: `''`

Ajoute un titre au composant.

```html
<lu-plg-push [heading]="'Votre titre ici'">...</lu-plg-push>
```

### `removable`
Type: `boolean` — Default: `false`

Rend le composant supprimable.

```html
<lu-plg-push [removable]="true">...</lu-plg-push>
```

## Patterns courants

### Exemple d'utilisation avec suppression
```html
<!-- Utilisation du composant avec l'option supprimable -->
<lu-plg-push [removable]="true">
	Bénéficiez de toutes les options liées au télétravail avec Timmi Office.
	<a class="link mod-icon" href="#" target="_blank" rel="noopener noreferrer">
		<span class="link-text">Demander un essai gratuit</span><span class="link-icon"><lu-icon class="pr-u-displayContents" icon="arrowExternal" alt="Ouvrir dans une nouvelle fenêtre" /></span>
	</a>
</lu-plg-push>
```

## Accessibilité
Assurez-vous que tous les liens contiennent un texte descriptif et que les éléments d'interface soient accessibles par clavier et compatibles avec les lecteurs d'écran.

## Guidelines Prisme
- Suivez les principes esthétiques et fonctionnels établis dans le guide de style Prisme.
- Utilisez la couleur et la typographie conformément aux directives de Lucca.
- Ne pas abuser des appels à l'action, gardez un équilibre visuel dans l'interface.