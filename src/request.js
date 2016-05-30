import { sprintf, vsprint } from 'sprintf-js';

import stringifyAsQueryParam from './url/stringify_as_query_param';


/**
 * Global fetch wrapper that adds some basic error handling and ease of use enhancements.
 * Considers any non-2xx response as an error.
 *
 * For more information on fetch, see https://developer.mozilla.org/en-US/docs/Web/API/GlobalFetch/fetch.
 *
 * Expects fetch to already be available (either in a ES6 environment, bundled through webpack, or
 * injected through a polyfill).
 *
 * @param  {string}  url    Url to request. Can be specified as a sprintf format string (see
 *                          https://github.com/alexei/sprintf.js) that will be resolved using
 *                          `config.urlTemplateSpec`.
 * @param  {object}  config Additional configuration, mostly passed to fetch as its 'init' config
 *                          (see https://developer.mozilla.org/en-US/docs/Web/API/GlobalFetch/fetch#Parameters).
 * @param  {string|object} config.query           Query parameter to append to the end of the url.
 *                                                If specified as an object, keys will be
 *                                                decamelized into snake case first.
 * @param  {*[]|object}    config.urlTemplateSpec Format spec to use to expand the url (see sprintf).
 * @param  {*}             config.*               All other options are passed through to fetch.
 *
 * @return {Promise}        Promise that will resolve with the response if its status was 2xx;
 *                          otherwise rejects with the response
 */
export default function request(url, { query, urlTemplateSpec, ...fetchConfig }) {
    let expandedUrl = url;

    if (urlTemplateSpec != null) {
        if (Array.isArray(urlTemplateSpec) && urlTemplateSpec.length) {
            // Use vsprintf for the array call signature
            expandedUrl = vsprintf(url, urlTemplateSpec);
        } else if (typeof urlTemplateSpec === 'object' && Object.keys(urlTemplateSpec).length) {
            expandedUrl = sprintf(url, urlTemplateSpec);
        } else if (process.env.NODE_ENV !== 'production') {
            // eslint-disable-next-line no-console
            console.warn('Supplied urlTemplateSpec was not an array or object. Ignoring...');
        }
    }

    if (query != null) {
        if (typeof query === 'object') {
            expandedUrl += stringifyAsQueryParam(query);
        } else if (typeof query === 'string') {
            expandedUrl += query;
        } else if (process.env.NODE_ENV !== 'production') {
            // eslint-disable-next-line no-console
            console.warn('Supplied query was not a string or object. Ignoring...');
        }
    }

    return fetch(expandedUrl, fetchConfig)
        .then((res) => {
            // If status is not a 2xx, assume it's an error
            if (!(res.status >= 200 && res.status <= 300)) {
                throw res;
            }
            return res;
        });
}
