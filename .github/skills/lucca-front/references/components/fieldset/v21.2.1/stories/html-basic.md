# fieldset — Basic _(HTML/CSS)_

```css
@forward '@lucca-front/scss/src/components/form-field';
@forward '@lucca-front/scss/src/components/fieldset';
```

```html
<fieldset class="fieldset mod-expandable${…}" aria-labelledby="fieldsetTitleContent1">
	<legend class="fieldset-title">
		<button
			type="button"
			class="fieldset-title-content"
			id="fieldsetTitleContent1"
			[attr.aria-expanded]="expanded"
			(click)="expanded = !expanded"
		>
			<span class="fieldset-title-content-text">${…}${…}</span>
			<span class="lucca-icon icon-arrowChevronBottom" aria-hidden="true"></span>
		</button>
	</legend>
	<div class="fieldset-content" [attr.hidden]="expanded ? null : 'hidden'">${…}</div>
</fieldset>
```

```html
<fieldset class="fieldset${…}${…}" aria-labelledby="fieldsetTitleContent1">
	<legend class="fieldset-title">
		<span class="fieldset-title-content" id="fieldsetTitleContent1">
			<span class="fieldset-title-content-text">${…}${…}</span>
		</span>
	</legend>
	<div class="fieldset-content">${…}</div>
</fieldset>
```
