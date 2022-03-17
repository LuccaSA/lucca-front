import { Component } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LuApiSelectModule } from '@lucca-front/ng/api';
import { LuQualificationSelectModule } from '@lucca-front/ng/qualification';
import { Meta, moduleMetadata, Story } from '@storybook/angular';

@Component({
	selector: 'qualification-picker-stories',
	template: `
<section class="section">
	<label class="textfield">
		<lu-qualification-select placeholder="Select a qualification" class="textfield-input" ></lu-qualification-select>
		<span class="textfield-label">Qualification</span>
	</label>
	<br/>
	<label class="textfield">
		<lu-qualification-select placeholder="Select a qualification" [multiple]="true" class="textfield-input" ></lu-qualification-select>
		<span class="textfield-label">Qualifications</span>
	</label>
</section>
`,
})
class QualificationSelectStory { }

export default {
	title: 'Documentation/Forms/QualificationPicker',
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
