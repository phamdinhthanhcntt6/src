import React from 'react';
import { ConnectState } from "@/models/connect"
import { connect } from "umi"
import type { Dispatch } from 'umi';
import { IAuthority } from "@/services/types/Permission.type";
import Permission from '@/services/Permission';
import { Result } from 'antd';

interface Props {
	dispatch: Dispatch;
	permissions: IAuthority,
	children: any,
	showNoPermission?: boolean
}
const PermissionCheck: React.FC<Props> = (props) => {
	if (Permission.hasPermission({
		key: props.permissionKey,
		action: props.action,
		permissions: props.permissions
	})) {
		return props.children;
	}
	if (props.showNoPermission) {
		return (
			<Result
				status={403}
				title="403"
				subTitle="Sorry, you are not authorized to access this page."
			/>
		);
	} else return null
}

export default connect(({ user }: ConnectState) => ({
	permissions: user.permissions,
}))(PermissionCheck)
