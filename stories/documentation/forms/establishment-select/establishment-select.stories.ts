import { HttpClientModule } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { LuEstablishmentSelectInputComponent } from '@lucca-front/ng/establishment';
import { Meta, StoryFn, applicationConfig, componentWrapperDecorator, moduleMetadata } from '@storybook/angular';
@Component({
	selector: 'establishment-select-stories',
	standalone: true,
	imports: [LuEstablishmentSelectInputComponent],
	template: `
		<label class="textfield mod-inline u-marginRightS">
			<lu-establishment-select class="textfield-input" placeholder="Select an establishment" data-testid="lu-select"></lu-establishment-select>
			<span class="textfield-label">Establishment Select</span>
		</label>
		<label class="textfield mod-inline">
			<lu-establishment-select class="textfield-input" placeholder="Select an establishment" [multiple]="multiple" data-testid="lu-select-multiple"></lu-establishment-select>
			<span class="textfield-label">Establishment Multiple Select</span>
		</label>
	`,
})
class EstablishmentSelectStory {
	@Input() multiple: boolean = true;
}

export default {
	title: 'Documentation/Forms/EstablishmentSelect',
	component: LuEstablishmentSelectInputComponent,
	decorators: [
		componentWrapperDecorator(EstablishmentSelectStory),
		moduleMetadata({
			imports: [EstablishmentSelectStory, HttpClientModule],
		}),
		applicationConfig({ providers: [provideAnimations()] }),
	],
} as Meta;

const template: StoryFn<EstablishmentSelectStory> = (args: EstablishmentSelectStory) => ({
	props: args,
});

export const Basic = template.bind({});
Basic.args = {};

const code = `
	import { LuEstablishmentSelectInputComponent } from '@lucca-front/ng/establishment';

@Component({
	selector: 'establishment-select-stories',
	standalone: true,
	imports: [LuEstablishmentSelectInputComponent],
	template: \`
	<label class="textfield">
		<lu-establishment-select class="textfield-input" placeholder="Select an establishment" [multiple]="multiple"></lu-establishment-select>
		<span class="textfield-label">Establishment Multiple Select</span>
	</label>
	\`,
})
class EstablishmentSelectStory {
	@Input() multiple: boolean;
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
