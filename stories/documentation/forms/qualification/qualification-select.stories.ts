import { Component } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LuQualificationSelectInputComponent, LuQualificationSelectModule } from '@lucca-front/ng/qualification';
import { componentWrapperDecorator, Meta, moduleMetadata, Story } from '@storybook/angular';

@Component({
	selector: 'qualification-stories',
	template: `
		<label class="textfield mod-inline u-marginRightSmall">
			<lu-qualification-select placeholder="Select a qualification" class="textfield-input" ></lu-qualification-select>
			<span class="textfield-label">Simple</span>
		</label>
		<label class="textfield mod-inline">
			<lu-qualification-select placeholder="Select a qualification" [multiple]="true" class="textfield-input" ></lu-qualification-select>
			<span class="textfield-label">Multiple</span>
		</label>
`,
})
class QualificationSelectStory { }

export default {
	title: 'Documentation/Forms/Qualification',
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

export const Select = template.bind({});
Select.parameters = {
	// Disable controls as they are not modifiable because of ComponentWrapper
	controls: { include: [] },
	docs: {
		source: {
			language: 'ts',
			code: `
/* 1. Importer LuQualificationSelectModule */
import { LuQualificationSelectModule } from '@lucca-front/ng/qualification';

@NgModule({
	imports: [LuQualificationSelectModule]
})
class QualificationSelectStoriesModule {}

/* 2. Use it */
@Component({
	selector: 'qualification-select-story',
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
class QualificationSelectStory { }`
		}
	}
}
