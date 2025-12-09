import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '@lucca-front/ng/button';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { FieldsetComponent, TextInputComponent } from '@lucca-front/ng/forms';
import { GridColumnComponent, GridComponent } from '@lucca-front/ng/grid';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { generateInputs } from 'stories/helpers/stories';

export default {
	title: 'Documentation/Forms/Fieldset/Angular/Basic',
	argTypes: {
		horizontal: {
			control: {
				type: 'boolean',
			},
			if: { arg: 'expandable', truthy: false },
		},
		expandable: {
			control: {
				type: 'boolean',
			},
			if: { arg: 'horizontal', truthy: false },
		},
		withAction: {
			if: { arg: 'expandable', eq: false },
		},
		expanded: {
			control: {
				type: 'boolean',
			},
			if: { arg: 'expandable', truthy: true },
		},
		size: {
			options: ['', 'S'],
			control: {
				type: 'select',
			},
		},
	},
	decorators: [
		moduleMetadata({
			imports: [FieldsetComponent, GridComponent, GridColumnComponent, FormFieldComponent, TextInputComponent, FormsModule, ButtonComponent],
		}),
	],
	render: ({ expanded, size, helper, action, withAction, ...args }, { argTypes }) => {
		const expandedParam = expanded ? ` [expanded]="true"` : ``;
		const helperParam = helper ? ` helper="${helper}"` : ``;
		const sizeParam = size ? ` size="S"` : ``;
		const actionParam = withAction ? ` [action]="portalSample"` : ``;
		const portalSample = withAction
			? `
<ng-template #portalSample>
	<button luButton>button</button>
</ng-template>
`
			: ``;
		return {
			template: `@let column = { colspanAtMediaMinXXS: 2 };
${portalSample}
<lu-fieldset${helperParam}${expandedParam}${sizeParam}${actionParam}${generateInputs(args, argTypes)}>
	<lu-grid mode="form">
		<lu-grid-column colspan="4" [responsive]="column">
			<lu-form-field label="Label">
				<lu-text-input type="text" [(ngModel)]="example1" />
			</lu-form-field>
		</lu-grid-column>
		<lu-grid-column colspan="4" [responsive]="column">
			<lu-form-field label="Label">
				<lu-text-input type="text" [(ngModel)]="example2" />
			</lu-form-field>
		</lu-grid-column>
	</lu-grid>
</lu-fieldset>`,
		};
	},
} as Meta;

export const Basic: StoryObj<FieldsetComponent & { content: string; withAction: boolean }> = {
	args: {
		heading: 'Title',
		helper: '',
		size: null,
		expandable: false,
		expanded: false,
		horizontal: false,
		withAction: false,
	},
};
