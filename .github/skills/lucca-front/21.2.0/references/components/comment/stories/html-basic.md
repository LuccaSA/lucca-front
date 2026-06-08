# comment — Basic _(HTML/CSS)_

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
		<p class="comment-content-text">
			Lorem ipsum dolor sit amet, consectetur adipisicing elit. Temporibus a veniam necessitatibus aut facilis
			repellendus provident nulla iste neque ex?
		</p>
	</blockquote>
</div>
```
