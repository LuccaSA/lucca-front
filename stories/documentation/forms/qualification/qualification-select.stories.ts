import { Component } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LuQualificationSelectInputComponent, LuQualificationSelectModule } from '@lucca-front/ng/qualification';
import { componentWrapperDecorator, Meta, moduleMetadata, Story } from '@storybook/angular';

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
	component: LuQualificationSelectInputComponent,
	decorators: [
		componentWrapperDecorator(QualificationSelectStory),
		moduleMetadata({
			declarations: [QualificationSelectStory],
			imports: [
				LuQualificationSelectModule,
				BrowserAnimationsModule,
			]
		})
	]
} as Meta;

const template: Story<QualificationSelectStory> = props => ({
	props,
});

export const Basic = template.bind({});
Basic.parameters = {
	// Disable controls as they are not modifiable because of ComponentWrapper
	controls: { include: [] },
	docs: {
		source: {
			language: 'ts',
			code: `
/* 1. Importer LuQualificationSelectModule */
import { LuQualificationSelectModule } from '@lucca-front/ng/api';

@NgModule({
	imports: [LuQualificationSelectModule]
})
class QualificationSelectStoriesModule {}

/* 2. Use it */
@Component({
	selector: 'qualification-select-story',
	template: \`
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
	\`
})
class QualificationSelectStory { }`
		}
	}
}
