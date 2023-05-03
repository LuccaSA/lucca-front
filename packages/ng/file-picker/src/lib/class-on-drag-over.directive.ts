import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
	selector: '[luClassOnDragOver]',
	standalone: true,
})
export class ClassOnDragOverDirective {
	@HostBinding('class.is-droppable') private isDroppable = false;

	@HostListener('dragover', ['$event']) onDragOver(event: DragEvent) {
		event.preventDefault();
		event.stopPropagation();
		this.isDroppable = true;
	}

	@HostListener('dragleave', ['$event']) onDragLeave(event: DragEvent) {
		event.preventDefault();
		event.stopPropagation();
		this.isDroppable = false;
	}

	@HostListener('drop', ['$event'])
	public onDrop(event: DragEvent) {
		event.preventDefault();
		event.stopPropagation();

		this.isDroppable = false;
	}
}
