import { Component } from '@angular/core';
import { LuSkipLinksComponent } from '@lucca-front/ng/a11y';
import { componentWrapperDecorator, Meta, moduleMetadata, Story } from '@storybook/angular';

@Component({
	selector: 'skip-links-story',
	standalone: true,
	imports: [LuSkipLinksComponent],
	template: `
		<lu-skip-links></lu-skip-links>
		<div id="navSide" tabindex="0">
			<p>Je suis la navside</p>
			<button type="button" class="button">Bouton skippé</button>
		</div>
		<div id="lucca-banner-solutions-container" tabindex="0">
			<p>Je suis le banner</p>
			<button type="button" class="button">Bouton skippé aussi</button>
		</div>
		<div id="main-content" tabindex="0">
			<p>Je suis le main-content wesh</p>
			<button type="button" class="button">Skip me</button>
		</div>
	`,
})
class SkipLinksStory {}

export default {
	title: 'Documentation/A11y/SkipLinks/Basic',
	component: LuSkipLinksComponent,
	decorators: [
		componentWrapperDecorator(SkipLinksStory),
		moduleMetadata({
			imports: [SkipLinksStory],
		}),
	],
} as Meta;

const Template: Story<SkipLinksStory> = (props) => ({ props });

const code = `
import { LuSkipLinksComponent } from '@lucca-front/ng/a11y';
@Component({
	standalone: true,
	imports: [LuSkipLinksComponent],
	selector: 'app-component',
	template: \`<lu-skip-links></lu-skip-links>\`,
})
class AppComponent {
}`;

export const Basic = Template.bind({});
Basic.parameters = {
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
