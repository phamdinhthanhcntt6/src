import { STORE_KEYS } from "@/utils/Storage";
import { IAuthority } from "./types/Permission.type";

class PermissionStore {
	userPermissions: IAuthority = {};
	defaultPermission = [];

	constructor() {
		this.getAuthority();
	}

	getAuthority = () => {
		const authorityString = localStorage.getItem(STORE_KEYS.PERMISSION_KEYS)
		let authority;
		try {
			if (authorityString) {
				authority = JSON.parse(authorityString);
			}
		} catch (e) {
			authority = authorityString;
		}
		this.userPermissions = authority as IAuthority;
		return this.userPermissions;
	}

	hasPermission = (params: any) => true;
}

export default new PermissionStore;
