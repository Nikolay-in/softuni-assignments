import { post } from "./api.js";

export async function register({email, password}) {
    const data = await post('/users/register', { email, password });
    
    const userData = {
        id: data._id,
        email: data.email,
        accessToken: data.accessToken
    };
    sessionStorage.setItem('userData', JSON.stringify(userData));
}