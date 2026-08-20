# text-flow — Code & Implementation

📖 [Storybook documentation](https://lucca-front.lucca.io/v21.1.4/storybook/?path=/docs/documentation-texts-text-flow-angular-basic--docs)

## Angular

Component selector : `lu-text-flow`

### Basic

```js
import { TextFlowComponent } from '@lucca-front/ng/text-flow';
```

```html
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

## HTML/CSS

### Basic

```css
@forward '@lucca-front/scss/src/components/text-flow';
```

```html
<div class="textFlow">
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
</div>
```
