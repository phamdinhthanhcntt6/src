import { STORE_KEYS } from '@/utils/Storage';
import { isEmpty } from 'lodash';
import React from 'react';
import { history } from 'umi';
interface Props {
	children: React.ReactNode
}

const SecurityLayout: React.FC<Props> = (props) => {
	const { children } = props;
	const userInfo = localStorage.getItem(STORE_KEYS.USER_TOKEN)

	if (isEmpty(userInfo)) {
		history.replace('/user/login')
	}

	return (
		<div>
			{children}
		</div>
	);
};

export default SecurityLayout