# highlight-section — Code & Implementation

📖 [Storybook documentation](https://lucca-front.lucca.io/v22.0.0/storybook/?path=/docs/documentation-structure-highlight-section-angular-basic--docs)

## Angular

### Basic

```js
import { generateInputs, setStoryOptions } from '@/helpers/stories';
import { HIGHLIGHT_SECTION_BUBBLE, HIGHLIGHT_SECTION_ILLUSTRATION, HIGHLIGHT_SECTION_PALETTE, HIGHLIGHT_SECTION_THEME, HighlightSectionComponent } from '@lucca-front/ng/highlight-section';
```

```html
<lu-highlight-section theme="light">Content</lu-highlight-section>
```


## HTML/CSS

### Basic

```css
@forward '@lucca-front/scss/src/components/highlight-section';
```

```html
<div class="highlightSection mod-light">
	<div
		class="highlightSection-bubbleStart"
		[innerHtml]="'https://cdn.lucca.fr/transverse/prisme/visuals/highlight-section/bubbles-1.svg' | luSafeExternalSvg"
	></div>
	<div
		class="highlightSection-bubbleEnd"
		[innerHtml]="'https://cdn.lucca.fr/transverse/prisme/visuals/highlight-section/bubbles-1.svg' | luSafeExternalSvg"
	></div>
	<div class="highlightSection-content">
		<div class="highlightSection-content-slot">
			<p class="pr-u-fontWeightSemiBold">Créez des politiques de frais pour ces unités légales</p>
			<p class="pr-u-bodyS">Allemagne : Lucca Deutschland — Suisse : Lucca Switzerland — Royaume-Uni : Lucca UK.</p>
		</div>
	</div>
</div>
```

### Illustration

```css
@forward '@lucca-front/scss/src/components/highlight-section';
@forward '@lucca-front/scss/src/components/link';
```

```html
<div class="highlightSection mod-light">
	<div
		class="highlightSection-bubbleStart"
		[innerHtml]="'https://cdn.lucca.fr/transverse/prisme/visuals/highlight-section/bubbles-1.svg' | luSafeExternalSvg"
	></div>
	<div class="highlightSection-content">
		<div class="highlightSection-content-slot">
			<p class="pr-u-fontWeightSemiBold">Baromètre express</p>
			<p class="pr-u-bodyS">
				8 questions – Identifiez rapidement les grandes tendances et les priorités d’action de votre organisation avec
				ce modèle.
			</p>
			<p><a class="link" href="#">Utiliser le modèle</a></p>
		</div>
		<img
			alt=""
			class="highlightSection-content-illustration"
			src="https://cdn.lucca.fr/transverse/prisme/visuals/highlight-section/pola.svg"
		/>
	</div>
</div>
```

### Ornaments

```css
@forward '@lucca-front/scss/src/components/highlight-section';
```

```html
<div class="highlightSection mod-light">
	<div
		class="highlightSection-bubbleStart"
		[innerHtml]="'https://cdn.lucca.fr/transverse/prisme/visuals/highlight-section/bubbles-1.svg' | luSafeExternalSvg"
	></div>
	<div
		class="highlightSection-bubbleEnd"
		[innerHtml]="'https://cdn.lucca.fr/transverse/prisme/visuals/highlight-section/bubbles-1.svg' | luSafeExternalSvg"
	></div>
	<div class="highlightSection-content">
		<div class="highlightSection-content-slot">
			<p class="pr-u-fontWeightSemiBold">Both</p>
		</div>
	</div>
</div>

<div class="highlightSection mod-light">
	<div
		class="highlightSection-bubbleStart"
		[innerHtml]="'https://cdn.lucca.fr/transverse/prisme/visuals/highlight-section/bubbles-1.svg' | luSafeExternalSvg"
	></div>
	<div class="highlightSection-content">
		<div class="highlightSection-content-slot">
			<p class="pr-u-fontWeightSemiBold">Start</p>
		</div>
	</div>
</div>

<div class="highlightSection mod-light">
	<div
		class="highlightSection-bubbleEnd"
		[innerHtml]="'https://cdn.lucca.fr/transverse/prisme/visuals/highlight-section/bubbles-1.svg' | luSafeExternalSvg"
	></div>
	<div class="highlightSection-content">
		<div class="highlightSection-content-slot">
			<p class="pr-u-fontWeightSemiBold">End</p>
		</div>
	</div>
</div>

<div class="highlightSection mod-light">
	<div class="highlightSection-content">
		<div class="highlightSection-content-slot">
			<p class="pr-u-fontWeightSemiBold">None</p>
		</div>
	</div>
</div>
```

### Themes

```css
@forward '@lucca-front/scss/src/components/highlight-section';
```

```html
<div class="highlightSection">
	<div
		class="highlightSection-bubbleStart"
		[innerHtml]="'https://cdn.lucca.fr/transverse/prisme/visuals/highlight-section/bubbles-1.svg' | luSafeExternalSvg"
	></div>
	<div
		class="highlightSection-bubbleEnd"
		[innerHtml]="'https://cdn.lucca.fr/transverse/prisme/visuals/highlight-section/bubbles-1.svg' | luSafeExternalSvg"
	></div>
	<div class="highlightSection-content">
		<div class="highlightSection-content-slot">
			<p class="pr-u-fontWeightSemiBold">White</p>
		</div>
	</div>
</div>

<div class="highlightSection mod-light">
	<div
		class="highlightSection-bubbleStart"
		[innerHtml]="'https://cdn.lucca.fr/transverse/prisme/visuals/highlight-section/bubbles-1.svg' | luSafeExternalSvg"
	></div>
	<div
		class="highlightSection-bubbleEnd"
		[innerHtml]="'https://cdn.lucca.fr/transverse/prisme/visuals/highlight-section/bubbles-1.svg' | luSafeExternalSvg"
	></div>
	<div class="highlightSection-content">
		<div class="highlightSection-content-slot">
			<p class="pr-u-fontWeightSemiBold">Light</p>
		</div>
	</div>
</div>

<div class="highlightSection mod-dark">
	<div
		class="highlightSection-bubbleStart"
		[innerHtml]="'https://cdn.lucca.fr/transverse/prisme/visuals/highlight-section/bubbles-1.svg' | luSafeExternalSvg"
	></div>
	<div
		class="highlightSection-bubbleEnd"
		[innerHtml]="'https://cdn.lucca.fr/transverse/prisme/visuals/highlight-section/bubbles-1.svg' | luSafeExternalSvg"
	></div>
	<div class="highlightSection-content">
		<div class="highlightSection-content-slot">
			<p class="pr-u-fontWeightSemiBold">Dark</p>
		</div>
	</div>
</div>
```
