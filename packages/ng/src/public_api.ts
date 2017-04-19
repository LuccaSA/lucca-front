// I totes copy pasted one of angular's file - lucienbertin
// https://github.com/angular/angular/blob/master/packages/core/public_api.ts

/**
 * @license
 * Copyright Lucca Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/LuccaSA/lucca-front/blob/master/LICENSE
 */

/**
 * @module
 * @description
 * Entry point for all public APIs of the ng package.
 */
export * from './index';

// This is a hack to prevent people from turning on strictNullChecks. See #15432
/* tslint:disable */
export declare interface ɵStrictNullChecksNotSupported {
	dontUseStrictNullChecksWithAngularYetSeeIssue15432: string|null;
	[key: string]: string;
}
