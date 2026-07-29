# form-label — Label basic _(HTML/CSS)_

```css
@forward '@lucca-front/scss/src/components/form-label';
@forward '@lucca-front/scss/src/components/tag';
```

```html
<label class="formLabel">
	Label
	<sup class="formLabel-required" aria-hidden="true">*</sup>
	<span class="formLabel-info">
		<span aria-hidden="true" class="lucca-icon icon-signHelp"></span>
		<span class="pr-u-mask">?</span>
	</span>
	<span class="formLabel-tag tag">Tag</span>
</label>
```
