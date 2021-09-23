import { Component } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LuApiSelectModule } from '@lucca-front/ng/api';
import { LuQualificationSelectModule } from '@lucca-front/ng/qualification';
import { Meta, moduleMetadata, Story } from '@storybook/angular';

@Component({
	selector: 'qualification-picker-stories',
	template: `
<section class="section">
	<lu-qualification-select placeholder="Select a qualification"></lu-qualification-select>
	<lu-qualification-select placeholder="Select a qualification" [multiple]="true"></lu-qualification-select>
</section>
`,
})
class QualificationSelectStory { }

export default {
	title: 'NG/QualificationPicker',
	component: QualificationSelectStory,
	argTypes: {
	},
	decorators: [
		moduleMetadata({
			entryComponents: [QualificationSelectStory],
			imports: [
				LuQualificationSelectModule,
				LuApiSelectModule,
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