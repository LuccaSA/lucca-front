import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { Component, viewChild } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { LuSimpleSelectInputComponent } from '@lucca-front/ng/simple-select';
import { LuCoreSelectApiV3Directive } from '../api/api-v3.directive';
import { LuCoreSelectApiV4Directive } from '../api/api-v4.directive';
import { LuCoreSelectNoClueDirective } from './no-clue.directive';

@Component({
	selector: 'lu-test-v3-no-clue',
	imports: [LuSimpleSelectInputComponent, LuCoreSelectNoClueDirective, LuCoreSelectApiV4Directive],
	template: `<lu-simple-select noClue apiV4="/some/api" />`,
})
class TestV3NoClueComponent {
	select = viewChild.required(LuSimpleSelectInputComponent);
}

@Component({
	selector: 'lu-test-v4-no-clue',
	imports: [LuSimpleSelectInputComponent, LuCoreSelectNoClueDirective, LuCoreSelectApiV3Directive],
	template: `<lu-simple-select noClue apiV3="/some/api" />`,
})
class TestV4NoClueComponent {
	select = viewChild.required(LuSimpleSelectInputComponent);
}

describe('LuCoreSelectNoClueDirective', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [provideHttpClient(), provideHttpClientTesting()],
		});
	});

	it('should not be searchable when using apiV3 and noClue directives', () => {
		// Arrange
		const fixture = TestBed.createComponent(TestV3NoClueComponent);

		// Act
		const select = fixture.componentInstance.select();

		// Assert
		expect(select.searchable).toBe(false);
	});

	it('should not be searchable when using apiV4 and noClue directives', () => {
		// Arrange
		const fixture = TestBed.createComponent(TestV4NoClueComponent);

		// Act
		const select = fixture.componentInstance.select();

		// Assert
		expect(select.searchable).toBe(false);
	});
});
