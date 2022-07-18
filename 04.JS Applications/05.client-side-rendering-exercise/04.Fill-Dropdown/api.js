export async function get() {
    try {

        const result = await fetch('http://localhost:3030/jsonstore/advanced/dropdown');
        const data = await result.json();

        if (result.ok == false) {
            throw Error(data.message);
        }

        return Object.values(data);

    } catch (error) {
        throw new Error(error.message);
    }
}

export async function post(val) {
    try {
        
        const result = await fetch('http://localhost:3030/jsonstore/advanced/dropdown', {
            method: 'post',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({text: val})
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