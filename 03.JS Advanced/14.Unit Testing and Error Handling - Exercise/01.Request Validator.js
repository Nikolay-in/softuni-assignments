function requestValidator(input) {
    const methods = ['GET', 'POST', 'DELETE', 'CONNECT'];
    let uriRegex = new RegExp(/^[\w\d.]+$|^\*$/);
    const versions = ['HTTP/0.9', 'HTTP/1.0', 'HTTP/1.1', 'HTTP/2.0'];
    let msgRegex = new RegExp(/^[^<>\\&'"]*$/);

    if (methods.indexOf(input.method) == -1 || !input.hasOwnProperty('method')) {
        throw new Error(`Invalid request header: Invalid Method`);
    } else if (!uriRegex.exec(input.uri) || input.uri == '' || !input.hasOwnProperty('uri')) {
        throw new Error(`Invalid request header: Invalid URI`);
    } else if (versions.indexOf(input.version) == -1 || !input.hasOwnProperty('version')) {
        throw new Error(`Invalid request header: Invalid Version`);
    } else if (!msgRegex.exec(input.message) || !input.hasOwnProperty('message')) {
        throw new Error(`Invalid request header: Invalid Message`);
    }
    return input;
}

console.log(requestValidator({
    method: 'GET',
    uri: 'svn.public.catalog',
    version: 'HTTP/1.1',
    message: ''
}
));