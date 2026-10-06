import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { LuDisplayFormat, LuDisplayFullname, LuDisplayInitials } from '@lucca-front/ng/user';
import { LuCoreSelectUser, LuCoreSelectWithAdditionnalInformation } from './user-option.model';
import { LuCoreSelectUserHomonymsService } from './user-homonym.service';

const johnDoe: LuCoreSelectUser = { id: 1, firstName: 'John', lastName: 'Doe' };
const johnDoeTwin: LuCoreSelectUser = { id: 2, firstName: 'John', lastName: 'Doe' };
const janeSmith: LuCoreSelectUser = { id: 3, firstName: 'Jane', lastName: 'Smith' };

describe(LuCoreSelectUserHomonymsService.name, () => {
	let service: LuCoreSelectUserHomonymsService;
	let httpTestingController: HttpTestingController;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [LuCoreSelectUserHomonymsService, provideHttpClient(), provideHttpClientTesting()],
		});

		service = TestBed.inject(LuCoreSelectUserHomonymsService);
		httpTestingController = TestBed.inject(HttpTestingController);
	});

	afterEach(() => httpTestingController.verify());

	function collect(users: LuCoreSelectUser[], format: LuDisplayFormat = LuDisplayFullname.firstlast): LuCoreSelectWithAdditionnalInformation<LuCoreSelectUser>[][] {
		const emissions: LuCoreSelectWithAdditionnalInformation<LuCoreSelectUser>[][] = [];
		service.handleHomonyms(users, format).subscribe((result) => emissions.push(result));
		return emissions;
	}

	function flushDepartments(departments: { id: number; department?: { name: string } }[]): void {
		httpTestingController.expectOne((req) => req.url === '/api/v3/users').flush({ data: { items: departments } });
	}

	it('should emit the users unchanged when there is no homonym', () => {
		// Act
		const emissions = collect([johnDoe, janeSmith]);

		// Assert
		expect(emissions).toEqual([[johnDoe, janeSmith]]);
		httpTestingController.expectNone('/api/v3/users');
	});

	it('should emit the users right away before the additional information is loaded', () => {
		// Act
		const emissions = collect([johnDoe, johnDoeTwin, janeSmith]);

		// Assert
		expect(emissions).toEqual([[johnDoe, johnDoeTwin, janeSmith]]);
		flushDepartments([]);
	});

	it('should request the department of the homonyms only', () => {
		// Arrange
		collect([johnDoe, johnDoeTwin, janeSmith]);

		// Act
		const req = httpTestingController.expectOne((r) => r.url === '/api/v3/users');

		// Assert
		expect(req.request.method).toBe('GET');
		expect(req.request.params.get('id')).toBe('1,2');
		expect(req.request.params.get('fields')).toBe('id,department.name');
		req.flush({ data: { items: [] } });
	});

	it('should add the department name as additional information on homonyms', () => {
		// Arrange
		const emissions = collect([johnDoe, johnDoeTwin, janeSmith]);

		// Act
		flushDepartments([
			{ id: 1, department: { name: 'Tech' } },
			{ id: 2, department: { name: 'Design' } },
		]);

		// Assert
		expect(emissions[1]).toEqual([{ ...johnDoe, additionalInformation: 'Tech' }, { ...johnDoeTwin, additionalInformation: 'Design' }, janeSmith]);
	});

	it('should set an empty additional information when the user has no department', () => {
		// Arrange
		const emissions = collect([johnDoe, johnDoeTwin]);

		// Act
		flushDepartments([{ id: 1 }, { id: 2, department: { name: 'Design' } }]);

		// Assert
		expect(emissions[1][0].additionalInformation).toBe('');
	});

	it('should detect homonyms according to the given display format', () => {
		// Arrange
		const janeDoe: LuCoreSelectUser = { id: 5, firstName: 'Jane', lastName: 'Doe' };

		// Act
		collect([johnDoe, janeDoe], LuDisplayInitials.firstlast);

		// Assert
		const req = httpTestingController.expectOne((r) => r.url === '/api/v3/users');
		expect(req.request.params.get('id')).toBe('1,5');
		req.flush({ data: { items: [] } });
	});

	it('should reuse the cached departments instead of requesting them again', () => {
		// Arrange
		collect([johnDoe, johnDoeTwin]);
		flushDepartments([
			{ id: 1, department: { name: 'Tech' } },
			{ id: 2, department: { name: 'Design' } },
		]);

		// Act
		const emissions = collect([johnDoe, johnDoeTwin]);

		// Assert
		expect(emissions[1]).toEqual([
			{ ...johnDoe, additionalInformation: 'Tech' },
			{ ...johnDoeTwin, additionalInformation: 'Design' },
		]);
		httpTestingController.expectNone('/api/v3/users');
	});

	it('should request only the departments that are not cached yet', () => {
		// Arrange
		collect([johnDoe, johnDoeTwin]);
		flushDepartments([
			{ id: 1, department: { name: 'Tech' } },
			{ id: 2, department: { name: 'Design' } },
		]);
		const johnDoeThird: LuCoreSelectUser = { id: 4, firstName: 'John', lastName: 'Doe' };

		// Act
		collect([johnDoe, johnDoeTwin, johnDoeThird]);

		// Assert
		const req = httpTestingController.expectOne((r) => r.url === '/api/v3/users');
		expect(req.request.params.get('id')).toBe('4');
		req.flush({ data: { items: [{ id: 4, department: { name: 'Sales' } }] } });
	});
});
