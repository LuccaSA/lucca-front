# multilanguagefield — Code & Implementation

📖 [Storybook documentation](https://lucca-front.lucca.io/v21.1.4/storybook/?path=/docs/documentation-forms-fields-multilanguagefield-angular--docs)

## Angular

Component selector : `lu-multilanguage-input`

### Paramétrage des langues

Pour qu'une locale apparaisse dans le panneau du composant, elles doivent être initialisées à vide dans le `ngModel`. Exemple :

### Field

```js
import { LOCALE_ID } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { MultilanguageInputComponent, MultiLanguageInputValidators, MultilanguageTranslation } from '@lucca-front/ng/forms';
```
