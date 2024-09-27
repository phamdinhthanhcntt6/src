import RightContent from '@/components/GlobalHeader/RightContent';
import type { ConnectState } from '@/models/connect';
import Authorized from '@/utils/Authorized';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import type {
	MenuDataItem,
	BasicLayoutProps as ProLayoutProps,
	Settings
} from '@ant-design/pro-layout';
import ProLayout from '@ant-design/pro-layout';
import { Image } from 'antd';
import React, { useRef, useState } from 'react';
import type { Dispatch } from 'umi';
import { Link, connect, history, useIntl } from 'umi';
import LOGO_CMS from '../assets/logo.png';
import styles from './BasicLayout.less';

export type BasicLayoutProps = {
	breadcrumbNameMap: Record<string, MenuDataItem>;
	route: ProLayoutProps['route'] & {
		authority: string[];
	};
	settings: Settings;
	dispatch: Dispatch;
} & ProLayoutProps;

export type BasicLayoutContext = { [K in 'location']: BasicLayoutProps[K] } & {
	breadcrumbNameMap: Record<string, MenuDataItem>;
};

const menuDataRender = (menuList: MenuDataItem[]): MenuDataItem[] =>
	menuList.map((item) => {
		const localItem = {
			...item,
			routes: item.routes ? menuDataRender(item.routes) : undefined,
			children: item.children ? menuDataRender(item.children) : undefined,
		};
		return Authorized.check(item.authority, localItem, null) as MenuDataItem;
	});

const BasicLayout: React.FC<BasicLayoutProps> = (props) => {
	const {
		children,
		settings,
		location = {
			pathname: '/',
		},
	} = props;
	const { formatMessage } = useIntl()
	const menuDataRef = useRef<MenuDataItem[]>([])
	const [collapseName, setCollapseName] = useState<boolean>(false)

	const onClickCollapsed = () => {
		setCollapseName(!collapseName)
	}

	const menuHeaderRender = () => {
		return (
			<div className={styles.headerMenu}>
				{!collapseName && <Image src={LOGO_CMS} onClick={() => history.push('/')} preview={false} className={styles.imageLogo} />}
				<div className={styles.collapseMenu}
					style={{ right: collapseName ? "50%" : "10%", marginTop: collapseName ? 5 : 0 }}
					onClick={onClickCollapsed}
				>
					{collapseName
						? <MenuUnfoldOutlined className={styles.colorWhite} />
						: <MenuFoldOutlined className={styles.colorWhite} />}
				</div>
			</div>
		)
	}

	return (
		<ProLayout
			{...props}
			{...settings}
			className="basic-layout"
			siderWidth={256}
			formatMessage={formatMessage}
			collapsed={collapseName}
			fixedHeader
			collapsedButtonRender={false}
			menuItemRender={(menuItemProps, defaultDom) => {
				if (
					menuItemProps.isUrl ||
					!menuItemProps.path ||
					location.pathname === menuItemProps.path
				) {
					return defaultDom;
				}
				return <Link to={menuItemProps.path}>{defaultDom}</Link>;
			}}
			breadcrumbRender={(routers = []) => [
				{
					path: '/',
					breadcrumbName: formatMessage({ id: 'menu.home' }),
				},
				...routers,
			]}
			itemRender={(route, params, routes, paths) => {
				const first = routes.indexOf(route) === 0;
				return first ? (
					<Link to={paths.join('/')}>{route.breadcrumbName}</Link>
				) : (
					<span>
						{
							routes && routes.length > 0
								? route.breadcrumbName !== routes[routes.length - 1].breadcrumbName
									? <Link to={route.path}>{route.breadcrumbName}</Link>
									: route.breadcrumbName
								: route.breadcrumbName
						}
					</span>
				);
			}}
			menuDataRender={menuDataRender}
			rightContentRender={() => <RightContent />}
			headerContentRender={() => {
				return (
					<>
						<div onClick={onClickCollapsed} className={styles.headerCollapse}>
							{collapseName
								? <MenuUnfoldOutlined className={styles.colorWhite} />
								: <MenuFoldOutlined className={styles.colorWhite} />}
						</div>
					</>

				);
			}}
			postMenuData={(menuData) => {
				menuDataRef.current = menuData || [];
				return menuData || [];
			}}
			menuHeaderRender={menuHeaderRender}
			menuExtraRender={false}
			disableContentMargin
			contentStyle={{
				height: "100%",
				overflowY: "auto"
			}}
			footerRender={false}
		>
			{/* @ts-ignore */}
			{children}
		</ProLayout>
	);
};

export default connect(({ global, settings }: ConnectState) => ({
	collapsed: global.collapsed,
	settings,
}))(BasicLayout);
