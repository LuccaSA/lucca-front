import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { LuUserDisplayPipe } from '../../display/index';
import { ILuUser } from '../../user.model';
import { LuUserHomonymsService } from './user-homonyms.service';

const johnDoe: ILuUser = { id: 1, firstName: 'John', lastName: 'Doe' };
const johnDoeTwin: ILuUser = { id: 2, firstName: 'John', lastName: 'Doe' };
const janeSmith: ILuUser = { id: 3, firstName: 'Jane', lastName: 'Smith' };

describe(LuUserHomonymsService.name, () => {
	let service: LuUserHomonymsService;
	let httpTestingController: HttpTestingController;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [LuUserHomonymsService, LuUserDisplayPipe, provideHttpClient(), provideHttpClientTesting()],
		});

		service = TestBed.inject(LuUserHomonymsService);
		httpTestingController = TestBed.inject(HttpTestingController);
	});

	afterEach(() => httpTestingController.verify());

	describe('extractHomonyms', () => {
		it('should return the users sharing the same name', () => {
			// Act
			const result = service.extractHomonyms([johnDoe, janeSmith, johnDoeTwin]);

			// Assert
			expect(result).toEqual([johnDoe, johnDoeTwin]);
		});

		it('should return an empty array when every name is unique', () => {
			// Act
			const result = service.extractHomonyms([johnDoe, janeSmith]);

			// Assert
			expect(result).toEqual([]);
		});

		it('should return an empty array for an empty list', () => {
			// Act
			const result = service.extractHomonyms([]);

			// Assert
			expect(result).toEqual([]);
		});

		it('should group homonyms even when they are not consecutive', () => {
			// Arrange
			const janeSmithTwin: ILuUser = { id: 4, firstName: 'Jane', lastName: 'Smith' };

			// Act
			const result = service.extractHomonyms([johnDoe, janeSmith, johnDoeTwin, janeSmithTwin]);

			// Assert
			expect(result).toEqual([johnDoe, johnDoeTwin, janeSmith, janeSmithTwin]);
		});

		it('should compare users on their last name then first name', () => {
			// Arrange
			const doeJohn: ILuUser = { id: 5, firstName: 'Doe', lastName: 'John' };

			// Act
			const result = service.extractHomonyms([johnDoe, doeJohn]);

			// Assert
			expect(result).toEqual([]);
		});
	});

	describe('enrichHomonyms', () => {
		function collect(homonyms: ILuUser[]): ILuUser[][] {
			const emissions: ILuUser[][] = [];
			service.enrichHomonyms(homonyms).subscribe((result) => emissions.push(result));
			return emissions;
		}

		it('should request the department of every homonym', () => {
			// Arrange
			collect([johnDoe, johnDoeTwin]);

			// Act
			const req = httpTestingController.expectOne((r) => r.url === '/api/v3/users');

			// Assert
			expect(req.request.method).toBe('GET');
			expect(req.request.params.get('id')).toBe('1,2');
			expect(req.request.params.get('fields')).toBe('id,department.name');
			req.flush({ data: { items: [] } });
		});

		it('should add the department name as additional information', () => {
			// Arrange
			const emissions = collect([johnDoe, johnDoeTwin]);

			// Act
			httpTestingController
				.expectOne((r) => r.url === '/api/v3/users')
				.flush({
					data: {
						items: [
							{ id: 1, department: { name: 'Tech' } },
							{ id: 2, department: { name: 'Design' } },
						],
					},
				});

			// Assert
			expect(emissions).toEqual([
				[
					{ ...johnDoe, additionalInformation: 'Tech' },
					{ ...johnDoeTwin, additionalInformation: 'Design' },
				],
			]);
		});

		it('should set an empty additional information when the user has no department', () => {
			// Arrange
			const emissions = collect([johnDoe]);

			// Act
			httpTestingController.expectOne((r) => r.url === '/api/v3/users').flush({ data: { items: [{ id: 1 }] } });

			// Assert
			expect(emissions).toEqual([[{ ...johnDoe, additionalInformation: '' }]]);
		});

		it('should only return the users present in the response', () => {
			// Arrange
			const emissions = collect([johnDoe, johnDoeTwin]);

			// Act
			httpTestingController.expectOne((r) => r.url === '/api/v3/users').flush({ data: { items: [{ id: 2, department: { name: 'Design' } }] } });

			// Assert
			expect(emissions).toEqual([[{ ...johnDoeTwin, additionalInformation: 'Design' }]]);
		});

		it('should emit an empty array without any request when there is no homonym', () => {
			// Act
			const emissions = collect([]);

			// Assert
			expect(emissions).toEqual([[]]);
			httpTestingController.expectNone('/api/v3/users');
		});

		it('should emit an empty array without any request when homonyms are nullish', () => {
			// Act
			const emissions = collect(null as unknown as ILuUser[]);

			// Assert
			expect(emissions).toEqual([[]]);
			httpTestingController.expectNone('/api/v3/users');
		});

		it('should emit an empty array when the request fails', () => {
			// Arrange
			const emissions = collect([johnDoe, johnDoeTwin]);

			// Act
			httpTestingController.expectOne((r) => r.url === '/api/v3/users').flush('Nope', { status: 500, statusText: 'Server error' });

			// Assert
			expect(emissions).toEqual([[]]);
		});
	});
});
