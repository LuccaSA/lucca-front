import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DataPresentationListComponent } from '../data-presentation-list/data-presentation-list.component';
import { DataPresentationComponent } from './data-presentation.component';

@Component({
	selector: 'lu-data-presentation-standalone-test',
	imports: [DataPresentationComponent],
	template: `<lu-data-presentation label="Label" [size]="size()" [noValue]="noValue()">Value</lu-data-presentation>`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class StandaloneTestComponent {
	readonly size = input<'S' | null>(null);
	readonly noValue = input(false);
}

@Component({
	selector: 'lu-data-presentation-list-test',
	imports: [DataPresentationComponent, DataPresentationListComponent],
	template: `
		<lu-data-presentation-list [size]="listSize()">
			<div luDataPresentation label="Label A">Value A</div>
			<div luDataPresentation label="Label B" [size]="itemSize()" [noValue]="noValue()">Value B</div>
		</lu-data-presentation-list>
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class ListTestComponent {
	readonly listSize = input<'S' | null>(null);
	readonly itemSize = input<'S' | null>(null);
	readonly noValue = input(false);
}

const childTags = (element: Element) => [...element.children].map((child) => child.tagName);

describe(DataPresentationComponent.name, () => {
	describe('standalone', () => {
		let fixture: ComponentFixture<StandaloneTestComponent>;
		let host: HTMLElement;

		const query = (selector: string) => host.querySelector<HTMLElement>(selector)!;

		beforeEach(() => {
			fixture = TestBed.createComponent(StandaloneTestComponent);
			host = fixture.debugElement.nativeElement as HTMLElement;
		});

		it('should render its own description list', () => {
			fixture.detectChanges();

			const dl = query('lu-data-presentation > dl.presentation');
			expect(dl).not.toBeNull();
			expect(childTags(dl)).toEqual(['DT', 'DD']);
			expect(query('dt.presentation-term').textContent?.trim()).toBe('Label');
			expect(query('dd.presentation-definition').textContent?.trim()).toBe('Value');
		});

		it('should not turn its host into a group', () => {
			fixture.detectChanges();

			expect(query('lu-data-presentation').classList.contains('presentation')).toBe(false);
			expect(host.querySelector('div.presentation')).toBeNull();
		});

		it('should apply mod-S on the description list', () => {
			fixture.componentRef.setInput('size', 'S');
			fixture.detectChanges();

			expect(query('dl.presentation').classList.contains('mod-S')).toBe(true);
		});

		it('should render the empty value placeholder', () => {
			fixture.componentRef.setInput('noValue', true);
			fixture.detectChanges();

			expect(host.querySelector('dd.presentation-definition > [data-content-before]')).not.toBeNull();
		});
	});

	describe('inside a list', () => {
		let fixture: ComponentFixture<ListTestComponent>;
		let host: HTMLElement;

		const groups = () => [...host.querySelectorAll<HTMLElement>('div.presentation')];

		beforeEach(() => {
			fixture = TestBed.createComponent(ListTestComponent);
			host = fixture.debugElement.nativeElement as HTMLElement;
		});

		it('should render a single valid description list', () => {
			fixture.detectChanges();

			const lists = host.querySelectorAll('dl');
			expect(lists.length).toBe(1);
			expect(lists[0].classList.contains('presentationWrapper')).toBe(true);
			expect(childTags(lists[0])).toEqual(['DIV', 'DIV']);
		});

		it('should host each pair in a group', () => {
			fixture.detectChanges();

			const [first] = groups();
			expect(groups().length).toBe(2);
			expect(childTags(first)).toEqual(['DT', 'DD']);
			expect(first.querySelector('dt.presentation-term')?.textContent?.trim()).toBe('Label A');
			expect(first.querySelector('dd.presentation-definition')?.textContent?.trim()).toBe('Value A');
		});

		it('should inherit the list size', () => {
			fixture.componentRef.setInput('listSize', 'S');
			fixture.detectChanges();

			expect(host.querySelector('dl')?.classList.contains('mod-S')).toBe(true);
			expect(groups().every((group) => group.classList.contains('mod-S'))).toBe(true);
		});

		it('should let an item override the list size', () => {
			fixture.componentRef.setInput('itemSize', 'S');
			fixture.detectChanges();

			const [first, second] = groups();
			expect(first.classList.contains('mod-S')).toBe(false);
			expect(second.classList.contains('mod-S')).toBe(true);
		});

		it('should render the empty value placeholder', () => {
			fixture.componentRef.setInput('noValue', true);
			fixture.detectChanges();

			expect(groups()[1].querySelector('dd.presentation-definition > [data-content-before]')).not.toBeNull();
		});
	});
});
