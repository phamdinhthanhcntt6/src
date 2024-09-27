import { defineConfig } from 'umi';
import { defaultTheme } from './defaultSettings';
import proxy from './proxy';
import routes from './routes';

export default defineConfig({
	define: {
		REACT_APP_API: 'https://be-staging.lichnhuy.vn'
	},
	hash: true,
	antd: {},
	dva: {
		hmr: true,
	},
	history: {
		type: 'browser',
	},
	locale: {
		default: 'vi-VN',
		antd: true,
		// default true, when it is true, will use `navigator.language` overwrite default
		baseNavigator: true,
	},
	dynamicImport: {
		loading: '@/components/PageLoading/index',
	},
	targets: {
		ie: 11,
	},
	// umi routes: https://umijs.org/docs/routing
	routes,
	// Theme for antd: https://ant.design/docs/react/customize-theme-cn
	theme: { ...defaultTheme },
	title: false,
	ignoreMomentLocale: true,
	proxy: proxy['dev'],
	manifest: {
		basePath: '/',
		publicPath: '/',
	},
	publicPath: '/',
	base: '/',
	// 快速刷新功能 https://umijs.org/config#fastrefresh
	fastRefresh: {},
	esbuild: {},
	webpack5: {},
});
