import { Settings as ProSettings } from '@ant-design/pro-layout';

type DefaultSettings = Partial<ProSettings> & {
	pwa: boolean;
};

const proSettings: DefaultSettings = {
	navTheme: 'dark',
	// 拂晓蓝
	primaryColor: '#0FA44A',
	layout: 'side',
	contentWidth: 'Fluid',
	fixedHeader: false,
	fixSiderbar: true,
	colorWeak: false,
	// title: 'WS Event',
	pwa: false,
	iconfontUrl: '',
};

export const defaultTheme = {
	'primary-color': '#0FA44A',
	'link-color': '#0FA44A',
	'success-color': '#52c41a',
	'warning-color': '#faad14',
	'error-color': '#f5222d',
	'font-size-base': '13px',
	'heading-color': 'rgba(0, 0, 0, 0.85)',
	'text-color': 'rgba(0, 0, 0, 0.65)',
	'text-color-secondary': 'rgba(0, 0, 0, 0.45)',
	'disabled-color': 'rgba(0, 0, 0, 0.25)',
	'border-radius-base': '6px',
	'border-color-base': '#d9d9d9',
	'layout-header-background': '#0FA44A',
	'menu-dark-item-active-bg': '#13B453',
}

export type { DefaultSettings };

export default proSettings;
