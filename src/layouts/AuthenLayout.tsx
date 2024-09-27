import { Col, Row } from 'antd';
import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { ConnectProps, history, useIntl } from 'umi';
import styles from './AuthenLayout.less';
import { STORE_KEYS } from '@/utils/Storage';
import { isEmpty } from 'lodash';

const LOGO_INFO = require('@/assets/info.png');

export type AuthenLayoutProps = {
	children: React.ReactNode
} & Partial<ConnectProps>;

const AuthenLayout: React.FC<AuthenLayoutProps> = (props) => {
	const { children } = props
	const { formatMessage } = useIntl()

	const userInfo = localStorage.getItem(STORE_KEYS.USER_TOKEN)
	if (!isEmpty(userInfo)) {
		history.replace('/')
	}

	return (
		// @ts-ignore
		<HelmetProvider>
			{/* @ts-ignore */}
			<Helmet>
				<title>{formatMessage({ id: "hrm.title" })}</title>
			</Helmet>

			<div className={styles.container}>
				<Row>
					<Col
						style={{
							backgroundImage: "url(\'/assets/bg.png\')",
						}}
						className={styles.rightImage}
						sm={10} xs={24}
					>
						<div className={styles.rightContentContainer}>
							<div className={styles.info}>
								<img src={LOGO_INFO} className={styles.image} />
							</div>
						</div>
					</Col>
					<Col sm={14} xs={24}>
						<div>
							{children}
						</div>
					</Col>
				</Row>
			</div>
		</HelmetProvider>
	);
};

export default AuthenLayout