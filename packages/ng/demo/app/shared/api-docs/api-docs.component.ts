import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import docs from '../../../api-docs';
import {
	PropertyDesc,
	DirectiveDesc,
	ModuleDesc,
	InputDesc,
	MethodDesc,
	ClassDesc,
	signature,
} from './api-docs.model';

/**
 * Displays the API docs of a directive.
 *
 * The default values of its inputs are looked for in the directive api doc itself, or in the matching property
 * of associated Config service, if any.
 *
 * The config service of a directive NgbFoo is, by convention, named NgbFooConfig.
 */
@Component({
	selector: 'demo-api-docs',
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: './api-docs.component.html',
	styleUrls: ['./api-docs.style.scss'],
})
export class DemoApiDocs {
	/**
	 * Object which contains, for each input name of the directive, the corresponding property of the associated config
	 * service (if any)
	 */
	private _configProperties: { [propertyName: string]: PropertyDesc };

	apiDocs: DirectiveDesc;
	configServiceName: string;

	moduleDoc: ModuleDesc;
	moduleDocList: string[];
	constructor() {}

	@Input()
	set directive(directiveName: string) {
		this.apiDocs = docs[directiveName];
		const declarationModule = Object.keys((<any>docs))
			.map(key => docs[key])
			.find(declaration => declaration.className.indexOf('Module') !== -1
			&& declaration.declarations.indexOf(directiveName) !== -1);
		if (declarationModule) {
			this.moduleDoc = declarationModule;
			this.moduleDocList = this.getAllDeclaredModules(declarationModule);
		}
		this.configServiceName = `${directiveName}Config`;
		const configApiDocs = docs[this.configServiceName];
		this._configProperties = {};
		if (configApiDocs) {
			this.apiDocs.inputs.forEach(
				input =>
					(this._configProperties[input.name] = this._findInputConfigProperty(
						configApiDocs,
						input,
					)),
			);
		}
	}

	getAllDeclaredModules(currentModule: ModuleDesc): string[] {
		const moduleList = [];
		let currentModuleName = currentModule.className;
		while (currentModuleName) {
			const exportModule = Object.keys((<any>docs))
			.map(key => docs[key])
			.find(declaration => declaration.className.indexOf('Module') !== -1
			&& declaration.exports
			&& declaration.exports.indexOf(currentModuleName) !== -1);
			if (!!exportModule) {
				moduleList.push(exportModule.className);
			}
			currentModuleName = !!exportModule ? exportModule.className : null;
		}
		return moduleList.reverse();
	}

	/**
	 * Returns the default value of the given directive input by first looking for it in the matching config service
	 * property. If there is no matching config property, it reads it from the input.
	 */
	defaultInputValue(input: InputDesc): string {
		const configProperty = this._configProperties[input.name];
		return configProperty ? configProperty.defaultValue : input.defaultValue;
	}

	/**
	 * Returns true if there is a config service property matching with the given directive input
	 */
	hasConfigProperty(input: InputDesc): boolean {
		return !!this._configProperties[input.name];
	}

	methodSignature(method: MethodDesc): string {
		return signature(method);
	}

	filterPublic<T extends PropertyDesc | MethodDesc>(values: T[]): T[] {
		return values && values.length > 0
			? values.filter(desc => {
					return !desc.name.startsWith('_');
			  })
			: [];
	}
	private _findInputConfigProperty(
		configApiDocs: ClassDesc,
		input: InputDesc,
	): PropertyDesc {
		return configApiDocs.properties.filter(prop => prop.name === input.name)[0];
	}
}
