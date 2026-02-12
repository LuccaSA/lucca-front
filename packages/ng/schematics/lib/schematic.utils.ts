import { TmplAstElement } from "@angular/compiler";
import { currentSchematicContext } from "./lf-schematic-context";

export function camelize(str: string): string {
	return str[0].toLowerCase() + str.slice(1);
}

export function pascalize(str: string): string {
	return str[0].toUpperCase() + str.slice(1);
}

export function expand(rawMapping: Record<string, string>, mappingProps?: Record<string, Record<string, string>>): Record<string, string> {
		const props = mappingProps || {};

		const replaceValue = (oldValue: string, map: string, newValue: string) => {
			return oldValue.replace(`{${map}}`, newValue).replace(`{${pascalize(map)}}`, pascalize(newValue));
		};

		return Object.fromEntries(
			Object.entries(rawMapping).flatMap(([oldTemplate, newTemplate]) => {
				const placeholders = [...oldTemplate.matchAll(/\{(\w*)}/g)].map(([, template]) => template);
				let values = [[oldTemplate, newTemplate]];

				for (const placeholder of placeholders) {
					const map = camelize(placeholder);

					if (!map || !(map in props)) {
						throw new Error(`No mapping for ${map} found`);
					}

					values = values.flatMap(([oldVal, newVal]) => Object.entries(props[map]).map(([key, value]) => [replaceValue(oldVal, map, key), replaceValue(newVal, map, value)]));
				}

				return values;
			})
		) as Record<string, string>;
	}

export function isInterestingNode(node: unknown): node is TmplAstElement {
	return node instanceof currentSchematicContext.angularCompiler.TmplAstElement;
}
