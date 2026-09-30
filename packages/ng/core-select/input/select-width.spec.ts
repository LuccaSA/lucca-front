import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { LuMultiSelectInputComponent } from '@lucca-front/ng/multi-select';
import { LuSimpleSelectInputComponent } from '@lucca-front/ng/simple-select';
import { TestEntity } from './select-input.component.spec';

const options: TestEntity[] = [
	{ id: 1, name: 'test 1' },
	{ id: 2, name: 'test 2' },
];

@Component({
	selector: 'lu-select-width-host',
	imports: [FormsModule, LuSimpleSelectInputComponent, LuMultiSelectInputComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<lu-simple-select id="simple" [ngModel]="null" [options]="options" [width]="width" />
		<lu-multi-select id="multi" [ngModel]="[]" [options]="options" [width]="width" />
	`,
})
class SelectWidthHostComponent {
	options: TestEntity[] = options;
	width: number | null = null;
}

describe('select width input', () => {
	function render(width: number | null): { simple: HTMLElement; multi: HTMLElement } {
		TestBed.resetTestingModule();
		TestBed.configureTestingModule({ imports: [SelectWidthHostComponent] });

		const fixture = TestBed.createComponent(SelectWidthHostComponent);
		fixture.componentInstance.width = width;
		fixture.detectChanges();

		const element = fixture.nativeElement as HTMLElement;
		return {
			simple: element.querySelector('#simple') as HTMLElement,
			multi: element.querySelector('#multi') as HTMLElement,
		};
	}

	it('should not set any width class when the input is not provided', () => {
		const { simple, multi } = render(null);

		expect(simple.className).toContain('simpleSelect');
		expect(simple.className).not.toMatch(/mod-width/);
		expect(multi.className).toContain('multiSelect');
		expect(multi.className).not.toMatch(/mod-width/);
	});

	it('should set the width class on both selects, keeping the component class', () => {
		const { simple, multi } = render(30);

		expect(simple.className).toContain('simpleSelect');
		expect(simple.className).toContain('mod-width30');
		expect(multi.className).toContain('multiSelect');
		expect(multi.className).toContain('mod-width30');
	});
});
