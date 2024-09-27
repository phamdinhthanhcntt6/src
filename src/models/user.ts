import { IAuthority } from '@/services/types/Permission.type';
import { IIdUserType, IUserType } from '@/services/types/User.type';
import User from '@/services/User';
import type { Effect, Reducer } from 'umi';

export type CurrentIDUserInfo = {
	avatar?: string;
	id?: string;
	is_anonymous?: boolean;
	name?: string,
	phone_number?: string;
	sex?: string,
}

export type WorkspaceSubscription = {
	expire_date?: number;
	is_show_message_cms?: boolean;
	remaining_date?: number;
	subscription_package?: string
}

export type CurrentUser = IUserType;

export type UserModelState = {
	currentUser?: CurrentUser;
	permissions: IAuthority;
	workspaceSubscription?: WorkspaceSubscription
};

export type UserModelType = {
	namespace: 'user';
	state: UserModelState;
	effects: {
		fetchCurrent: Effect;
	};
	reducers: {
		saveCurrentUser: Reducer<UserModelState>;
	};
};

const UserModel: UserModelType = {
	namespace: 'user',

	state: {
		currentUser: {
			id: undefined,
			username: undefined,
			phone_number: undefined,
			email: undefined,
		},
		permissions: {},
		workspaceSubscription: {}
	},

	effects: {
		*fetchCurrent(_, { call, put }) {
			const info: IIdUserType = yield call(User.getCurrentUser);
			yield put({
				type: 'saveCurrentUser',
				payload: info,
			});
		},
	},

	reducers: {
		saveCurrentUser(state, action) {
			return {
				...state,
				currentUser: action.payload?.user_data,
				permissions: action.payload?.permissions || {},
			};
		},
	},
};

export default UserModel;
