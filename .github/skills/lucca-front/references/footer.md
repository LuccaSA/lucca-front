# pr-Footer

## Quand utiliser ce composant
- Lors de la création de pieds de page pour des applications web.
- Pour encapsuler le contenu de manière structurée dans un footer.
- Pour inclure des actions comme des boutons dans le footer d'une page.

## Stories Storybook
- [Documentation complète](https://lucca-front.lucca.io/storybook/?path=/docs/documentation-listings-index-table-html-css-footer--docs)
- [Basic](https://lucca-front.lucca.io/storybook/?path=/story/documentation-structure-footer-angular-basic--basic)

## Composant Figma
[Vue Figma](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=3101-1652) — Composant pr-Footer avec deux variantes : Screen Size=M et Screen Size=S.

## Import

```typescript
import { FooterComponent } from '@lucca-front/ng/footer';
```

## Usage de base

```html
<lu-footer>
	<ng-container footerContent>
		Content
	</ng-container>
	<button type="button" luButton>Button</button>
	<button type="button" luButton="outlined">Button</button>
</lu-footer>
```

## Directive / Composant : `lu-footer`

Sélecteur utilisé pour intégrer le composant footer dans votre application Angular. Il peut être appliqué n'importe où où un footer est nécessaire.

## Inputs

### `container`
Type: `boolean` — Default: `false`

Applique un container autour du contenu de Page Header.

```html
<lu-footer [container]="true">
	<ng-container footerContent>
		Content
	</ng-container>
</lu-footer>
```

## Patterns courants

### Usage du footer
```html
<!-- Exemple de footer avec contenu et boutons -->
<lu-footer>
	<ng-container footerContent>
		Content
	</ng-container>
	<button type="button" luButton>Button</button>
	<button type="button" luButton="outlined">Button</button>
</lu-footer>
```

## Accessibilité
Assurez-vous que le contenu du footer reste accessible en termes de navigation et qu'il respecte les normes ARIA si nécessaire.

## Guidelines Prisme
- Veillez à utiliser le composant footer dans un contexte où il a du sens visuel et fonctionnel.
- N'incorporez pas de contenu qui pourrait fatiguer l'utilisateur dans le footer.