/*
 *
 * Asynchronously loads the component for Interview
 *
 */
import { lazyLoad } from 'utils/loadable';

export default lazyLoad(() => import('./index'));
