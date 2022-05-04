import { Title } from '@angular/platform-browser';
import { ActivatedRouteSnapshot, ActivationEnd, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { createServiceFactory, mockProvider, SpectatorService } from '@ngneat/spectator/jest';
import { of } from 'rxjs';
import { ILuTitleTranslateService, LU_TITLE_TRANSLATE_SERVICE } from './title-translate.service';
import { TitleService } from './title.service';

class TranslateService implements ILuTitleTranslateService {
	translate(key: string, _args?: { [arg: string]: unknown }): string {
		return key;
	}
}

const translationKey = 'Home';

describe('TitleService', () => {
	let spectator: SpectatorService<TitleService>;
	const route = new ActivatedRouteSnapshot();
	// eslint-disable-next-line
	(route as any).snapshot = { children: [], data: { title: translationKey } };

	const createService = createServiceFactory({
		service: TitleService,
		imports: [RouterTestingModule.withRoutes([])],
		providers: [
			mockProvider(Router, {
				events: of(new ActivationEnd(route)),
			}),
			mockProvider(Title),
			{
				provide: LU_TITLE_TRANSLATE_SERVICE,
				useClass: TranslateService,
			},
		],
	});

	beforeEach(() => (spectator = createService()));

	it('should be defined', () => {
		expect(spectator.service).toBeDefined();
	});

	xit('should set title', () => {
		const mockTitle = spectator.inject(Title);

		spectator.service.init(translationKey);
		expect(mockTitle.setTitle).toHaveBeenCalled();
		expect(mockTitle.setTitle).toHaveBeenCalledWith(translationKey);
	});
});
