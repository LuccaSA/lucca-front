/* tslint:disable */
const contentPlaceholder = '######## This is where the content goes #######';
const popoverTemplate = `
<ng-template>
	<div class="lu-popover-panel" role="dialog" [class.lu-popover-overlap]="overlapTrigger" [ngClass]="_classList" [ngStyle]="popoverPanelStyles"
	 (keydown)="_handleKeydown($event)" (click)="onClick()" (mouseover)="onMouseOver()" (mouseleave)="onMouseLeave()" (mousedown)="onMouseDown($event)"
	 [@transformPopover]="'enter'">
		<div class="lu-popover-content" [ngStyle]="popoverContentStyles" cdkTrapFocus="focusTrapEnabled">
			${contentPlaceholder}
		</div>
	</div>
</ng-template>
`;
export function customPopoverTemplate(content: string) {
	return popoverTemplate.replace(contentPlaceholder, content);
}
export const standardPopoverTemplate = customPopoverTemplate(
	'<ng-content></ng-content><ng-container *ngTemplateOutlet="_template"></ng-container>',
);
