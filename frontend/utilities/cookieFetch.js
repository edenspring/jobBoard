import Cookies from 'js-cookie'

export default async function cookieFetch(url, options = {}) {
    options.method = options.method || 'GET';
    options.headers = options.headers || {};

    if (options.method.toUpperCase() !== 'GET') {
        options.headers['Content-Type'] =
            options.headers['Content-Type'] || 'application/json';
        options.headers['XSRF-Token'] = Cookies.get('XSRF-TOKEN');
    }

    const response = await fetch(url, options)

    if (response.status >= 400) throw response;

    return response
}