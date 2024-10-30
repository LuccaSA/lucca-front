import { ControlValueAccessor } from '@angular/forms';
import { Component, ElementRef, ViewChild, OnDestroy, ViewEncapsulation, OnInit } from '@angular/core';
import { defaultValueCtx, Editor, rootCtx } from '@milkdown/kit/core';
import { nord } from '@milkdown/theme-nord';
import { commonmark } from '@milkdown/kit/preset/commonmark';

@Component({
	selector: 'lu-rich-text-input',
	standalone: true,
	imports: [],
	templateUrl: './rich-text-input.component.html',
	encapsulation: ViewEncapsulation.None,
})
export class RichTextInputComponent implements OnDestroy, ControlValueAccessor, OnInit {
	writeValue(obj: any): void {
		throw new Error('Method not implemented.');
	}
	registerOnChange(fn: any): void {
		throw new Error('Method not implemented.');
	}
	registerOnTouched(fn: any): void {
		throw new Error('Method not implemented.');
	}
	setDisabledState?(isDisabled: boolean): void {
		throw new Error('Method not implemented.');
	}
	ngOnDestroy(): void {
		throw new Error('Method not implemented.');
	}

	@ViewChild('editorRef') editorRef: ElementRef;

	defaultValue = '# Milkdown x Angular';

	ngOnInit() {
		console.log('ngOnInit');
	}

	ngAfterViewInit() {
		Editor.make()
			.config((ctx) => {
				ctx.set(rootCtx, this.editorRef.nativeElement);
				ctx.set(defaultValueCtx, this.defaultValue);
			})
			.config(nord)
			.use(commonmark)
			.create();
	}
}
