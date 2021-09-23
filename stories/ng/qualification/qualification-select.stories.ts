import { Component, Input } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LuQualificationSelectModule } from '@lucca-front/ng/qualification';
import { Story, Meta, moduleMetadata } from '@storybook/angular';

@Component({
	selector: 'qualification-select-stories',
	template: `
<section class="section">
	<lu-qualification-select placeholder="Select an qualification"></lu-qualification-select>
	<lu-qualification-select placeholder="Select an qualification" [multiple]="true"></lu-qualification-select>
</section>
`,
})
class QualificationSelectStory { }

export default {
	title: 'NG/QualificationSelect',
	component: QualificationSelectStory,
	argTypes: {
	},
	decorators: [
		moduleMetadata({
			entryComponents: [QualificationSelectStory],
			imports: [
				LuQualificationSelectModule,
				BrowserAnimationsModule,
			]
		})
	]
} as Meta;

const template: Story<QualificationSelectStory> = (args: QualificationSelectStory) => ({
	props: args,
});

export const basic = template.bind({});
basic.args = {
}