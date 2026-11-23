import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListboxComponent } from './listbox.component';
import { OptionComponent } from './option/option.component';

describe(ListboxComponent.name, () => {
	let fixture: ComponentFixture<ListboxComponent>;
	let host: HTMLElement;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [ListboxComponent],
		});
		fixture = TestBed.createComponent(ListboxComponent);
		host = fixture.nativeElement;
	});

	/**
	 * WebKit's rule: a tree holds treeitems, groups and presentational elements only, down to each
	 * treeitem. It is checked once, when the tree is created, and VoiceOver reads every row of an
	 * invalid tree as a plain group — so the tree has to be valid from its first, loading, render.
	 */
	function elementsBreakingTheTree(): string[] {
		const queue = [...host.children];
		const breaking: string[] = [];
		while (queue.length) {
			const element = queue.shift()!;
			const role = element.getAttribute('role');
			if (role === 'treeitem') {
				continue;
			}
			if (role === 'group' || role === 'presentation' || role === 'none') {
				queue.push(...element.children);
			} else {
				breaking.push(element.outerHTML);
			}
		}
		return breaking;
	}

	describe('collapsable', () => {
		@Component({
			template: `<lu-listbox tree [collapsable]="collapsable">
				<lu-listbox-option>Leaf</lu-listbox-option>
				<lu-listbox-option collapsable [treeitemLevel]="1">Branch</lu-listbox-option>
			</lu-listbox>`,
			imports: [ListboxComponent, OptionComponent],
			changeDetection: ChangeDetectionStrategy.OnPush,
		})
		class HostComponent {
			collapsable = true;
		}

		function slots(collapsable: boolean): (string | null)[] {
			const hostFixture = TestBed.createComponent(HostComponent);
			hostFixture.componentInstance.collapsable = collapsable;
			hostFixture.detectChanges();
			const options = hostFixture.nativeElement.querySelectorAll('lu-listbox-option');
			// null: no slot at all; '': an empty slot; otherwise the chevron
			return [...options].map((option: HTMLElement) => {
				const slot = option.querySelector(':scope > .listboxOption-content > .listboxOption-content-disclosure');
				return slot ? (slot.querySelector('.listboxOption-content-disclosure-icon') ? 'chevron' : '') : null;
			});
		}

		it('should keep an empty chevron slot on an option with nothing to fold', () => {
			expect(slots(true)).toEqual(['', 'chevron']);
		});

		it('should leave the options of a tree that does not fold as they are', () => {
			expect(slots(false)).toEqual([null, 'chevron']);
		});
	});

	it('should stay a valid tree for WebKit while loading', () => {
		fixture.componentRef.setInput('tree', true);
		fixture.componentRef.setInput('state', 'loading');
		fixture.componentRef.setInput('statusMsg', 'Loading');
		fixture.detectChanges();

		expect(host.getAttribute('role')).toBe('tree');
		// The loading message is still there for screen readers, only presentational
		expect(host.textContent).toContain('Loading');
		expect(elementsBreakingTheTree()).toEqual([]);
	});
});
