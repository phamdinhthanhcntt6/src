import Permission from '@/services/Permission';
import { IAuthority } from '@/services/types/Permission.type';
import React from 'react';
// eslint-disable-next-line import/no-cycle
import PromiseRender from './PromiseRender';

export type IAuthorityType =
	| undefined
	| string
	| string[]
	| Promise<boolean>
	| ((currentAuthority: string | string[]) => IAuthorityType);

/**
 * @en-US
 * General permission check method
 * Common check permissions method
 * @param {Permission judgment} authority
 * @param {Your permission | Your permission description} currentAuthority
 * @param {Passing components} target
 * @param {no pass components | no pass components} Exception
 * -------------------------------------------------------
 * @zh-CN
 * 通用权限检查方法 Common check permissions method
 *
 * @param { 权限判定 | Permission judgment } authority
 * @param { 你的权限 | Your permission description } currentAuthority
 * @param { 通过的组件 | Passing components } target
 * @param { 未通过的组件 | no pass components } Exception
 */
const checkPermissions = <T, K>(
	authority: IAuthorityType,
	currentAuthority: IAuthority,
	target: T,
	Exception: K,
): T | K | React.ReactNode => {
	// No judgment permission. View all by default
	// Retirement authority, return target;
	if (!authority || currentAuthority?.OWNER || currentAuthority?.SUPER_ADMIN) {
		return target;
	}
	// Array processing
	if (Array.isArray(authority)) {
		if (currentAuthority && Object.keys(currentAuthority).length) {
			if (Object.keys(currentAuthority).some((item) => authority.some((d) => {
				let perKey, action;
				if (d.indexOf('.')) {
					perKey = d.split('.')[0];
					action = d.split('.')[1];
				} else {
					perKey = d;
				}
				if (action) return item === perKey && !!currentAuthority[item][action]
				return item === perKey && !!currentAuthority[item]
			}))) {
				return target;
			}
		}
		return Exception;
	}
	// Deal with promise
	if (authority instanceof Promise) {
		return <PromiseRender<T, K> ok={target} error={Exception} promise={authority} />;
	}
	// Deal with function
	// if (typeof authority === 'function') {
	// 	const bool = authority(currentAuthority);
	// 	// The return value after the function is executed is Promise
	// 	if (bool instanceof Promise) {
	// 		return <PromiseRender<T, K> ok={target} error={Exception} promise={bool} />;
	// 	}
	// 	if (bool) {
	// 		return target;
	// 	}
	// 	return Exception;
	// }
	throw new Error('unsupported parameters');
};

export { checkPermissions };

function check<T, K>(authority: IAuthorityType, target: T, Exception: K): T | K | React.ReactNode {
	let currentPermission = Permission.getAuthority();
	return checkPermissions<T, K>(authority, currentPermission, target, Exception);
}

export default check;
