/**
 *
 * Asynchronously loads the component for CardMovie
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
