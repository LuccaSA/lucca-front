# tooltip — Code & Implementation

📖 [Storybook documentation](https://lucca-front.lucca.io/v21.1.4/storybook/?path=/docs/documentation-overlays-tooltip-html-css--docs)

## Angular

Directive selector : `luTooltip`

Un tooltip ne devrait pas contenir de HTML. Si une mise en forme est nécessaire, le popover est à privilégier.

## HTML/CSS

### Html

```css
@forward '@lucca-front/scss/src/components/tooltip';
```

```html
<div class="tooltip">{{ content }}</div>
```

### Tooltip

```css
@forward '@lucca-front/scss/src/components/tooltip';
```

```html
<h3>Tooltip simple</h3>
<button
	id="random-story-id"
	type="button"
	luButton
	luTooltip="👋 Hello"
	luTooltipEnterDelay="300"
	luTooltipLeaveDelay="100"
>
	Tooltip au survol
</button>
<h3>Tooltip sur un texte</h3>
<span luTooltip="👋 Hello" luTooltipEnterDelay="300" luTooltipLeaveDelay="100">Tooltip au survol</span>
<h3>Tooltip et ellipse</h3>
<div
	class="pr-u-ellipsis"
	style="width: 10rem"
	luTooltip="Ce texte est trop long pour être affiché entièrement. Le tooltip apparait au survol."
	luTooltipEnterDelay="300"
	luTooltipLeaveDelay="100"
	[luTooltipWhenEllipsis]="true"
>
	Ce texte est trop long pour être affiché entièrement. Le tooltip apparait au survol.
</div>
<div
	class="pr-u-ellipsis"
	luTooltip="Ce texte est affiché entièrement. Le tooltip n'apparait pas au survol."
	luTooltipEnterDelay="300"
	luTooltipLeaveDelay="100"
	[luTooltipWhenEllipsis]="true"
>
	Ce texte est affiché entièrement. Le tooltip n'apparait pas au survol.
</div>
<h3>Tooltip et icône (avec alternative)</h3>
<lu-icon icon="star" alt="Favoris" luTooltip="Favoris" luTooltipOnlyForDisplay="true" />

<h3>Tooltip affiché avec un host séparé</h3>
<span class="pr-u-marginInlineEnd800" luTooltip="… mais apparait là !" [luTooltipAnchor]="target">
	Tooltip déclenché ici…
</span>
<span aria-hidden="true" #target class="lucca-icon icon-target"></span>
```
