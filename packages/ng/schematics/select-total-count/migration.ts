import {
	ClassDeclaration,
	ClassElement,
	createSourceFile,
	GetAccessorDeclaration,
	isArrayLiteralExpression,
	isCallExpression,
	isClassDeclaration,
	isDecorator,
	isGetAccessor,
	isIdentifier,
	isObjectLiteralExpression,
	isPropertyAssignment,
	isPropertyDeclaration,
	Modifier,
	ModifierLike,
	Node,
	PropertyDeclaration,
	ScriptTarget,
	SourceFile,
	SyntaxKind,
} from 'typescript';
import { currentSchematicContext, FileUpdate, updateContent } from '../lib';

const memberName = 'totalCount$';

/**
 * Base classes whose `totalCount$` used to be abstract. Any of them can be extended by a consumer
 * directive, which now has to mark the member with `override`.
 */
const coreSelectApiBaseClasses = [
	'ALuCoreSelectApiDirective',
	'LuCoreSelectApiV3Directive',
	'LuCoreSelectApiV4Directive',
	'LuCoreSelectDepartmentsDirective',
	'LuCoreSelectEstablishmentsDirective',
	'LuCoreSelectJobQualificationsDirective',
	'LuCoreSelectLegalUnitsDirective',
	'LuCoreSelectOccupationCategoriesDirective',
	'LuCoreSelectUsersDirective',
];

/** Injection token through which `withSelectAll` reads the count — the only consumer of the member. */
const totalCountProviderToken = 'CORE_SELECT_API_TOTAL_COUNT_PROVIDER';

/** Initializers a directive writes when it has no count to give and only needs the class to compile. */
const placeholderInitializers = ['NEVER', 'EMPTY', 'of()', 'of(0)'];

/** Modifiers that must stay before `override`, per the modifier order TypeScript enforces. */
const modifiersBeforeOverride = [SyntaxKind.PublicKeyword, SyntaxKind.PrivateKeyword, SyntaxKind.ProtectedKeyword, SyntaxKind.StaticKeyword];

export function migrateTotalCount(path: string, content: string, detectUnused = false): string {
	// Parent nodes are needed to read a member name and to locate the `get` keyword of an accessor.
	const sourceFile = createSourceFile(path, content, ScriptTarget.ESNext, true);

	return updateContent(content, (updates) => {
		collectCoreSelectApiClasses(sourceFile).forEach((declaration) => {
			declaration.members
				.filter((member): member is TotalCountMember => isTotalCountMember(sourceFile, member))
				.forEach((member) => {
					if (!hasOverride(member)) {
						updates.push(addOverrideUpdate(sourceFile, member));
					}

					if (detectUnused && isPlaceholder(sourceFile, declaration, member)) {
						reportPlaceholder(path, declaration);
					}
				});
		});
	});
}

/**
 * Report a `totalCount$` that exists only to satisfy the formerly abstract member, so it can be
 * deleted now that it is optional. Only what the file itself shows is taken into account: a directive
 * read from another file is out of reach, hence the wording — this is a lead, not a verdict.
 */
function reportPlaceholder(path: string, declaration: ClassDeclaration): void {
	const className = declaration.name?.text ?? 'default export';

	currentSchematicContext.warn(`${path}: ${className}.${memberName} looks like a placeholder and nothing in this file reads it — it can probably be removed.`);
}

/**
 * A placeholder is a member initialized with an empty observable, in a directive that does not expose
 * itself as the count provider, and that nothing else in the file mentions.
 */
function isPlaceholder(sourceFile: SourceFile, declaration: ClassDeclaration, member: TotalCountMember): boolean {
	if (!isPropertyDeclaration(member) || !member.initializer || !placeholderInitializers.includes(member.initializer.getText(sourceFile))) {
		return false;
	}

	return !providesTotalCountToken(sourceFile, declaration) && !isMemberReferenced(declaration);
}

/** Whether the class declares itself as `CORE_SELECT_API_TOTAL_COUNT_PROVIDER` in its decorator. */
function providesTotalCountToken(sourceFile: SourceFile, declaration: ClassDeclaration): boolean {
	const modifiers: readonly ModifierLike[] = declaration.modifiers ?? [];

	return modifiers.filter(isDecorator).some((decorator) => {
		const argument = isCallExpression(decorator.expression) ? decorator.expression.arguments[0] : undefined;

		if (!argument || !isObjectLiteralExpression(argument)) {
			return false;
		}

		return argument.properties
			.filter(isPropertyAssignment)
			.filter((property) => isIdentifier(property.name) && property.name.text === 'providers')
			.map((property) => property.initializer)
			.filter(isArrayLiteralExpression)
			.some((providers) => providers.getText(sourceFile).includes(totalCountProviderToken));
	});
}

/** Whether the class reads its own member anywhere, its declaration aside. */
function isMemberReferenced(declaration: ClassDeclaration): boolean {
	let referenced = false;

	const visit = (node: Node): void => {
		if (isIdentifier(node) && node.text === memberName && !isMemberDeclarationName(node)) {
			referenced = true;
		}

		node.forEachChild(visit);
	};

	declaration.forEachChild(visit);

	return referenced;
}

function isMemberDeclarationName(node: Node): boolean {
	const parent = node.parent;

	return !!parent && (isPropertyDeclaration(parent) || isGetAccessor(parent)) && parent.name === node;
}

/**
 * Classes extending a core select API directive, including those extending another class of the same
 * file — a consumer commonly declares its own intermediate base. Chains crossing files are out of
 * reach here (the schematic runs without a type checker) and have to be migrated by hand.
 */
function collectCoreSelectApiClasses(sourceFile: SourceFile): ClassDeclaration[] {
	const declarations = sourceFile.statements.filter(isClassDeclaration);
	const baseClasses = new Set(coreSelectApiBaseClasses);
	const matching: ClassDeclaration[] = [];

	// Iterate until nothing new matches: a class can be declared before the one it extends.
	let foundNewClass = true;

	while (foundNewClass) {
		foundNewClass = false;

		declarations
			.filter((declaration) => !matching.includes(declaration) && baseClasses.has(getBaseClassName(declaration)))
			.forEach((declaration) => {
				matching.push(declaration);
				foundNewClass = true;

				if (declaration.name) {
					baseClasses.add(declaration.name.text);
				}
			});
	}

	return matching;
}

function getBaseClassName(declaration: ClassDeclaration): string {
	const extendsClause = declaration.heritageClauses?.find((clause) => clause.token === SyntaxKind.ExtendsKeyword);
	const expression = extendsClause?.types[0]?.expression;

	return expression && 'text' in expression ? (expression.text as string) : '';
}

type TotalCountMember = PropertyDeclaration | GetAccessorDeclaration;

function isTotalCountMember(sourceFile: SourceFile, member: ClassElement): member is TotalCountMember {
	if (!isPropertyDeclaration(member) && !isGetAccessor(member)) {
		return false;
	}

	return member.name.getText(sourceFile) === memberName;
}

function hasOverride(member: TotalCountMember): boolean {
	return getModifiers(member).some((modifier) => modifier.kind === SyntaxKind.OverrideKeyword);
}

function addOverrideUpdate(sourceFile: SourceFile, member: TotalCountMember): FileUpdate {
	const modifiers = getModifiers(member);
	const modifiersKeptBefore = modifiers.filter((modifier) => modifiersBeforeOverride.includes(modifier.kind));
	const lastModifierBeforeOverride = modifiersKeptBefore[modifiersKeptBefore.length - 1];

	// `public` (or `static`) keeps its place and `override` follows it.
	if (lastModifierBeforeOverride) {
		return { position: lastModifierBeforeOverride.end, oldContent: '', newContent: ' override' };
	}

	// Without them, `override` opens the declaration: before `readonly`, before the `get` of an
	// accessor, or before the member name.
	const anchor = modifiers.find((modifier) => !modifiersBeforeOverride.includes(modifier.kind)) ?? getKeyword(sourceFile, member) ?? member.name;

	return { position: anchor.getStart(sourceFile), oldContent: '', newContent: 'override ' };
}

function getKeyword(sourceFile: SourceFile, member: TotalCountMember): Node | undefined {
	return isGetAccessor(member) ? member.getChildren(sourceFile).find((child) => child.kind === SyntaxKind.GetKeyword) : undefined;
}

function getModifiers(member: TotalCountMember): Modifier[] {
	// Decorators share the `modifiers` array with the real modifiers; only the latter drive the placement.
	const modifiers: readonly ModifierLike[] = member.modifiers ?? [];

	return modifiers.filter((modifier): modifier is Modifier => !isDecorator(modifier));
}
