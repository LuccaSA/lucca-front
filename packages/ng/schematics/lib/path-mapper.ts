import { Tree } from '@angular-devkit/schematics';
import { expand } from "./schematic.utils";

interface Mappings {
	paths: Record<string, string>;
}

export class PathMapper {
	private mappings: Mappings = {
		paths: expand(this.rawMappings.paths, this.mappingProps),
	}

	constructor(
			private tree: Tree,
			private rawMappings: Mappings,
			private mappingProps?: Record<string, Record<string, string>>
		) {
		}

		run() {
			console.log(this.mappings.paths);
		}
}
