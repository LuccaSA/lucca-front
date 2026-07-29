# multi-select — Code & Implementation

📖 [Storybook documentation](https://lucca-front.lucca.io/v21.3.1/storybook/?path=/docs/documentation-forms-fields-multi-select-angular--docs)

## Angular

Component selector : `lu-multi-select`

### Appeler une API

Pour un format de retour V3 ou V4 sans customisation de l'affichage (l'entité doit avoir une propriété `name`), il suffit de donner l'API à appeler :

### Personnaliser l'affichage

Dans le cas d'une personnalisation de l'option et/ou de la valeur affichée, il est nécessaire de créer votre propre directive en s'aidant de `LuCoreSelectApiV4Directive` ou de `LuCoreSelectApiV3Directive` :

### API non conventionnelle (sans id)

Dans le cas d'un appel API ne rentrant pas dans le moule habituel, il est nécessaire de créer votre propre directive en s'aidant de `ALuCoreSelectApiDirective` :

### Select

```js
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { LuMultiSelectInputComponent } from '@lucca-front/ng/multi-select';
```

```html
<lu-form-field label="Label" tooltip="Tooltip message" inlineMessage="Helper text" inlineMessageState="default">
	<lu-multi-select
		[(ngModel)]="example"
		[options]="legumes | filterLegumes: clue"
		(clueChange)="clue = $event"
		placeholder="Placeholder"
		clearable
	/>
</lu-form-field>
<pr-story-model-display>{{ example | json }}</pr-story-model-display>
```
