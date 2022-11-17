import { Component } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ILuSidepanelContent, LuSidepanel, LuSidepanelModule } from '@lucca-front/ng/sidepanel';
import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { map, shareReplay, timer } from 'rxjs';

@Component({
	selector: 'sidepanel-content',
	standalone: true,
	template: '<p>General Kenobi</p>'
})
class SidepanelContentComponent implements ILuSidepanelContent {
	title = 'Hello there'
	submitAction = () => {};
}

@Component({
	selector: 'sidepanel-content',
	standalone: true,
	template: '<p>General Kenobi</p>'
})
class SidepanelDynamicContentComponent implements ILuSidepanelContent {
	counter$ = timer(0, 1000).pipe(shareReplay({ refCount: true, bufferSize: 1 }))

	title = this.counter$.pipe(map(n => `Title #${n}`));
	submitLabel = this.counter$.pipe(map(n => `Submit #${n}`));
	cancelLabel = this.counter$.pipe(map(n => `Cancel #${n}`));
	submitCounter = this.counter$;
	submitDisabled = this.counter$.pipe(map(n => n % 2 === 0));

	submitAction = () => {};
}

@Component({
	selector: 'sidepanel-stories',
	template: `
		<button type="button" class="button" (click)="openSidepanel()">Open sidepanel</button>
		<button type="button" class="button" (click)="openDynamicContentSidepanel()">Open dynamic sidepanel</button>
	`,
}) class SidepanelStories {
	constructor(
		private sidepanel: LuSidepanel
	) { }

	public openSidepanel() {
		this.sidepanel.open(SidepanelContentComponent);
	}

	public openDynamicContentSidepanel() {
		this.sidepanel.open(SidepanelDynamicContentComponent);
	}
}

export default {
	title: 'Documentation/Overlays/Sidepanel',
	component: SidepanelStories,
	decorators: [
		moduleMetadata({
			imports: [
				LuSidepanelModule,
				BrowserAnimationsModule,
			]
		})
	],
} as Meta;

const Template: Story<SidepanelStories> = (args: SidepanelStories) => ({
	props: args,
});

export const Basic = Template.bind({});
Basic.args = {}
Basic.parameters = {
	docs: {
		source: {
			language: 'ts',
			type: 'code',
			code: `
/* 1. Importer LuSidepanelModule */
import { LuSidepanelModule } from '@lucca-front/ng/sidepanel';

@NgModule({
	imports: [LuSidepanelModule]
})
class SidepanelStoriesModule {}

/* 2. Créer le composant qui sera inclus dans la sidepanele */
@Component({
	selector: 'sidepanel-content',
	template: '<p>General Kenobi</p>'
})
class SidepanelContentComponent implements ILuSidepanelContent {
	title = 'Hello there';
	submitAction = () => {};
}

/* 3. Se faire injecter LuSidepanel dans le composant qui déclenche l'ouverture de la sidepanele puis appeler la méthode open() */
@Component({
	selector: 'sidepanel-stories',
	template: \`<button type="button" class="button" (click)="openSidepanel()">Open sidepanel</button>\`,
}) class SidepanelStories {
	constructor(
		private sidepanel: LuSidepanel
	) { }

	public openSidepanel() {
		this.sidepanel.open(SidepanelContentComponent);
	}
}`
		}
	}
};
