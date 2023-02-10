import { HttpClientModule } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LuEstablishmentSelectInputComponent, LuEstablishmentSelectModule } from '@lucca-front/ng/establishment';
import { componentWrapperDecorator, Meta, moduleMetadata, Story } from '@storybook/angular';
@Component({
	selector: 'establishment-select-stories',
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
			imports: [HttpClientModule, LuEstablishmentSelectModule, BrowserAnimationsModule],
			declarations: [EstablishmentSelectStory],
		}),
	],
} as Meta;

const template: Story<EstablishmentSelectStory> = (args: EstablishmentSelectStory) => ({
	props: args,
});

export const Basic = template.bind({});
Basic.args = {};

const code = `
/* 1. Importer LuEstablishmentSelectModule */
import { LuEstablishmentSelectModule } from '@lucca-front/ng/establishment';

@NgModule({
	imports: [LuEstablishmentSelectModule]
})
class StoriesModule {}

/* 2. Utiliser lu-establishment-select */
@Component({
	selector: 'establishment-select-stories',
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
