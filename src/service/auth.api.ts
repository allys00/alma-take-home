import { LoginSchema } from "@/app/login/login.definitions";


export const doLogin = async (data: LoginSchema): Promise<{ token: string }> => {
    return await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data }),
    })
        .then(response => response.json())
        .catch(error => console.log(error));

}