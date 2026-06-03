# progress-stepper — Basic _(Angular)_

```js
import { provideRouter, RouterLink } from '@angular/router';
import { ProgressStepperComponent, ProgressStepperStepComponent } from '@lucca-front/ng/progress-stepper';
```

```html
<lu-progress-stepper current="3">
	<lu-progress-stepper-step [routerLinkParam]="'./route/step-1'" label="Lorem ipsum dolor" />
	<lu-progress-stepper-step [routerLinkParam]="'./route/step-2'" label="Lorem ipsum dolor" />
	<lu-progress-stepper-step label="Lorem ipsum dolor" />
	<lu-progress-stepper-step label="Lorem ipsum dolor" />
	<lu-progress-stepper-step label="Lorem ipsum dolor" />
	<lu-progress-stepper-step label="Lorem ipsum dolor" />
</lu-progress-stepper>
```
