import { CheckboxfieldComponent, SwitchfieldComponent } from '@lucca-front/ng/forms';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { cleanupTemplate } from 'stories/helpers/stories';

export default {
	title: 'Documentation/Forms/Fields/SwitchField/Angular',
	component: SwitchfieldComponent,
	decorators: [
		moduleMetadata({
			imports: [SwitchfieldComponent, FormsModule, ReactiveFormsModule],
		}),
	],
} as Meta;

export const Basic: StoryObj<SwitchfieldComponent> = {
	render: ({ label, required, hiddenLabel, inlineMessage, size, inlineMessageState, tooltip }) => {
		return {
			props: {
				example: false,
			},
			template: cleanupTemplate(`<lu-switchfield label="${label}"
	required="${required}"
	${hiddenLabel ? 'hiddenLabel' : ''}
	tooltip="${tooltip}"
	inlineMessage="${inlineMessage}"
	inlineMessageState="${inlineMessageState}"
	size="${size}"
	[(ngModel)]="example">
</lu-switchfield>

{{example}}`),
			moduleMetadata: {
				imports: [CheckboxfieldComponent, FormsModule, BrowserAnimationsModule],
			},
		};
	},
	args: {
		label: 'Label',
		hiddenLabel: false,
		required: true,
		inlineMessage: 'Helper Text',
		inlineMessageState: 'default',
		size: 'M',
		tooltip: "Je suis un message d'aide",
	},
};
