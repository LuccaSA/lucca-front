# tile — Basic _(HTML/CSS)_

```css
@forward '@lucca-front/scss/src/components/user';
@forward '@lucca-front/scss/src/components/avatar';
@forward '@lucca-front/scss/src/components/userTile';
```

```html
<div class="userTile">
	<div class="avatar">
		<img alt="" class="avatar-picture" loading="lazy" src="https://cdn.lucca.fr/lucca-front/avatars/finn.png" />
	</div>
	<dl class="userTile-content">
		<dt class="userTile-content-name" translate="no">Mertens Finn</dt>
		<dd class="userTile-content-info">Hero</dd>
	</dl>
</div>
```
