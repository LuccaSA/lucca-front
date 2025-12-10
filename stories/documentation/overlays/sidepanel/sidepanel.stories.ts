import { ChangeDetectionStrategy, Component } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { ILuModalContent, LuModal, LuModalModule } from '@lucca-front/ng/modal';
import { LuSidepanel, LuSidepanelModule } from '@lucca-front/ng/sidepanel';
import { LuToastsModule, LuToastsService } from '@lucca-front/ng/toast';
import { applicationConfig, Meta, StoryObj } from '@storybook/angular';
import { map, shareReplay, timer } from 'rxjs';

@Component({
	selector: 'sidepanel-content',
	standalone: true,
	template: '<p>General Kenobi</p>',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class SidepanelContentComponent implements ILuModalContent {
	title = 'Hello there';
	submitAction = () => timer(500);
}

@Component({
	selector: 'sidepanel-content',
	standalone: true,
	template: '<p>General Kenobi</p>',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class SidepanelDynamicContentComponent implements ILuModalContent {
	counter$ = timer(0, 1000).pipe(shareReplay({ refCount: true, bufferSize: 1 }));

	title = this.counter$.pipe(map((n) => `Title #${n}`));
	submitLabel = this.counter$.pipe(map((n) => `Submit #${n}`));
	cancelLabel = this.counter$.pipe(map((n) => `Cancel #${n}`));
	submitCounter = this.counter$;
	submitDisabled = this.counter$.pipe(map((n) => n % 2 === 0));

	submitAction = () => timer(500);
}

@Component({
	selector: 'sidepanel-stories',
	standalone: true,
	imports: [LuSidepanelModule, LuModalModule, LuToastsModule],
	template: `
		<lu-toasts [sources]="[]" />
		<div class="pr-u-marginBlockEnd200">
			<button type="button" class="button" (click)="openSidepanel()">Open</button>
			<button type="button" class="button" (click)="openDynamicContentSidepanel()">Open (Dynamic)</button>
			<button type="button" class="button" (click)="openUndismissableSidepanel()">Open (Backdrop event)</button>
		</div>
		<div>
			<button type="button" class="button mod-outlined" (click)="openLegacySidepanel()">Open (Legacy)</button>
			<button type="button" class="button mod-outlined" (click)="openLegacyDynamicContentSidepanel()">Open (Legacy & dynamic)</button>
		</div>
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class SidepanelStory {
	constructor(
		private sidepanel: LuSidepanel,
		private modal: LuModal,
		private toastsService: LuToastsService,
	) {}

	public openSidepanel() {
		this.modal.open(SidepanelContentComponent, undefined, { mode: 'sidepanel' });
	}

	public openDynamicContentSidepanel() {
		this.modal.open(SidepanelDynamicContentComponent, undefined, { mode: 'sidepanel' });
	}

	public openLegacySidepanel() {
		this.sidepanel.legacyOpen(SidepanelContentComponent);
	}

	public openLegacyDynamicContentSidepanel() {
		this.sidepanel.legacyOpen(SidepanelDynamicContentComponent);
	}

	public openUndismissableSidepanel() {
		this.sidepanel.open(SidepanelContentComponent, undefined, { undismissable: true }).onBackdropClick.subscribe(() => {
			this.toastsService.addToast({
				message: 'Backdrop clicked',
			});
		});
	}
}

export default {
	title: 'Documentation/Overlays/Sidepanel',
	component: SidepanelStory,
	decorators: [applicationConfig({ providers: [provideAnimations()] })],
} as Meta;

const Template = (args: SidepanelStory) => ({
	props: args,
});

export const Basic: StoryObj<SidepanelStory> = {
	args: {},
	render: Template,
};

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
class SidepanelContentComponent implements ILuModalContent {
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
}`,
		},
	},
};
