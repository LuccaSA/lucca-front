import { Component, Input } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LuEstablishmentSelectModule } from '@lucca-front/ng/establishment';
import { Story, Meta, moduleMetadata } from '@storybook/angular';

@Component({
	selector: 'establishment-select-stories',
	template: `
<section class="section">
	<lu-establishment-select placeholder="Select an establishment"></lu-establishment-select>
	<lu-establishment-select placeholder="Select an establishment" [multiple]="true"></lu-establishment-select>
</section>
`,
}) class EstablishmentSelectStory {
}

export default {
  title: 'Documentation/Forms/EstablishmentSelect',
  component: EstablishmentSelectStory,
	argTypes: {
	},
	decorators: [
		moduleMetadata({
			entryComponents: [EstablishmentSelectStory],
			imports: [
				LuEstablishmentSelectModule,
				BrowserAnimationsModule,
			]
		})
	]
} as Meta;

const template: Story<EstablishmentSelectStory> = (args: EstablishmentSelectStory) => ({
  props: args,
});

export const basic = template.bind({});
basic.args = {
}
