# software-icon — Code & Implementation

📖 [Storybook documentation](https://lucca-front.lucca.io/v21.3.1/storybook/?path=/docs/documentation-structure-software-icon-angular-basic--docs)

## Angular

Component selector : `lu-software-icon`

### Basic

```js
import { SOFTWARE_ICON, SOFTWARE_ICON_SIZE, SoftwareIconComponent } from '@lucca-front/ng/software-icon';
```

```html
<lu-software-icon icon="absences" iconAlt="Absences" />
```

### Wrapper

```js
import { SoftwareIconComponent } from '@lucca-front/ng/software-icon';
import { SoftwareIconWrapperComponent, SoftwareIconWrapperItemDirective } from '@lucca-front/ng/software-icon-wrapper';
import { LuTooltipTriggerDirective } from '@lucca-front/ng/tooltip';
```

```html
<lu-software-icon-wrapper max="8">
	<lu-software-icon *luSoftwareIconWrapperItem icon="faces" iconAlt="Faces" />
	<lu-software-icon *luSoftwareIconWrapperItem icon="ask-lucca" iconAlt="Ask Lucca" />
	<lu-software-icon *luSoftwareIconWrapperItem icon="office" iconAlt="Office" />
	<lu-software-icon *luSoftwareIconWrapperItem icon="sandbox" iconAlt="Sandbox" />
	<lu-software-icon *luSoftwareIconWrapperItem icon="absences" iconAlt="Absences" />
	<lu-software-icon *luSoftwareIconWrapperItem icon="business-expenses" iconAlt="Expenses" />
	<lu-software-icon *luSoftwareIconWrapperItem icon="mood" iconAlt="Mood" />
	<lu-software-icon *luSoftwareIconWrapperItem icon="invoices" iconAlt="Invoices" />
	<lu-software-icon *luSoftwareIconWrapperItem icon="engagement" iconAlt="Engagement" />
	<lu-software-icon *luSoftwareIconWrapperItem icon="timesheet" iconAlt="Timesheet" />
	<lu-software-icon *luSoftwareIconWrapperItem icon="compensation" iconAlt="Compensation" />
	<lu-software-icon *luSoftwareIconWrapperItem icon="store" iconAlt="Store" />
</lu-software-icon-wrapper>
```

## HTML/CSS

Classe CSS : `.softwareIcon`

### Basic

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
