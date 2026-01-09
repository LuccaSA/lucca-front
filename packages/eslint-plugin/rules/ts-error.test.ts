import * as parser from '@typescript-eslint/parser';
import { RuleTester } from '@typescript-eslint/rule-tester';
import rule, { RULE_NAME } from './ts-error';

/**
 * Test suite for TypeScript Error Detection & Auto-Fix rule
 *
 * 🔍 TypeScript Error Codes Reference:
 *
 * 📘 Null/Undefined Safety (Strict Mode):
 * - TS2532: Object is possibly 'undefined'
 * - TS2533: Object is possibly 'null'
 * - TS2531: Object is possibly 'null' or 'undefined'
 * - TS18048: 'X' is possibly 'undefined'
 * - TS18047: 'X' is possibly 'null'
 * - TS18049: 'X' is possibly 'null' or 'undefined'
 * - TS2722: Cannot invoke an object which is possibly 'undefined'
 *
 * 📙 Runtime & Structure:
 * - TS2339: Property 'X' does not exist on type 'Y'
 * - TS2571: Object is of type 'unknown'
 * - TS2540: Cannot assign to 'X' because it is a read-only property
 * - TS2554: Expected X arguments, but got Y
 * - TS2393: Duplicate function implementation
 * - TS2304: Cannot find name 'X'
 * - TS2322: Type 'X' is not assignable to type 'Y'
 * - TS2345: Argument of type 'X' is not assignable to parameter of type 'Y'
 */

// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
const ruleTester = new RuleTester({
	languageOptions: {
		parser,
		parserOptions: {
			projectService: { allowDefaultProject: ['*.ts*'] },
		},
	},
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
} as any);

ruleTester.run(RULE_NAME, rule, {
	valid: [
		// ✅ Valid TypeScript code - no errors expected
		{
			name: '✅ Basic property access on non-optional',
			code: `
interface User { userName: string; }
const user: User = { userName: 'John' };
const userName = user.userName;
      `,
		},
		{
			name: '✅ Optional chaining already used',
			code: `
interface User { profile?: { userName: string; }; }
const user: User = {};
const userName = user.profile?.userName;
      `,
		},
		{
			name: '✅ Array access',
			code: `
const arr: number[] = [1, 2, 3];
const first = arr[0];
      `,
		},
		{
			name: '✅ Guard check with if statement',
			code: `
interface User { profile?: { name: string } }
function fn(user: User) {
  if (user.profile) return user.profile.name;
  return '';
}
      `,
		},
		{
			name: '✅ Logical AND for safe access',
			code: `
interface User { profile?: { name: string } }
function fn(user: User) {
  return user.profile && user.profile.name;
}
      `,
		},
	],
	invalid: [
		// TS2322: Type mismatch
		{
			name: '❌ Type mismatch - string assigned to number',
			code: `const myValue: string = 123;`,
			errors: [{ messageId: 'tsError' }],
		},
		// TS2339: Property does not exist
		{
			name: '❌ Property does not exist on type',
			code: `
interface User { userName: string; }
const user: User = { userName: 'John' };
const age = user.age;
      `,
			errors: [{ messageId: 'tsError' }],
		},
		// TS2304: Cannot find name
		{
			name: '❌ Undefined variable (TS2304)',
			code: `const x = unknownVariable;`,
			errors: [{ messageId: 'tsError' }],
		},
		// TS2345: Argument type not assignable
		{
			name: '❌ Argument type not assignable (TS2345)',
			code: `
function takesNumber(n: number) { return n; }
takesNumber("string");
      `,
			errors: [{ messageId: 'tsError' }],
		},
		// TS2554: Wrong number of arguments
		{
			name: '❌ Missing required argument (TS2554)',
			code: `
function requiresArg(x: string) { return x; }
requiresArg();
      `,
			errors: [{ messageId: 'tsError' }],
		},
		// TS2393: Duplicate function implementation
		{
			name: '❌ Duplicate function (TS2393)',
			code: `
function duplicate() { return 1; }
function duplicate() { return 2; }
      `,
			errors: [{ messageId: 'tsError' }, { messageId: 'tsError' }],
		},
		// TS2540: Read-only property
		{
			name: '❌ Cannot assign to readonly (TS2540)',
			code: `
interface User { readonly name: string }
const user: User = { name: 'John' };
user.name = 'Jane';
      `,
			errors: [{ messageId: 'tsError' }],
		},
		// TS2571: Object is of type unknown
		{
			name: '❌ Object is of type unknown (TS2571)',
			code: `
const data: unknown = {};
const value = data.someProperty;
      `,
			errors: [{ messageId: 'tsError' }],
		},
	],
});
