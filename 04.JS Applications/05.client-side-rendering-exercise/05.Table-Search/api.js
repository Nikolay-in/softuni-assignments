export async function get() {
    try {
        const result = await fetch('http://localhost:3030/jsonstore/advanced/table');
        const data = await result.json();

        if (result.ok == false) {
            throw new Error(data.message);
        }

        return Object.values(data);

    } catch (error) {
        throw new Error(error.message);
    }
}