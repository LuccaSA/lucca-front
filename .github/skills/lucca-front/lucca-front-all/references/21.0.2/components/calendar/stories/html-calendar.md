# calendar — Calendar _(HTML/CSS)_

```css
@forward '@lucca-front/scss/src/components/date';
@forward '@lucca-front/scss/src/components/button';
```

```html
<lu-calendar [(ngModel)]="date" />

<button type="button" class="button mod-outlined pr-u-marginInlineEnd200" (click)="random()">Random</button>

{{ date | luDate: 'full' }}
```
