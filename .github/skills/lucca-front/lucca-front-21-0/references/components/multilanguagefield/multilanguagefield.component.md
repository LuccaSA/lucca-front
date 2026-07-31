# multilanguagefield — Code & Implementation

📖 [Storybook documentation](https://lucca-front.lucca.io/v21.0.5/storybook/?path=/docs/documentation-forms-fields-multilanguagefield-angular--docs)

## Angular

### Paramétrage des langues

Pour qu'une locale apparaisse dans le panneau du composant, elles doivent être initialisées à vide dans le `ngModel`. Exemple :

### Multilanguagefield

```js
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { MultilanguageInputComponent, MultilanguageTranslation } from '@lucca-front/ng/forms';
import { LOCALE_ID } from '@angular/core';
```
