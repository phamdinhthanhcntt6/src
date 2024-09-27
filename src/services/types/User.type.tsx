export interface IRegisterParams {
	username?: string,
	phone_number?: string,
	email?: string,
	password?: string,
	otp_token?: string,
	otp_verify_token?: string,
}

export interface IRegisterRes {
	id: string,
	username: string
	phone_number?: string,
	password?: string,
	salt?: string,
	acheckin_user_id?: string,
	is_active?: Boolean,
	created_at?: string, // YYYY-MM-DD
	updated_at?: string, // YYYY-MM-DD
}
export interface ILoginParams {
	password?: string,
}

export interface IUserType {
	id: string;
	username: string;
	phone_number: string;
	email: string;
}

export interface IIdUserType {
	access_token: string,
	refresh_token: string,
	user_data: IUserType,
}
