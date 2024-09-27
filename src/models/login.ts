import Storage from '@/utils/Storage';
import { getPageQuery } from '@/utils/utils';
import type { Effect } from 'umi';
import { history } from 'umi';

export type StateType = {
	status?: 'ok' | 'error';
	type?: string;
	currentAuthority?: 'user' | 'guest' | 'admin';
};

export type LoginModelType = {
	namespace: string;
	state: StateType;
	effects: {
		logout: Effect;
	};
	reducers: {
	};
};

const Model: LoginModelType = {
	namespace: 'login',

	state: {
		status: undefined,
	},

	effects: {
		logout({ }, { call, put }) {
			const { redirect } = getPageQuery();
			setTimeout(() => {
				if (window.location.pathname !== '/user/login' && !redirect) {
					Storage.clear();
					history.replace({
						pathname: '/user/login',
					});
				}
			}, 100)
		},
	},

	reducers: {
	},
};

export default Model;
