export interface IQueryNewsParam {
	current?: number,
	pageSize?: number,
	sorter?: any,
	filter?: any,
	keyword?: string
}

export interface IDataNews {
	[anyProps: string]: any
}

export interface IDataFormNews {
	id?: string;
	title: string;
	description?: string;
	content?: string;
	image?: string;
	url?: string;
}