/* eslint-disable eslint-comments/disable-enable-pair */

import { IAuthority } from "@/services/types/Permission.type";

/* eslint-disable import/no-mutable-exports */
let CURRENT: IAuthority;

const renderAuthorize = <T>(Authorized: T): ((currentAuthority: IAuthority) => T) => (
	currentAuthority: IAuthority,
): T => {
	CURRENT = currentAuthority || {};
	return Authorized;
};

export { CURRENT };
export default <T>(Authorized: T) => renderAuthorize<T>(Authorized);
