import { Component } from '@angular/core';
import { LuSkipLinksComponent } from '@lucca-front/ng/a11y';
import { componentWrapperDecorator, Meta, moduleMetadata, Story } from '@storybook/angular';

@Component({
	selector: 'skip-links-story',
	standalone: true,
	imports: [LuSkipLinksComponent],
	template: `
		<lu-skip-links></lu-skip-links>
		<div id="lucca-banner-solutions-container" class="u-displayFlex u-gapSmaller u-marginBottomSmall">
			banner
			<button type="button" class="button u-marginReset">Banner</button>
			<button type="button" class="button u-marginReset">Banner</button>
			<button type="button" class="button u-marginReset">Banner</button>
			<button type="button" class="button u-marginReset">Banner</button>
		</div>
		<div class="u-displayFlex u-gapSmall">
			<div id="navSide" class="u-displayFlex u-flexDirectionColumn u-gapSmaller">
				navside
				<button type="button" class="button u-marginReset">Navside</button>
				<button type="button" class="button u-marginReset">Navside</button>
				<button type="button" class="button u-marginReset">Navside</button>
				<button type="button" class="button u-marginReset">Navside</button>
			</div>
			<div id="main-content" class="u-displayFlex u-flexDirectionColumn u-gapSmaller">
				main content
				<button type="button" class="button u-marginReset">Main content</button>
				<button type="button" class="button u-marginReset">Main content</button>
				<button type="button" class="button u-marginReset">Main content</button>
				<button type="button" class="button u-marginReset">Main content</button>
			</div>
		</div>
	`,
})
class SkipLinksStory {}

export default {
	title: 'Documentation/Navigation/SkipLinks/Basic',
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
