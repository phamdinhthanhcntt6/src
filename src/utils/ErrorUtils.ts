import { get } from 'lodash';
import { getLocale } from 'umi';

class ErrorUtils {
	parseError = (error: any) => {
		return get(error, 'message', getLocale() !== 'vi-VN' ? 'Some thing went wrong' : 'Đã có lỗi xảy ra');
	}
}

export default new ErrorUtils;
