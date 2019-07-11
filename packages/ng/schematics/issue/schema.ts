import { IOptions } from '../schema';

export interface IIssueOptions extends IOptions {
	prefix?: string;
	proxy?: boolean;
}
