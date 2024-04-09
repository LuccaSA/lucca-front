import { provideHttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { LuQualificationSelectInputComponent } from '@lucca-front/ng/qualification';
import { Meta, StoryFn, applicationConfig } from '@storybook/angular';

@Component({
	selector: 'qualification-stories',
	standalone: true,
	imports: [LuQualificationSelectInputComponent],
	template: `
		<label class="textfield mod-inline pr-u-marginRight200">
			<lu-qualification-select placeholder="Select a qualification" class="textfield-input"></lu-qualification-select>
			<span class="textfield-label">Simple</span>
		</label>
		<label class="textfield mod-inline">
			<lu-qualification-select placeholder="Select a qualification" [multiple]="true" class="textfield-input"></lu-qualification-select>
			<span class="textfield-label">Multiple</span>
		</label>
	`,
})
class QualificationSelectStory {}

export default {
	title: 'Documentation/Forms/Qualification',
	component: QualificationSelectStory,
	decorators: [applicationConfig({ providers: [provideAnimations(), provideHttpClient()] })],
} as Meta;

const template: StoryFn<QualificationSelectStory> = (args) => ({
	props: args,
});

export const Select = template.bind({});

const code = `
import { LuQualificationSelectInputComponent } from '@lucca-front/ng/qualification';

@Component({
	selector: 'qualification-select-story',
	standalone: true,
	imports: [LuQualificationSelectInputComponent],
	template: \`
		<label class="textfield">
			<lu-qualification-select placeholder="Select a qualification" class="textfield-input" ></lu-qualification-select>
			<span class="textfield-label">Simple</span>
		</label>
		<label class="textfield">
			<lu-qualification-select placeholder="Select a qualification" [multiple]="true" class="textfield-input" ></lu-qualification-select>
			<span class="textfield-label">Multiple</span>
		</label>
	\`
})
class QualificationSelectStory { }`;

Select.parameters = {
	// Disable controls as they are not modifiable because of ComponentWrapper
	controls: { include: [] },
	docs: {
		source: {
			language: 'ts',
			type: 'code',
			code,
		},
	},
};
