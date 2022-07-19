export async function get() {
    try {
        let result = await fetch('http://localhost:3030/jsonstore/collections/books');
        let data = result.json();

        if (result.ok == false) {
            throw new Error(data.message);
        }

        return data;

    } catch (error) {
        throw new Error(error.message);
    }
}

export async function add(input) {
    try {
        const result = await fetch('http://localhost:3030/jsonstore/collections/books', {
            method: 'post',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(input)
        });

        const data = await result.json();

        if (result.ok == false) {
            throw new Error(data.message);
        }

        return data;

    } catch (error) {
        throw new Error(error.message);
    }
}

export async function del(id) {
    try {

        const result = await fetch('http://localhost:3030/jsonstore/collections/books/' + id, {
            method: 'delete'
        });

        const data = await result.json();

        if (result.ok == false) {
            throw new Error(data.message);
        }

        return true;

    } catch (error) {
        throw new Error(error.message);
    }
}

export async function edit({id, author, title}) {
    try {
        const result = await fetch('http://localhost:3030/jsonstore/collections/books/' + id, {
            method: 'put',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({author, title})
        });

        const data = await result.json();

        if (result.ok == false) {
            throw new Error(data.message);
        }

        return true;

    } catch (error) {
        throw new Error(error.message);
    }
}