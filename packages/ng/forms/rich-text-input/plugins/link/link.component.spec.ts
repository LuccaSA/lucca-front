import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockComponents, MockDirectives } from 'ng-mocks';
import { LuTooltipTriggerDirective } from '@lucca-front/ng/tooltip';
import { IconComponent } from '@lucca-front/ng/icon';
import { ButtonComponent } from '@lucca-front/ng/button';
import { createDialogServiceMock, ServiceMock } from '@tests';
import {
	$insertNodes,
	createEditor,
	LexicalEditor,
	SELECTION_CHANGE_COMMAND,
} from 'lexical';
import { signal, Signal } from '@angular/core';
import { provideLuTranslocoTesting } from '@lucca/cdk/transloco';
import { LinkComponent } from './link.component';
import { provideLuDialogDataTesting } from '@lucca-front/ng/dialog/testing';
import { LuDialogService } from '@lucca-front/ng/dialog';
import { of } from 'rxjs';
import { $createLinkNode, AutoLinkNode, LinkNode } from '@lexical/link';
import { LinkDialogComponent } from './link-dialog';
import { FORMAT_LINK, registerLinkSelectionChange } from './link.command';

jest.mock('./link.command', () => ({
	registerLink: jest.fn(() => jest.fn()),
	registerLinkSelectionChange: jest.fn(() => jest.fn()),
	FORMAT_LINK: 'FORMAT_LINK',
}));

describe('LinkComponent', () => {
	let component: LinkComponent;
	let fixture: ComponentFixture<LinkComponent>;

	// editor is not mocked as we need some behaviors to work within the component
	let editor: LexicalEditor;
	let dialogServiceMock: ServiceMock<LuDialogService>;

	beforeEach(async () => {
		editor = createEditor({
			nodes: [LinkNode, AutoLinkNode],
			editable: true,
		});
		dialogServiceMock = createDialogServiceMock();
		dialogServiceMock.open?.mockReturnValue({
			result$: of(undefined),
		});

		await TestBed.configureTestingModule({
			imports: [
				LinkComponent,
				MockDirectives(LuTooltipTriggerDirective),
				MockComponents(IconComponent, ButtonComponent),
			],
			providers: [
				provideLuTranslocoTesting(),
				provideLuDialogDataTesting('' as never),
			],
		})
			.overrideProvider(LuDialogService, {
				useValue: dialogServiceMock,
			})
			.compileComponents();

		fixture = TestBed.createComponent(LinkComponent);
		component = fixture.componentInstance;
		(component.editor as unknown as Signal<LexicalEditor>) = signal(editor);
		fixture.detectChanges();
	});

	describe(`ngOnInit`, () => {
		it(`should update active value when selection change`, () => {
			let testCallback: (hasFormat: boolean) => void = () => undefined;
			(registerLinkSelectionChange as jest.Mock).mockImplementation(
				(editor, callBack) => {
					testCallback = callBack;
					return jest.fn();
				},
			);
			component.ngOnInit();

			testCallback(true);
			expect(component.active()).toEqual(true);
		});
	});

	describe('dispatchCommand', () => {
		it(`should display popup`, () => {
			component.dispatchCommand();

			expect(dialogServiceMock.open).toHaveBeenCalledWith({
				content: LinkDialogComponent,
				size: 'S',
				data: ``,
			});
		});

		it(`should call editor with popup result if protocol is provided`, () => {
			const spy = jest.spyOn(editor, 'dispatchCommand');
			dialogServiceMock.open?.mockReturnValue({
				result$: of('https://www.google.com'),
			});

			component.dispatchCommand();
			expect(spy).toHaveBeenCalledWith(
				FORMAT_LINK,
				'https://www.google.com',
			);
		});

		it(`should call editor and append protocol if not provided`, () => {
			const spy = jest.spyOn(editor, 'dispatchCommand');
			dialogServiceMock.open?.mockReturnValue({
				result$: of('www.google.com'),
			});

			component.dispatchCommand();
			expect(spy).toHaveBeenCalledWith(
				FORMAT_LINK,
				'https://www.google.com',
			);
		});

		it(`should call update selection`, () => {
			const spy = jest.spyOn(editor, 'dispatchCommand');
			dialogServiceMock.open?.mockReturnValue({
				result$: of('https://www.google.com'),
			});

			component.dispatchCommand();
			expect(spy).toHaveBeenCalledWith(
				SELECTION_CHANGE_COMMAND,
				undefined,
			);
		});

		it(`should open popup with existing url link if any`, () => {
			editor.update(() => {
				const node = $createLinkNode('https://hello.com');
				$insertNodes([node]);
				node.select();
			});

			component.dispatchCommand();
			expect(dialogServiceMock.open).toHaveBeenCalledWith({
				content: LinkDialogComponent,
				size: 'S',
				data: `https://hello.com`,
			});
		});
	});
});
