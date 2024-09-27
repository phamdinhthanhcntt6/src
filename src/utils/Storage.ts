export const STORE_KEYS = {
	USER_TOKEN: 'USER_TOKEN',
	USER_ID_INFO: 'USER_ID_INFO',
	DEV_HOST: 'DEV_HOST',
	PERMISSION_KEYS: 'PERMISSION_KEYS',
	UMI_LOCALE: 'umi_locale',
}

class Storage {
	get = (key: string) => {
		let data: any = localStorage.getItem(key);
		try {
			data = JSON.parse(data);
			return data;
		} catch (error) {
			return data;
		}
	}
	set = (key: string, value: any) => {
		return localStorage.setItem(key, typeof value === 'object' ? JSON.stringify(value) : value);
	}
	remove = (key: string) => {
		return localStorage.setItem(key, '');
	}
	clear = () => localStorage.clear();
}

export default new Storage;
