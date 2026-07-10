# link — Testing _(HTML/CSS)_

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
