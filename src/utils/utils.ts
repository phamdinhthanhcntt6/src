import { notification } from 'antd';
import { get, sample } from 'lodash';
import moment, { Moment } from 'moment';
import { parseDomain } from 'parse-domain';
import { parse } from 'querystring';

/* eslint no-useless-escape:0 import/prefer-default-export:0 */
const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;

export const isUrl = (path: string): boolean => reg.test(path);

export const isAntDesignPro = (): boolean => {
	if (ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site') {
		return true;
	}
	return window.location.hostname === 'preview.pro.ant.design';
};

// For the official demo site, it is used to turn off features that are not needed in the real development environment
export const isAntDesignProOrDev = (): boolean => {
	const { NODE_ENV } = process.env;
	if (NODE_ENV === 'development') {
		return true;
	}
	return isAntDesignPro();
};

export const getPageQuery = () => parse(window.location.href.split('?')[1]);

export const IS_DEV = process.env.NODE_ENV === 'development';

export const getCurrentWorkspace = () => { // deprecated
	const origindomain: Array<string> = get(parseDomain(window.location.host), 'subDomains', ['kalvin', 'dev']);
	return origindomain.join('.');
}

export const alias = (alias: string) => {
	if (!alias) return '';

	var str = alias;
	str = str.toLowerCase();
	str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
	str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
	str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
	str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
	str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
	str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
	str = str.replace(/đ/g, "d");
	// str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|$|_/g, "");
	str = str.replace(/-+-/g, "-"); //replace 2- to 1-
	// str = str.replace(/^\-+|\-+$/g, "");
	str = str.replace(/\s/g, ''); //remove whitespace
	return str;
}

export const getDatesInRange = (startDate: Moment, endDate: Moment, type: 'days' | 'hours') => {
	let diff = endDate.diff(startDate, type)
	let range = []
	for (let i = 0; i <= diff; i++) {
		range.push(moment(startDate).add(i, type))
	}
	return range
}

export const getRandomColor = () => {
	const colors = ['#f5222d', '#fa541c', '#fa8c16', '	#faad14', '#fadb14', '#a0d911', '#52c41a', '#13c2c2', '#1890ff', '#1890ff', '#2f54eb', '#722ed1', '#eb2f96']

	return sample(colors)
}

export const weekOfMonth = (m: Moment) => {
	return Math.ceil(m.date() / 7)
}

export const WEEK_DAYS = (formatMessage: any) => [
	{ title: formatMessage({ id: "meeting_room_calendar.on_1" }), isoWeekDay: 1 },
	{ title: formatMessage({ id: "meeting_room_calendar.on_2" }), isoWeekDay: 2 },
	{ title: formatMessage({ id: "meeting_room_calendar.on_3" }), isoWeekDay: 3 },
	{ title: formatMessage({ id: "meeting_room_calendar.on_4" }), isoWeekDay: 4 },
	{ title: formatMessage({ id: "meeting_room_calendar.on_5" }), isoWeekDay: 5 },
	{ title: formatMessage({ id: "meeting_room_calendar.on_6" }), isoWeekDay: 6 },
	{ title: formatMessage({ id: "meeting_room_calendar.on_7" }), isoWeekDay: 7 },
]

export const notificationMessage = (type: "success" | "info" | "warning" | "error", message: string) => {
	notification[type]({ message: message, duration: 2 })
}

