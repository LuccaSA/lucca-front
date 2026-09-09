import { describe, expect, it } from 'vitest';
import { extractPackageAPI } from './ast-extractor';
import { resolveVersion } from '../version-config';

const V22 = resolveVersion('v22.0.0');

/**
 * The extractor read a decorated class's own body and stopped there, so every `input()`,
 * `output()` and `model()` declared on a base class was missing from the published API table —
 * with nothing to tell the reader that the list was partial.
 */
describe('inherited members', () => {
	it('lists what lu-date-input takes from AbstractDateComponent', () => {
		const api = extractPackageAPI('date2', V22, true, ['lu-date-input']);
		const cls = api!.apis.find((a) => a.className === 'DateInputComponent')!;
		const inputs = cls.inputs.map((i) => i.bindingName);

		// Declared on the component itself.
		expect(inputs).toContain('placeholder');
		// Declared on AbstractDateComponent.
		expect(inputs).toEqual(expect.arrayContaining(['intl', 'format', 'hasTodayButton', 'hideWeekend', 'min', 'max']));
		expect(cls.outputs.map((o) => o.bindingName)).toEqual(expect.arrayContaining(['panelOpened', 'panelClosed']));
		expect(cls.models.map((m) => m.bindingName)).toContain('calendarMode');
	});

	it('follows a base class that lives in another file of the package', () => {
		const api = extractPackageAPI('file-upload', V22, true);
		const single = api!.apis.find((a) => a.className === 'SingleFileUploadComponent')!;

		expect(single.inputs.map((i) => i.bindingName)).toEqual(expect.arrayContaining(['accept', 'fileMaxSize', 'required']));
	});

	it('keeps the derived declaration when a member is overridden', () => {
		const api = extractPackageAPI('date2', V22, true, ['lu-date-input']);
		const inputs = api!.apis.find((a) => a.className === 'DateInputComponent')!.inputs;

		for (const name of new Set(inputs.map((i) => i.bindingName))) {
			expect(inputs.filter((i) => i.bindingName === name)).toHaveLength(1);
		}
	});
});
