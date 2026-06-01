# progress-stepper — Basic _(Angular)_

```js
import { provideRouter, RouterLink } from '@angular/router';
import { ProgressStepperComponent, ProgressStepperStepComponent } from '@lucca-front/ng/progress-stepper';
```

```html
<lu-progress-stepper current="${…}">
	<lu-progress-stepper-step [routerLinkParam]="'./route/step-1'" label="Step" ${…} />
	<lu-progress-stepper-step [routerLinkParam]="'./route/step-2'" label="Step" ${…} />
	${…}
</lu-progress-stepper>
```
