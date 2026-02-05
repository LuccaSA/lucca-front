import { provideHttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { LuEstablishmentSelectInputComponent } from '@lucca-front/ng/establishment';
import { applicationConfig, Meta, StoryObj } from '@storybook/angular';
@Component({
	selector: 'establishment-select-stories',
	imports: [LuEstablishmentSelectInputComponent],
	template: `
		<label class="textfield mod-inline pr-u-marginInlineEnd200">
			<lu-establishment-select class="textfield-input" placeholder="Select an establishment" data-testid="lu-select" />
			<span class="textfield-label">Establishment Select</span>
		</label>
		<label class="textfield mod-inline">
			<lu-establishment-select class="textfield-input" placeholder="Select an establishment" [multiple]="multiple()" data-testid="lu-select-multiple" />
			<span class="textfield-label">Establishment Multiple Select</span>
		</label>
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class EstablishmentSelectStory {
	multiple = input<boolean>(true);
}

export default {
	title: 'Documentation/Forms/EstablishmentSelect',
	component: EstablishmentSelectStory,
	decorators: [applicationConfig({ providers: [provideAnimations(), provideHttpClient()] })],
} as Meta;

export const Basic: StoryObj<EstablishmentSelectStory> = {
	args: {},
};

const code = `
import { LuEstablishmentSelectInputComponent } from '@lucca-front/ng/establishment';

@Component({
	selector: 'establishment-select-stories',
	imports: [LuEstablishmentSelectInputComponent],
	template: \`
	<label class="textfield">
		<lu-establishment-select class="textfield-input" placeholder="Select an establishment" [multiple]="multiple()" />
		<span class="textfield-label">Establishment Multiple Select</span>
	</label>
	\`,
})
class EstablishmentSelectStory {
		multiple = input<boolean>(true);
}`;

Basic.parameters = {
	controls: { include: ['multiple'] },
	docs: {
		source: {
			language: 'ts',
			type: 'code',
			code,
		},
	},
};
