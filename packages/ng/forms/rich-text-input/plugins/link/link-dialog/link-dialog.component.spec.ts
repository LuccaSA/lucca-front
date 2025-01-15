import { LinkDialogComponent } from '@shared/components/rich-text-editor/toolbar/tools/link/link-dialog/link-dialog.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import {
	DialogComponent,
	DialogContentComponent,
	DialogDismissDirective,
	DialogFooterComponent,
	LuDialogRef,
} from '@lucca-front/ng/dialog';
import { ServiceMock } from '@tests';
import { provideLuDialogDataTesting } from '@lucca-front/ng/dialog/testing';
import { provideLuTranslocoTesting } from '@lucca/cdk/transloco';
import { MockComponents, MockDirectives } from 'ng-mocks';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { TextInputComponent } from '@lucca-front/ng/forms';
import { ButtonComponent } from '@lucca-front/ng/button';
import { IconComponent } from '@lucca-front/ng/icon';
import { LuTooltipTriggerDirective } from '@lucca-front/ng/tooltip';

describe('LinkDialogComponent', () => {
	let component: LinkDialogComponent;
	let fixture: ComponentFixture<LinkDialogComponent>;

	let dialogRefMock: ServiceMock<LuDialogRef>;

	beforeEach(async () => {
		dialogRefMock = {
			close: jest.fn(),
		};

		await TestBed.configureTestingModule({
			imports: [
				LinkDialogComponent,
				ReactiveFormsModule,
				MockComponents(
					DialogComponent,
					DialogContentComponent,
					DialogFooterComponent,
					FormFieldComponent,
					TextInputComponent,
					ButtonComponent,
					IconComponent,
				),
				MockDirectives(
					DialogDismissDirective,
					LuTooltipTriggerDirective,
				),
			],
			providers: [
				provideLuTranslocoTesting(),
				provideLuDialogDataTesting('test' as never),
				{
					provide: LuDialogRef,
					useValue: dialogRefMock,
				},
			],
		}).compileComponents();

		fixture = TestBed.createComponent(LinkDialogComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	describe(`init`, () => {
		it(`should init formControl with passed data`, () => {
			expect(component.formGroup.value).toEqual({ href: 'test' });
		});
	});

	describe(`save`, () => {
		it(`should close popup with trimmed form control value`, () => {
			component.formGroup.setValue({ href: 'hello ' });
			component.save();
			expect(dialogRefMock.close).toHaveBeenCalledWith('hello');
		});

		it(`should close popup with sanitized encoded url`, () => {
			component.formGroup.setValue({ href: 'hello hello' });
			component.save();
			expect(dialogRefMock.close).toHaveBeenCalledWith('hello%20hello');
		});

		it(`should mark form as touched if invalid`, () => {
			component.formGroup.setValue({ href: null });
			component.save();
			expect(component.formGroup.touched).toEqual(true);
		});
	});

	describe(`deleteLink`, () => {
		it(`should close popup with null`, () => {
			component.deleteLink();
			expect(dialogRefMock.close).toHaveBeenCalledWith(undefined);
		});
	});
});
