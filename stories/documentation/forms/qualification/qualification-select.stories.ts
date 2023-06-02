import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LuQualificationSelectInputComponent } from '@lucca-front/ng/qualification';
import { componentWrapperDecorator, Meta, moduleMetadata, StoryFn } from '@storybook/angular';

@Component({
	selector: 'qualification-stories',
	standalone: true,
	imports: [LuQualificationSelectInputComponent],
	template: `
		<label class="textfield mod-inline u-marginRightS">
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
	component: LuQualificationSelectInputComponent,
	decorators: [
		componentWrapperDecorator(QualificationSelectStory),
		moduleMetadata({
			imports: [QualificationSelectStory, HttpClientModule, BrowserAnimationsModule],
		}),
	],
} as Meta;

const template: StoryFn<QualificationSelectStory> = (args: QualificationSelectStory) => ({
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
