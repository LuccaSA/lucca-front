import { FormsModule } from '@angular/forms';
import { FormFieldComponent, FramedInputComponent } from '@lucca-front/ng/form-field';
import { CheckboxInputComponent, RadioComponent, RadioGroupInputComponent } from '@lucca-front/ng/forms';
import { IconComponent } from '@lucca-front/ng/icon';
import { Meta, moduleMetadata } from '@storybook/angular';
import { cleanupTemplate } from 'stories/helpers/stories';

interface InputFramedBasicStory {
	grid: boolean;
	illustration: boolean;
	info: boolean;
	panel: boolean;
	tag: boolean;
	checkbox: boolean;
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
				FramedInputComponent,
			],
		}),
	],
	argTypes: {},
	render: (args: InputFramedBasicStory) => {
		const column = args.grid ? ` class="grid-column" [attr.style]="'--grid-colspanAtMediaMinXS: 1'"` : ``;
		const panelTemplate = args.panel ? `framedPortal="Lorem ipsum dolor"` : ``;
		const tagTemplate = args.tag ? ` tag="Tag"` : ``;
		const infoTemplate = args.info
			? `<ng-container info>Lorem ipsum dolor</ng-container>
<ng-container info>Lorem ipsum dolor</ng-container>
<ng-container info>Lorem ipsum dolor</ng-container>
<ng-container info>Lorem ipsum dolor</ng-container>`
			: ``;
		const illustrationTemplate = args.illustration
			? `<ng-container illustration>
					<div style="background-color: var(--palettes-product-100); color: var(--palettes-product-700)" class="pr-u-padding100 u-borderRadiusXL u-displayFlex">
						<lu-icon icon="moneyBag" />
					</div>
				</ng-container>`
			: ``;
		const illustrationTemplateDisabled = args.illustration
			? `<ng-container illustration>
					<div style="background-color: var(--palettes-neutral-50); color: var(--pr-t-color-input-text-disabled)" class="pr-u-padding100 u-borderRadiusXL u-displayFlex">
						<lu-icon icon="moneyBag" />
					</div>
				</ng-container>`
			: ``;
		const templateCheckbox = `<lu-framed-input${column}>
				<lu-form-field label="Option A" inlineMessage="Lorem ipsum dolor"${tagTemplate}>
					<lu-checkbox-input [ngModel]="false" />
				</lu-form-field>
			</lu-framed-input>
			<lu-framed-input${column}>
				<lu-form-field label="Option B" inlineMessage="Lorem ipsum dolor"${tagTemplate}>
					<lu-checkbox-input [ngModel]="false" />
				</lu-form-field>
			</lu-framed-input>
			<lu-framed-input${column}>
				<lu-form-field label="Option C" inlineMessage="Lorem ipsum dolor"${tagTemplate}>
					<lu-checkbox-input disabled [ngModel]="false" />
				</lu-form-field>
			</lu-framed-input>
			<lu-framed-input${column}>
				<lu-form-field label="Option D" inlineMessage="Lorem ipsum dolor"${tagTemplate}>
					<lu-checkbox-input [ngModel]="false" />
				</lu-form-field>
			</lu-framed-input>`;
		const template = `<lu-radio${column} value="A"${panelTemplate}${tagTemplate} inlineMessage="Lorem ipsum dolor">
				Option A
				${infoTemplate}
				${illustrationTemplate}
			</lu-radio>
			<lu-radio ${column}value="B"${panelTemplate}${tagTemplate} inlineMessage="Lorem ipsum dolor">
				Option B
				${infoTemplate}
				${illustrationTemplate}
			</lu-radio>
			<lu-radio ${column}value="C"${panelTemplate}${tagTemplate} disabled inlineMessage="Lorem ipsum dolor">
				Option C
				${infoTemplate}
				${illustrationTemplateDisabled}
			</lu-radio>
			<lu-radio ${column}value="D"${panelTemplate}${tagTemplate} inlineMessage="Lorem ipsum dolor">
				Option D
				${infoTemplate}
				${illustrationTemplate}
			</lu-radio>`;
		if (args.checkbox) {
			if (args.grid) {
				return {
					template: cleanupTemplate(`<div class="inputFramedWrapper">
		<div class="grid" [attr.style]="'--grid-columns: 2; --grid-colspan: 2'">
			${templateCheckbox}
		</div>
	</div>`),
				};
			} else {
				return {
					template: cleanupTemplate(`<div class="inputFramedWrapper">
		${templateCheckbox}
	</div>`),
				};
			}
		} else {
			if (args.grid) {
				return {
					props: { example: 'B' },
					template: cleanupTemplate(`
	<lu-form-field label="Label" errorInlineMessage="Error inline message">
		<lu-radio-group-input [(ngModel)]="example" framed required>
			<div class="grid" [attr.style]="'--grid-columns: 2; --grid-colspan: 2'">
				${template}
			</div>
		</lu-radio-group-input>
	</lu-form-field>
	`),
				};
			} else {
				return {
					props: { example: 'B' },
					template: cleanupTemplate(`
	<lu-form-field label="Label" errorInlineMessage="Error inline message">
		<lu-radio-group-input [(ngModel)]="example" framed required>
			${template}
		</lu-radio-group-input>
	</lu-form-field>
	`),
				};
			}
		}
	},
} as Meta;

export const Basic = {
	args: {
		grid: false,
		illustration: false,
		info: false,
		panel: false,
		tag: false,
		checkbox: false,
	},
};
