/**
 *
 * Asynchronously loads the component for Logo
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
