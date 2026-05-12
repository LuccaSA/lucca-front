# tooltip — Tooltip _(HTML/CSS)_

```css
@forward '@lucca-front/scss/src/components/tooltip';
```

```html
<h3>Tooltip simple</h3>
<button id="random-story-id" type="button" luButton luTooltip="👋 Hello" ${…}>Tooltip au survol</button>
<h3>Tooltip sur un texte</h3>
<span luTooltip="👋 Hello" ${…}>Tooltip au survol</span>
<h3>Tooltip et ellipse</h3>
<div
	class="pr-u-ellipsis"
	style="width: 10rem"
	luTooltip="Ce texte est trop long pour être affiché entièrement. Le tooltip apparait au survol."
	${…}
	[luTooltipWhenEllipsis]="true"
>
	Ce texte est trop long pour être affiché entièrement. Le tooltip apparait au survol.
</div>
<div
	class="pr-u-ellipsis"
	luTooltip="Ce texte est affiché entièrement. Le tooltip n'apparait pas au survol."
	${…}
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
