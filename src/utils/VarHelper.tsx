import { isValidPhoneNumber } from 'libphonenumber-js';
import { get } from 'lodash';
import moment from 'moment';
import querystring from 'querystring';
import url from 'url';

const COLORS_AVATAR_DEFAULT = [
	"#A36AEA",
	"#698BF8",
	"#40A9FF",
	"#26D6CF",
	"#57CE1C",
	"#FAAD14",
	"#FF7A45",
	"#FF5E5F",
	"#FF63B4",
	"#4DBD72"
];

function jwtDecode(jwt_string: string) {
	const dash_regex = /-/g;
	const lodash_regex = /_/g;

	const base64_url = jwt_string.split('.')[1];

	if (base64_url === undefined) return null;
	const base64 = base64_url.replace(dash_regex, '+').replace(lodash_regex, '/');
	return JSON.parse(Buffer.from(base64, 'base64').toString());
}

class VarHelper {
	moneyFormat = (num: number | string) => {
		if (!num) return '';
		const number = Number(num)
		return (Math.round(number * 100 + Number.EPSILON) / 100 || 0).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
	};

	waitDelay = (miliseconds: number) =>
		new Promise((resolve) => {
			setTimeout(() => {
				resolve(true);
			}, miliseconds);
		});

	formatGraphQLError = (message: string) => {
		return message.replace('GraphQL error:', '').replace('Network error:', '').trim();
	};

	validatePhoneVn = (str = '') => {
		let phone = str.trim().replace(/[^0-9+\-]/g, '');
		if (
			phone.length < 10 ||
			phone.length > 12 ||
			(phone.length === 10 && phone[0] !== '0') ||
			(phone.length === 12 && phone.slice(0, 3) !== '+84') ||
			(phone.length === 11 && phone.slice(0, 2) !== '84') ||
			str.length !== phone.length
		) {
			return false;
		}
		if (phone[0] === '0') return `+84${phone.slice(1)}`;
		if (phone[0] === '8' && phone[1] === '4') return `+${phone}`;

		return phone;
	};

	isAccessTokenExpired = (access_token: string) => {
		try {
			const decoded = jwtDecode(access_token);
			return decoded.exp <= moment().add(1, 'day').unix(); // prettier-ignore
		} catch (e) {
			return true;
		}
	};

	getDataFromDeepLink = (link: string) => {
		try {
			const url_parse = url.parse(link);
			if (url_parse.protocol === 'https:' && url_parse.host === 'app.acheckin.vn') {
				let queryObj = querystring.parse(url_parse?.query || '');
				if (queryObj && queryObj.link) return queryObj.link;
				return link;
			}
			return link;
		} catch (error) {
			return link;
		}
	};

	getUrlArrFromRes = (arr: any) => {
		if (!arr || !arr.length) return [];
		return arr.map((obj: any) => ({
			name: get(obj, 'response.data.name', get(obj, 'name', '')),
			path_download: get(obj, 'response.data.path', get(obj, 'url', '')),
		}));
	};

	getTimestampFromArr = (value: Array<string>) => {
		// @ts-ignore
		if (!value) return;
		let date = moment(value[0], 'YYYY-MM-DD HH:mm:ss');
		let time = moment(value[1], 'YYYY-MM-DD HH:mm:ss');
		date.set('hours', time.get('hours'))
			.set('minutes', time.get('minutes'))
			.set('seconds', time.get('seconds'));
		return date.valueOf();
	};

	fieldPropsDigit = {
		precision: 0,
		formatter: (value: any) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ','),
		parser: (value: any) => (value ? `${value}`.replace(/\$\s?|(,*)/g, '') : ''),
	};

	// Loại bỏ dấu chấm và dấu phẩy trong ProFormDigit
	fieldPropsDigitParser = {
		precision: 0,
		formatter: (value: any) => `${value}`.toString().replace('.', ','),
		parser: (value: any) => (value ? `${value}`.replace(/[^\w\-]+/g, '') : '')
	};

	noUndefinedPropObj = (obj: any) => {
		if (!obj) return {};
		let newObj = {};
		Object.keys(obj).map((prop) => {
			if (prop && obj[prop] !== undefined && obj[prop] !== null) newObj[prop] = obj[prop];
		});
		return newObj;
	};

	noNullPropObj = (obj: any) => {
		if (!obj) return {};
		let newObj = {};
		Object.keys(obj).map((prop) => {
			if (prop && obj[prop]) {
				if (typeof obj[prop] === 'string' && obj[prop].length > 0) newObj[prop] = obj[prop];
				if (typeof obj[prop] === 'number') newObj[prop] = obj[prop];
				if (typeof obj[prop] === 'object' && Object.keys(obj[prop]).length > 0)
					newObj[prop] = obj[prop];
			}
		});
		return newObj;
	};

	formatNumberDate = (value: number) => {
		if (!value) return '';
		return moment(value, 'YYYYMMDD').format('DD/MM/YYYY');
	};

	parseToNumberDate = (value: string) => {
		let _moment =
			value.indexOf('/') > 0 ? moment(value, 'DD/MM/YYYY') : moment(value, 'YYYY-MM-DD');
		return Number(_moment.format('YYYYMMDD'));
	};

	changeAlias = (txt: string) => {
		let str = String(txt);
		str = str.toLowerCase();
		str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
		str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
		str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
		str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
		str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
		str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
		str = str.replace(/đ/g, 'd');
		// str = str.replace(/ /g, '_');
		return str;
	};

	cleanUsername = (value: string) => {
		if (!value) return '';
		return this.changeAlias(value.trim().replace(/ /g, '').toLowerCase());
	};

	cleanWsDomain = (value: string) => {
		if (!value) return '';
		return this.changeAlias(
			value
				.trim()
				.replace(/[^a-zA-Z0-9]/g, '')
				.toLowerCase(),
		);
	};

	isEmailValid = (email: string) => {
		const re =
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(email.toLowerCase());
	};

	isPhoneValid = (phone: string) => {
		const re = /^\+?\(?([\d]{3,4})\)?[-.]?\(?([\d]{3})\)?[-.]?\(?([\d]{4})\)?$/;
		let _phone = this.validatePhoneVn(phone);
		return re.test(phone) && (isValidPhoneNumber(phone) || _phone);
	};

	stringToColour = (name?: string) => {
		if (name) {
			var colors = COLORS_AVATAR_DEFAULT
			if (name) {
				var hash = 0;
				if (name.length === 0) return hash;
				for (var i = 0; i < name.length; i++) {
					hash = name.charCodeAt(i) + ((hash << 5) - hash);
					hash = hash & hash;
				}
				hash = ((hash % colors.length) + colors.length) % colors.length;
				return colors[hash];
			}
		}
		return ''
	}

	initialsName = (name: string | undefined) => {
		if (name) {
			const rgx = new RegExp(/(\p{L}{1})\p{L}+/, 'gu');
			const nameMathch = [...name.matchAll(rgx)] || [];

			const initials = (
				(nameMathch.shift()?.[1] || '') + (nameMathch.pop()?.[1] || '')
			).toUpperCase();

			if (initials) {
				return initials;
			} else {
				const digitName = name.toString().substr(-2);
				return digitName;
			}
		}
		return '';
	};

	parseObjToArr = (obj: any) => {
		if (!obj || !Object.keys(obj).length) return [];
		let arr = [];
		for (let key in obj) {
			arr.push(obj[key]);
		}
		return arr;
	};

	arrayToDisplayString = (params: { data: any[], path: string, max?: number }) => {
		const { data, path, max } = params;
		if (!data) return '';
		let strArr = data.map((i: any) => path ? get(i, path) : i).filter(i => ['string', 'number'].includes(typeof i));
		let maxItem = max || 2
		let result = strArr.slice(0, maxItem).join(', ');
		if (strArr.length > maxItem) result += ' ...';
		return result;
	}

	setFieldsValue = (formRef: any, params: any) => {
		setTimeout(() => {
			return formRef?.current?.setFieldsValue(params)
		}, 100)
	}

	getFieldsValue = (formRef: any, params: any) => {
		setTimeout(() => {
			return formRef?.current?.getFieldValue(params)
		}, 100)
	}

	parserStringToNumber = (value: string) => {
		if (!value) return 0
		return Number(`${value}`.replace(/[^\w\-]+/g, ''))
	}

	employeeType = (formatMessage: any) => ({
		'TGD': formatMessage({ id: 'employee.TGD' }),
		'PTGD': formatMessage({ id: 'employee.PTGD' }),
		'BLD': formatMessage({ id: 'employee.BLD' }),
		'TK': formatMessage({ id: 'employee.TK' }),
		'VT': formatMessage({ id: 'employee.VT' }),
		'TH': formatMessage({ id: 'employee.TH' }),
		'NV': formatMessage({ id: 'employee.NV' }),
	});

	applicationTypes = (formatMessage: any) => ({
		'BAN_TRINH_TGD': 'Ban trình TGD, ban TGD phụ trách',
		'BAN_TRINH_PTGD': 'Ban trình PTGD phê duyệt',
		'BAN_TRINH_PTGD_TRINH_TGD': ' Ban trình PTGD, trình TGD phê duyệt',
		'BAN_TRINH_THANG_TGD': ' Ban trình thẳng TGD phê duyệt (Hợp công)',
		'BAN_TRINH_THANG_TGD_TRINH_HDTV': ' Ban trình thẳng TGD, trình HDTV/CT HDTV phê duyệt (Hợp công)',
		'BAN_TRINH_PTGD_TRINH_TGD_TRINH_HDTV': ' Ban trình PTGD, trình TGD, trình HDTV/CT HDTV phê duyệt',
		'BAN_TRINH_PTGD_TRINH_HDTV': ' Ban trình PTGD, trình HDTV phê duyệt'
	});

	statusType = (formatMessage: any) => ({
		'DANG_TRINH_PTGD': 'Đang trình PTGD',
		'DANG_TRINH_TGD': 'Đang trình TGD',
		'DANG_TRINH_HDTV_CT': 'Đang trình HDTV/CT HDTV',
		'DA_XU_LY': 'Đã xử lý',
		'TRA_SUA_CHUA_TRINH_LAI': 'Trả sửa - chưa trình lại',
		'TRA_SUA_DA_TRINH_LAI': 'Trả sửa - đã trình lại',
		'DONG': 'Đóng (Trả bỏ, không ký lại trình lại)'
	});
}

export default new VarHelper();
