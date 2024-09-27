import { STORE_KEYS } from './Storage';

// use localStorage to store the authority info, which might be sent from server in actual project.
export function getAuthority(str?: string): string | string[] {
	const authorityString =
		typeof str === 'undefined' && localStorage ? localStorage.getItem(STORE_KEYS.PERMISSION_KEYS) : str;
	// authorityString could be admin, "admin", ["admin"]
	let authority;
	try {
		if (authorityString) {
			authority = JSON.parse(authorityString);
		}
	} catch (e) {
		authority = authorityString;
	}
	if (typeof authority === 'string') {
		return [authority];
	}
	return authority;
}
