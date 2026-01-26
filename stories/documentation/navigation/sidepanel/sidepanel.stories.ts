import { ChangeDetectionStrategy, Component } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { ILuModalContent } from '@lucca-front/ng/modal';
import { LuSidepanel, LuSidepanelModule } from '@lucca-front/ng/sidepanel';
import { applicationConfig, Meta, StoryObj } from '@storybook/angular';

@Component({
	selector: 'sidepanel-content',
	template: '<p>General Kenobi</p>',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class SidepanelContentComponent implements ILuModalContent {
	title = 'Hello there';
	submitAction = () => {};
}

@Component({
	selector: 'sidepanel-stories',
	imports: [SidepanelContentComponent, LuSidepanelModule],
	template: `
		<h1>Sidepanels</h1>

		<button type="button" class="button" (click)="openSidepanel()">Open sidepanel</button>
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class SidePanelStory {
	constructor(private sidepanelFactory: LuSidepanel) {}

	public openSidepanel() {
		this.sidepanelFactory.open(SidepanelContentComponent).onClose.subscribe();
	}
}

export default {
	title: 'Documentation/Navigation/Sidepanel',
	component: SidePanelStory,
	decorators: [applicationConfig({ providers: [provideAnimations()] })],
} as Meta;

const template = (args: SidePanelStory) => ({
	props: args,
});

export const Basic: StoryObj<SidePanelStory> = {
	args: {},
	render: template,
};

const code = `
/* 1. Importer ILuSidePanelContent, LuSidepanel, LuSidepanelModule */
import { ILuSidepanelContent, LuSidepanel, LuSidepanelModule } from '@lucca-front/ng/sidepanel';

/* 2. Implémenter ILuSidepanelContent */
@Component({
	selector: 'sidepanel-content',
	template: '<p>General Kenobi</p>'
})
class SidepanelContentComponent implements ILuSidepanelContent {
	title = 'Hello there';
	submitAction = () => { };
}

/* 3. Ouvrer le SidepanelContentComponent */
@Component({
	selector: 'sidepanel-stories',
	template: \`
	<h1>Sidepanels</h1>
	<button type="button" class="button" (click)="openSidepanel()">Open sidepanel</button>
	\`,
})
class SidePanelStories {
	constructor(
		private sidepanelFactory: LuSidepanel
	) { }

	public openSidepanel() {
		this.sidepanelFactory.open(SidepanelContentComponent).onClose.subscribe();
	}
}`;

Basic.parameters = {
	docs: {
		source: {
			language: 'ts',
			type: 'code',
			code,
		},
	},
};
