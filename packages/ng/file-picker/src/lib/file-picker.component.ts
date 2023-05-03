import { NgIf, NgSwitch, NgSwitchCase } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, forwardRef, inject, InjectionToken, Input, OnDestroy, OnInit } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ClassOnDragOverDirective } from './class-on-drag-over.directive';
import { FilePickerState } from './file-picker.models';
import { getIntl } from '../../../core/src/lib';
import { LU_FILE_PICKER_TRANSLATIONS } from './file-picker.translate';

@Component({
	selector: 'lu-file-picker',
	templateUrl: './file-picker.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => FilePickerComponent),
			multi: true,
		},
	],
	standalone: true,
	imports: [NgIf, NgSwitch, NgSwitchCase, ClassOnDragOverDirective],
})
export class FilePickerComponent implements ControlValueAccessor, OnInit, OnDestroy {
	private readonly changeDetectorRef = inject(ChangeDetectorRef);
	public intl = getIntl(LU_FILE_PICKER_TRANSLATIONS);

	@Input() public accept = 'application/pdf';
	@Input() public authorizedFormatsText!: string;
	@Input() public authorizedMaxSizeText!: string;

	@Input() public progress?: number;
	@Input() public uploadState: FilePickerState = 'Idle';
	@Input() public errorMessage?: string;

	@Input() public modSmall: boolean;

	public readonly form = new FormControl<File | null>(null);
	public readonly subscription = new Subscription();

	private onChange?: (file: File | null) => void;

	public ngOnInit(): void {
		this.subscription.add(this.form.valueChanges.subscribe((value) => this.onChange?.(value)));
	}

	public ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}

	public onFileSelected(event: Event): void {
		const target = event.target as HTMLInputElement;
		const files = target.files;
		this.form.setValue(files ? Array.from(files)?.[0] : null);
		// don't keep value to fire onchange again if file is deleted then re-selected
		(event.target as HTMLInputElement).value = '';
	}

	public writeValue(file: File | null): void {
		this.form.patchValue(file, { emitEvent: false });
		this.changeDetectorRef.markForCheck();
	}

	public registerOnChange(onChange: (file: File | null) => void): void {
		this.onChange = onChange;
	}

	public registerOnTouched(): void {
		// Method not implemented
	}
}
