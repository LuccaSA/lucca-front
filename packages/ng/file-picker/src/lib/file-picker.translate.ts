import { InjectionToken } from '@angular/core';
import { ILuTranslation } from '@lucca-front/ng/core';

export const LU_FILE_PICKER_TRANSLATIONS = new InjectionToken('LuFilePickerTranslations', {
	factory: () => luFilePickerTranslations,
});

export interface ILuFilePickerTranslations {
	FILE_PICKER_TITLE_DRAG_AND_DROP: string;
	FILE_PICKER_TITLE_UPLOADING: string;
	FILE_PICKER_TITLE_UPLOADED: string;
	FILE_PICKER_BUTTON_SELECT_FILE: string;
	FILE_PICKER_BUTTON_RESELECT_FILE: string;
	FILE_PICKER_OR: string;
	FILE_PICKER_OR_OTHER_FILE: string;
}

export const luFilePickerTranslations: ILuTranslation<ILuFilePickerTranslations> = {
	en: {
		FILE_PICKER_TITLE_DRAG_AND_DROP: 'Drag and drop your file here',
		FILE_PICKER_TITLE_UPLOADING: 'Uploading your file…',
		FILE_PICKER_TITLE_UPLOADED: 'File uploaded',
		FILE_PICKER_BUTTON_SELECT_FILE: 'Select files',
		FILE_PICKER_BUTTON_RESELECT_FILE: 'Select another file',
		FILE_PICKER_OR: 'or',
		FILE_PICKER_OR_OTHER_FILE: 'It’s the wrong file?',
	},
	fr: {
		FILE_PICKER_TITLE_DRAG_AND_DROP: 'Glissez-déposez votre fichier ici',
		FILE_PICKER_TITLE_UPLOADING: 'Téléchargement de votre fichier en cours…',
		FILE_PICKER_TITLE_UPLOADED: 'Fichier téléchargé',
		FILE_PICKER_BUTTON_SELECT_FILE: 'Sélectionner des fichiers',
		FILE_PICKER_BUTTON_RESELECT_FILE: 'Sélectionner un autre fichier',
		FILE_PICKER_OR: 'ou',
		FILE_PICKER_OR_OTHER_FILE: "Ce n'est pas le bon fichier ?",
	},
	de: {
		FILE_PICKER_TITLE_DRAG_AND_DROP: 'Ziehen Sie Ihre Datei hierher',
		FILE_PICKER_TITLE_UPLOADING: 'Laden Ihrer Datei hoch…',
		FILE_PICKER_TITLE_UPLOADED: 'Datei hochgeladen',
		FILE_PICKER_BUTTON_SELECT_FILE: 'Dateien auswählen',
		FILE_PICKER_BUTTON_RESELECT_FILE: 'Anderen Datei auswählen',
		FILE_PICKER_OR: 'oder',
		FILE_PICKER_OR_OTHER_FILE: 'Ist es die falsche Datei?',
	},
	es: {
		FILE_PICKER_TITLE_DRAG_AND_DROP: 'Arrastre y suelte su archivo aquí',
		FILE_PICKER_TITLE_UPLOADING: 'Subiendo su archivo…',
		FILE_PICKER_TITLE_UPLOADED: 'Archivo subido',
		FILE_PICKER_BUTTON_SELECT_FILE: 'Seleccionar archivos',
		FILE_PICKER_BUTTON_RESELECT_FILE: 'Seleccionar otro archivo',
		FILE_PICKER_OR: 'o',
		FILE_PICKER_OR_OTHER_FILE: '¿Es el archivo equivocado?',
	},
	pt: {
		FILE_PICKER_TITLE_DRAG_AND_DROP: 'Arraste e solte seu arquivo aqui',
		FILE_PICKER_TITLE_UPLOADING: 'Enviando seu arquivo…',
		FILE_PICKER_TITLE_UPLOADED: 'Arquivo enviado',
		FILE_PICKER_BUTTON_SELECT_FILE: 'Selecionar arquivos',
		FILE_PICKER_BUTTON_RESELECT_FILE: 'Selecionar outro arquivo',
		FILE_PICKER_OR: 'ou',
		FILE_PICKER_OR_OTHER_FILE: 'É o arquivo errado?',
	},
};
