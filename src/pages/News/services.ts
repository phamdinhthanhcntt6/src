import RequestHelper from "@/utils/RequestHelper";
import VarHelper from "@/utils/VarHelper";
import { get } from "lodash";
import { IDataFormNews, IQueryNewsParam } from "./data";

export async function queryListNews(params: IQueryNewsParam) {
	let current = params?.current || 1;
	let pageSize = params?.pageSize || 10;
	let res = await RequestHelper.get({
		url: '/v1/cms/news/list',
		data: VarHelper.noUndefinedPropObj({
			offset: (current - 1) * pageSize,
			limit: pageSize,
			keyword: params.keyword || undefined,
		})
	})

	let data = get(res, 'data.rows', []);
	let total = get(res, 'data.count', 0);

	return {
		current,
		data,
		pageSize,
		success: true,
		total,
	}
}

export const onCreateNews = async (data: IDataFormNews) => {
	const res = await RequestHelper.post({
		url: "/v1/cms/news/create",
		data
	})
	return res
}

export const onUpdateNews = async (data: IDataFormNews) => {
	const res = await RequestHelper.post({
		url: '/v1/cms/news/update',
		data,
	})
	return res
}

export const onDeleteNews = async (id: string) => {
	const res = await RequestHelper.delete({
		url: '/v1/cms/news/delete',
		data: { id }
	})
	return res
}

export const getDetailNews = async (id: string) => {
	const res = await RequestHelper.get({
		url: '/v1/cms/news/detail',
		data: { id }
	})
	return res
}