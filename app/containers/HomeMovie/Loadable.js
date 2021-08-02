/**
 *
 * Asynchronously loads the component for HomeMovie
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
