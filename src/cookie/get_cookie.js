import Cookie from 'js-cookie';


/**
 * Aliases Cookie.get(). See https://github.com/js-cookie/js-cookie#basic-usage for more info.
 *
 * @param  {string} name Name of the cookie
 * @return {string}      Cookie value
 */
export default function getCookie(name) {
    return Cookie.get(name);
}
