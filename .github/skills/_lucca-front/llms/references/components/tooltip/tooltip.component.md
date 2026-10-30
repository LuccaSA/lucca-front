# tooltip — Code & Implementation

📖 [Storybook documentation](https://lucca-front.lucca.io/v{version}/storybook/?path=/docs/documentation-overlays-tooltip-html-css--docs)

## Angular

Directive selector : `luTooltip`

Un tooltip ne devrait pas contenir de HTML. Si une mise en forme est nécessaire, le popover est à privilégier.

### Tooltip

```js
import { OverlayModule } from '@angular/cdk/overlay';
import { provideAnimations } from '@angular/platform-browser/animations';
import { IconComponent } from '@lucca-front/ng/icon';
import { LuTooltipPanelComponent, LuTooltipTriggerDirective } from '@lucca-front/ng/tooltip';
import { ButtonComponent } from '@lucca/prisme/button';
```

```html
<h3>Tooltip simple</h3>
<button id="random-story-id" type="button" luButton luTooltip="👋 Hello" luTooltipPosition="above">
	Tooltip au survol ou au focus
</button>
<h3>Tooltip sur un texte</h3>
<span class="pr-u-focusVisible pr-u-borderRadiusSmall" luTooltip="👋 Hello" luTooltipPosition="above">
	Tooltip au survol ou au focus
</span>
<h3>Tooltip et ellipse</h3>
<div
	data-testid="ellipsis-truncated"
	class="pr-u-ellipsis pr-u-focusVisible pr-u-borderRadiusSmall"
	style="inline-size: 10rem"
	tabindex="0"
	luTooltip="Ce texte est trop long pour être affiché entièrement. Le tooltip apparait au survol ou au focus."
	luTooltipPosition="above"
	[luTooltipWhenEllipsis]="true"
>
	Ce texte est trop long pour être affiché entièrement. Le tooltip apparait au survol ou au focus.
</div>
<div
	data-testid="ellipsis-not-truncated"
	class="pr-u-ellipsis pr-u-focusVisible pr-u-borderRadiusSmall"
	luTooltip="Ce texte est affiché entièrement. Le tooltip n'apparait ni au survol ni au focus."
	luTooltipPosition="above"
	[luTooltipWhenEllipsis]="true"
>
	Ce texte est affiché entièrement. Le tooltip n'apparait ni au survol, ni au focus.
</div>
<h3>Tooltip et icône (avec alternative)</h3>
<lu-icon
	data-testid="icon-tooltip"
	icon="star"
	alt="Favoris"
	luTooltip="Favoris"
	luTooltipPosition="above"
	luTooltipOnlyForDisplay="true"
	class="pr-u-focusVisible pr-u-borderRadiusSmall"
/>

<h3>Tooltip affiché avec un host séparé</h3>
<span
	class="pr-u-marginInlineEnd800 pr-u-focusVisible pr-u-borderRadiusSmall"
	luTooltip="… mais apparait là !"
	[luTooltipAnchor]="target"
>
	Tooltip déclenché ici…
</span>
<span aria-hidden="true" #target class="lucca-icon icon-target"></span>
```

## HTML/CSS

### Html

```css
@forward '@lucca-front/scss/src/components/tooltip';
```

```html
<div class="tooltip">{{ content }}</div>
```
