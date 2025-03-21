import { InjectionToken } from '@angular/core';
import { LuTranslation } from '@lucca-front/ng/core';
import { Translations } from './translations';

export const LU_FILE_UPLOAD_TRANSLATIONS = new InjectionToken('LuFileUploadTranslations', {
	factory: () => luFileUploadTranslations,
});

export interface LuFileUploadLabel {
	acceptedFormat: {
		one: string;
		other: string;
	};
	selectFile: {
		one: string;
		other: string;
	};
	dropOrClick: {
		one: string;
		other: string;
	};
	maxWeight: {
		one: string;
		other: string;
	};
	fileUploadedListed: {
		one: string;
		other: string;
	};
	all: string;
	file: string;
	download: string;
	downloadFile: string;
	delete: string;
	deleteFile: string;
	password: string;
	confirmPassword: string;
}

export const luFileUploadTranslations: LuTranslation<LuFileUploadLabel> = Translations;
