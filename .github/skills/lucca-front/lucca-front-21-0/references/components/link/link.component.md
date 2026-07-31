# link — Code & Implementation

📖 [Storybook documentation](https://lucca-front.lucca.io/v21.0.5/storybook/?path=/docs/documentation-actions-link-angular-test--docs)

## HTML/CSS

### Sécurité

Pour des raisons de sécurité il convient de rajouter à nos liens externes, les attributs `rel="noopener noreferrer"`. Ceci évite au navigateur d'ouvrir la ressource cible en donnant au nouveau contexte de navigation l'accès au document précédent. Pour plus de précisions : [https://developer.mozilla.org/fr/docs/Web/HTML/Attributes/rel/noopener](https://developer.mozilla.org/fr/docs/Web/HTML/Attributes/rel/noopener)

### Testing

```css
@forward '@lucca-front/scss/src/components/link';
```

```html
<div>
	<a luLink="/first">Go to /first</a>
	<br />
	<a luLink="/second">Go to /second</a>
	<br />
	<a luLink [href]="url" target="_blank" external>Go to https://example.org</a>
</div>
<router-outlet />
```

### Angular

```css
@forward '@lucca-front/scss/src/components/link';
```

```html
Angular Navigation side:
<a luLink="./#example">Text link</a>
<br />
Browser Navigation side:
<a href="https://www.example.org" luLink>Text link</a>
```

### Basic

```css
@forward '@lucca-front/scss/src/components/link';
```

```html
<a href="#" class="link">Text link</a>
<br />
<br />
<a class="link mod-icon" href="#" target="_blank">
	Text link
	<!-- no text node here -->
	<span aria-hidden="true" class="lucca-icon icon-arrowExternal"></span>
	<span class="pr-u-mask">Open in a new window</span>
</a>
```
