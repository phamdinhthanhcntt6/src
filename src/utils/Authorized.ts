import RenderAuthorize from '@/components/Authorized';
import Permission from '@/services/Permission';

/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable import/no-mutable-exports */
let Authorized = RenderAuthorize(Permission.getAuthority());

// Reload the rights component
const reloadAuthorized = (): void => {
	Authorized = RenderAuthorize(Permission.getAuthority());
};

/** Hard code block need it。 */
window.reloadAuthorized = reloadAuthorized;

export { reloadAuthorized };
export default Authorized;
