import RequestHelper from "@/utils/RequestHelper";
import Storage, { STORE_KEYS } from "@/utils/Storage";
import { IIdUserType } from './types/User.type';

class AuthenStore {
	logout = async () => {
		Storage.clear();
		RequestHelper.setToken('');
	}

	refreshToken = async () => {
		let data: IIdUserType = Storage.get(STORE_KEYS.USER_ID_INFO);
		const { refresh_token } = data

		let res = await RequestHelper.post({
			url: '/v1/external/auth/refresh-token',
			data: { refresh_token },
		})

		if (res && res.data) {
			let data = res.data as IIdUserType
			Storage.set(STORE_KEYS.USER_ID_INFO, data)
			return data
		} else {
			throw new Error(res.data.message)
		}
	}

	getCurrentUser = () => {
		let data: IIdUserType = Storage.get(STORE_KEYS.USER_ID_INFO);
		if (!data?.access_token) return false;
		try {
			RequestHelper.setToken(data.access_token);
			return data;
		} catch (error) {
			return false;
		}
	}
}

export default new AuthenStore;
