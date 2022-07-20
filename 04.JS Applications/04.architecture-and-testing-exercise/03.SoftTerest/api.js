const base = 'http://localhost:3030';

async function request(method, url, data) {

    let options = {
        method,
        headers: {}
    }

    if (data !== undefined) {
        options.headers['content-type'] = 'application/json';
        options.body = JSON.stringify(data);
    }

    const userData = JSON.parse(localStorage.getItem('userData'));

    if (userData !== null || method == 'delete') {
        options.headers['X-Authorization'] = userData.accessToken;
    }

    try {
        
        const request = await fetch(base + url, options);
    
        if (request.ok !== true) {
            const error = await request.json();
            throw new Error (error.message);
        }
    
        if (request.status == 204) {
            return request;
        } else {
            return await request.json();
        }

    } catch (err) {
        throw new Error(err.message);
    }
}

export async function get(url) {
    return request('get', url);
}

export async function post(url, data) {
    return request('post', url, data);
}

export async function del(url) {
    return request('delete', url);
}
