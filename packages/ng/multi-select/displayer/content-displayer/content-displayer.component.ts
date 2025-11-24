import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { LuMultiSelectInputComponent } from '../../input';
import { LuMultiSelectDisplayerInputDirective } from '../displayer-input.directive';

@Component({
	selector: 'lu-multi-select-content-displayer',
	imports: [LuMultiSelectDisplayerInputDirective],
	template: `
		<div class="multipleSelect-displayer mod-filter">
			<input type="text" autocomplete="off" #inputElement luMultiSelectDisplayerInput />
			<div class="multipleSelect-displayer-filter">
				<ng-content />
			</div>
		</div>
	`,
	styleUrl: './content-displayer.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LuMultiSelectContentDisplayerComponent<T> {
	select = inject<LuMultiSelectInputComponent<T>>(LuMultiSelectInputComponent);
}
