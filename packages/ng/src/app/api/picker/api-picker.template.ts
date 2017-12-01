import { customPopoverTemplate } from '../../popover/popover.template';
export const standardApiPickerTemplate = customPopoverTemplate(`
<ul class="api-picker-options">
	<li *ngFor="let option of (options$ | async)" (click)="selectOption(option)" class="api-picker-option">{{ option.name }}</li>
</ul>
`);
