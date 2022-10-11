/*
 *
 * Asynchronously loads the component for Leaderboard
 *
 */
import { lazyLoad } from 'utils/loadable';

export default lazyLoad(() => import('./index'));
