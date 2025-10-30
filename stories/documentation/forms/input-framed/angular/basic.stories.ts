import { FormsModule } from '@angular/forms';
import { FormFieldComponent, InputFramedComponent } from '@lucca-front/ng/form-field';
import { CheckboxInputComponent, RadioComponent, RadioGroupInputComponent } from '@lucca-front/ng/forms';
import { GridColumnComponent, GridComponent } from '@lucca-front/ng/grid';
import { IconComponent } from '@lucca-front/ng/icon';
import { Meta, moduleMetadata } from '@storybook/angular';

interface InputFramedBasicStory {
	grid: boolean;
	illustration: boolean;
	info: boolean;
	panel: boolean;
	tag: boolean;
	checkbox: boolean;
	center: boolean;
	inlineMessage: string;
	size: string;
}

export default {
	title: 'Documentation/Forms/Input Framed/Angular/Basic',
	decorators: [
		moduleMetadata({
			imports: [
				FormFieldComponent,
				RadioGroupInputComponent,
				RadioComponent,
				FormsModule,
				IconComponent,
				FormFieldComponent,
				RadioGroupInputComponent,
				CheckboxInputComponent,
				FormsModule,
				InputFramedComponent,
				GridComponent,
				GridColumnComponent,
			],
		}),
	],
	argTypes: {
		grid: {
			if: { arg: 'panel', truthy: false },
		},
		size: {
			options: ['', 'L'],
			control: {
				type: 'select',
			},
		},
	},
	render: (args: InputFramedBasicStory) => {
		//const column = args.grid ? ` class="grid-column" [attr.style]="'--grid-colspanAtMediaMinXS: 1'"` : ``;
		const panelTemplate = args.panel ? ` framedPortal="Lorem ipsum dolor"` : ``;
		const tagTemplate = args.tag ? ` tag="Tag"` : ``;
		const infoTemplate = args.info
			? `
				<ng-container info>Lorem ipsum dolor</ng-container>`
			: ``;
		const center = args.center ? ` center` : ``;
		const framedCenter = args.center ? ` framedCenter` : ``;
		const framedSize = args.size === 'L' ? ` framedSize="L"` : ``;
		const size = args.size === 'L' ? ` size="L"` : ``;
		const inlineMessage = args.inlineMessage ? ` inlineMessage="${args.inlineMessage}"` : ``;

		const illustrationTemplate = args.illustration
			? `
				<ng-container illustration>
					<div style="background-color: var(--palettes-product-100); color: var(--palettes-product-700)" class="pr-u-padding100 pr-u-borderRadiusXL pr-u-displayFlex">
						<lu-icon icon="moneyBag" />
					</div>
				</ng-container>`
			: ``;
		const illustrationTemplateDisabled = args.illustration
			? `
				<ng-container illustration>
					<div style="background-color: var(--palettes-neutral-50); color: var(--pr-t-color-input-text-disabled)" class="pr-u-padding100 pr-u-borderRadiusXL pr-u-displayFlex">
						<lu-icon icon="moneyBag" />
					</div>
				</ng-container>`
			: ``;
		const templateCheckbox = `
			<lu-framed-input${panelTemplate}${center}${size}>
				<lu-form-field label="Option A"${inlineMessage}${tagTemplate}>
					<lu-checkbox-input [(ngModel)]="exampleA" required />
				</lu-form-field>${infoTemplate}${illustrationTemplate}
			</lu-framed-input>
			<lu-framed-input${panelTemplate}${center}${size}>
				<lu-form-field label="Option B"${inlineMessage}${tagTemplate}>
					<lu-checkbox-input [(ngModel)]="exampleB" required />
				</lu-form-field>${infoTemplate}${illustrationTemplate}
			</lu-framed-input>
			<lu-framed-input${panelTemplate}${center}${size}>
				<lu-form-field label="Option C"${inlineMessage}${tagTemplate}>
					<lu-checkbox-input disabled [(ngModel)]="exampleC" required />
				</lu-form-field>${infoTemplate}${illustrationTemplateDisabled}
			</lu-framed-input>
			<lu-framed-input${panelTemplate}${center}${size}>
				<lu-form-field label="Option D"${inlineMessage}${tagTemplate}>
					<lu-checkbox-input [(ngModel)]="exampleD" required />
				</lu-form-field>${infoTemplate}${illustrationTemplate}
			</lu-framed-input>
		`;
		const templateGridCheckbox = `
			<lu-grid-column colspan="2" [responsive]="{ colspanAtMediaMinXS: 1 }">
				<lu-framed-input${panelTemplate}${center}${size}>
					<lu-form-field label="Option A"${inlineMessage}${tagTemplate}>
						<lu-checkbox-input [(ngModel)]="exampleA" required />
					</lu-form-field>${infoTemplate}${illustrationTemplate}
				</lu-framed-input>
			</lu-grid-column>
			<lu-grid-column colspan="2" [responsive]="{ colspanAtMediaMinXS: 1 }">
				<lu-framed-input${panelTemplate}${center}${size}>
					<lu-form-field label="Option B"${inlineMessage}${tagTemplate}>
						<lu-checkbox-input [(ngModel)]="exampleB" required />
					</lu-form-field>${infoTemplate}${illustrationTemplate}
				</lu-framed-input>
			</lu-grid-column>
			<lu-grid-column colspan="2" [responsive]="{ colspanAtMediaMinXS: 1 }">
				<lu-framed-input${panelTemplate}${center}${size}>
					<lu-form-field label="Option C"${inlineMessage}${tagTemplate}>
						<lu-checkbox-input disabled [(ngModel)]="exampleC" required />
					</lu-form-field>${infoTemplate}${illustrationTemplateDisabled}
				</lu-framed-input>
			</lu-grid-column>
			<lu-grid-column colspan="2" [responsive]="{ colspanAtMediaMinXS: 1 }">
				<lu-framed-input${panelTemplate}${center}${size}>
					<lu-form-field label="Option D"${inlineMessage}${tagTemplate}>
						<lu-checkbox-input [(ngModel)]="exampleD" required />
					</lu-form-field>${infoTemplate}${illustrationTemplate}
				</lu-framed-input>
			</lu-grid-column>
		`;
		const template = `
			<lu-radio value="A"${panelTemplate}${tagTemplate}${inlineMessage}>
				Option A${infoTemplate}${illustrationTemplate}
			</lu-radio>
			<lu-radio value="B"${panelTemplate}${tagTemplate}${inlineMessage}>
				Option B${infoTemplate}${illustrationTemplate}
			</lu-radio>
			<lu-radio value="C"${panelTemplate}${tagTemplate}${inlineMessage} disabled>
				Option C${infoTemplate}${illustrationTemplateDisabled}
			</lu-radio>
			<lu-radio value="D"${panelTemplate}${tagTemplate}${inlineMessage}>
				Option D${infoTemplate}${illustrationTemplate}
			</lu-radio>
		`;
		const templateGrid = `
			<lu-grid-column colspan="2" [responsive]="{ colspanAtMediaMinXS: 1 }">
				<lu-radio value="A"${panelTemplate}${tagTemplate}${inlineMessage}>
					Option A${infoTemplate}${illustrationTemplate}
				</lu-radio>
			</lu-grid-column>
			<lu-grid-column colspan="2" [responsive]="{ colspanAtMediaMinXS: 1 }">
				<lu-radio value="B"${panelTemplate}${tagTemplate}${inlineMessage}>
					Option B${infoTemplate}${illustrationTemplate}
				</lu-radio>
			</lu-grid-column>
			<lu-grid-column colspan="2" [responsive]="{ colspanAtMediaMinXS: 1 }">
				<lu-radio value="C"${panelTemplate}${tagTemplate}${inlineMessage} disabled>
					Option C${infoTemplate}${illustrationTemplateDisabled}
				</lu-radio>
			</lu-grid-column>
			<lu-grid-column colspan="2" [responsive]="{ colspanAtMediaMinXS: 1 }">
				<lu-radio value="D"${panelTemplate}${tagTemplate}${inlineMessage}>
					Option D${infoTemplate}${illustrationTemplate}
				</lu-radio>
			</lu-grid-column>
		`;
		if (args.checkbox) {
			if (args.grid) {
				return {
					props: { exampleB: true },
					template: `
	<lu-form-field label="Label" layout="fieldset">
		<div class="inputFramedWrapper">
			<lu-grid columns="2">${templateGridCheckbox}</lu-grid>
		</div>
	</lu-form-field>`,
				};
			} else {
				return {
					props: { exampleB: true },
					template: `
	<lu-form-field label="Label" layout="fieldset">
		<div class="inputFramedWrapper">${templateCheckbox}</div>
	</lu-form-field>`,
				};
			}
		} else {
			if (args.grid) {
				return {
					props: { example: 'B' },
					template: `
	<lu-form-field label="Label" errorInlineMessage="Error inline message">
		<lu-radio-group-input [(ngModel)]="example" framed required${framedCenter}${framedSize}>
			<lu-grid columns="2">${templateGrid}</lu-grid>
		</lu-radio-group-input>
	</lu-form-field>
	`,
				};
			} else {
				return {
					props: { example: 'B' },
					template: `
	<lu-form-field label="Label" errorInlineMessage="Error inline message">
		<lu-radio-group-input [(ngModel)]="example" framed required${framedCenter}${framedSize}>${template}</lu-radio-group-input>
	</lu-form-field>
	`,
				};
			}
		}
	},
} as Meta;

export const Basic = {
	args: {
		panel: false,
		grid: false,
		illustration: false,
		center: false,
		info: false,
		tag: false,
		checkbox: false,
		inlineMessage: '',
		size: '',
	},
};
