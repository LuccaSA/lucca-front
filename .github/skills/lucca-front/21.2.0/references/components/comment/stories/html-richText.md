# comment — RichText _(HTML/CSS)_

```css
@forward '@lucca-front/scss/src/components/comment';
@forward '@lucca-front/scss/src/components/avatar';
```

```html
<div class="comment">
	<div class="comment-infos">
		<div class="avatar"></div>
		<div class="comment-infos-content">
			<span class="comment-infos-name">Marie Bragoulet</span>
			&ngsp;
			<time class="comment-infos-date" datetime="2024-01-04T16:50:00+00:00">Lun. 4 janv. à 16:50</time>
		</div>
	</div>
	<blockquote class="comment-content">
		<div class="comment-content-textContainerOptional">
			<h3>Lorem, ipsum.</h3>
			<p>
				Lorem ipsum, dolor sit amet consectetur adipisicing elit.
				<strong>Facilis voluptates ex</strong>
				qui iste libero suscipit cum earum harum animi praesentium, quidem non incidunt vel illum sunt nihil
				reprehenderit a itaque.
			</p>
			<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque numquam itaque at facilis iusto inventore.</p>
		</div>
	</blockquote>
</div>
```
