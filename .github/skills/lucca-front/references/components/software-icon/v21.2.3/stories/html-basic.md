# software-icon — Basic _(HTML/CSS)_

```css
@forward '@lucca-front/scss/src/components/software-icon';
```

```html
<div
	class="softwareIcon"
	aria-hidden="true"
	[innerHtml]="'https://cdn.lucca.fr/transverse/prisme/visuals/software-icon/absences.svg' | luSafeExternalSvg"
></div>
<span class="pr-u-mask">Absences</span>
```
