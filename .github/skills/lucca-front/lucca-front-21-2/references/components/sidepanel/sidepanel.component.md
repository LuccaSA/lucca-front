# sidepanel — Code & Implementation

📖 [Storybook documentation](https://lucca-front.lucca.io/v21.2.5/storybook/?path=/docs/documentation-navigation-sidepanel--docs)

## HTML/CSS

### Sidepanel

```css
@forward '@lucca-front/scss/src/components/sidepanel';
@forward '@lucca-front/scss/src/components/button';
```

```html
<h1>Sidepanels</h1>

<button type="button" class="button" (click)="openSidepanel()">Open sidepanel</button>
```

### Sidepanel

```css
@forward '@lucca-front/scss/src/components/sidepanel';
@forward '@lucca-front/scss/src/components/button';
```

```html
<lu-toasts [sources]="[]" />
<div class="pr-u-marginBlockEnd200">
	<button type="button" class="button" (click)="openSidepanel()">Open</button>
	<button type="button" class="button" (click)="openDynamicContentSidepanel()">Open (Dynamic)</button>
	<button type="button" class="button" (click)="openUndismissableSidepanel()">Open (Backdrop event)</button>
</div>
<div>
	<button type="button" class="button mod-outlined" (click)="openLegacySidepanel()">Open (Legacy)</button>
	<button type="button" class="button mod-outlined" (click)="openLegacyDynamicContentSidepanel()">
		Open (Legacy & dynamic)
	</button>
</div>
```
