# tableofcontent — Code & Implementation

📖 [Storybook documentation](https://lucca-front.lucca.io/v22.0.0/storybook/?path=/docs/documentation-navigation-tableofcontent-angular-basic--docs)

## Angular

Mots-clés : table des matières, sommaire, ancres

Component selector : `lu-table-of-content`

### Of content

```js
import { TableOfContentComponent, TableOfContentLinkDirective } from '@lucca-front/ng/table-of-content';
```

```html
<lu-table-of-content>
	<a *luTableOfContentLink class="is-active" href="#" (click)="$event.preventDefault()">Section 1</a>
	<a *luTableOfContentLink href="#" (click)="$event.preventDefault()">Section 2</a>
	<a *luTableOfContentLink href="#" (click)="$event.preventDefault()">Section 3</a>
	<a *luTableOfContentLink href="#" (click)="$event.preventDefault()">Section 4</a>
</lu-table-of-content>
```

## HTML/CSS

Classe CSS : `.tableOfContent`

La table des matière est sticky par défaut. Ajoutez une valeur top à `tableOfContent` pour l'activer.

### Of content

```css
@forward '@lucca-front/scss/src/components/table-of-content';
```

```html
<nav class="tableOfContent">
	<ul class="tableOfContent-list">
		<li class="tableOfContent-list-item">
			<a href="#" class="tableOfContent-list-item-action is-active">Section 1</a>
		</li>
		<li class="tableOfContent-list-item">
			<a href="#" class="tableOfContent-list-item-action">Section 2</a>
		</li>
		<li class="tableOfContent-list-item">
			<a href="#" class="tableOfContent-list-item-action">Section 3</a>
		</li>
		<li class="tableOfContent-list-item">
			<a href="#" class="tableOfContent-list-item-action">Section 4</a>
		</li>
	</ul>
</nav>
```
