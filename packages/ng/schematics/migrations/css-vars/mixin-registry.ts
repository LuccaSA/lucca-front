export type RegisteredMixin = { newName: string; namespace?: string; import: string; prefix: string };

export class MixinRegistry {
	private _mixins: Record<string, RegisteredMixin> = {};

	public registerMixin(mixins: string[] | Record<string, string>, mixinsImport: string, namespace?: string): this {
		const mixinNames = Array.isArray(mixins) ? mixins : Object.keys(mixins);

		for (const mixin of mixinNames) {
			this._mixins[mixin] = {
				newName: Array.isArray(mixins) ? mixin : mixins[mixin],
				import: mixinsImport,
				namespace,
				prefix: namespace ?? mixinsImport.split('/').reverse()[0],
			};
		}

		return this;
	}

	public getByName(name: string): RegisteredMixin | null {
		return this._mixins[name] ?? null;
	}
}

const mixinRegistry = new MixinRegistry();

mixinRegistry
	.registerMixin(['h1', 'h2', 'h3', 'h4', 'h5', 'h6'], '@lucca-front/scss/src/components/title')
	.registerMixin({ loading: 'spinner' }, '@lucca-front/scss/src/commons/utils/loading')
	.registerMixin(['makeIcon'], '@lucca-front/icons/src/_mixins', 'icon')
	.registerMixin(
		{
			media_larger_than: 'largerThan',
			media_smaller_than: 'smallerThan',
		},
		'@lucca-front/scss/src/commons/utils/media',
	)
	.registerMixin(
		{
			listReset: 'list',
			buttonReset: 'button',
			definitionListReset: 'list($list: "dl")',
		},
		'@lucca-front/scss/src/commons/utils/reset',
	)
	.registerMixin(['mask'], '@lucca-front/scss/src/commons/utils/a11y');

export { mixinRegistry };
