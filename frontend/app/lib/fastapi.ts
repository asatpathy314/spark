import { User } from "next-auth";

export async function fastApiRequest(path: string): Promise<User> {
    const url = "http://127.0.0.1:8000"+path
    try {
        const response = await fetch(url, {
            method: 'GET'
        });
        const data: User = await response.json();
        console.log(data)
        return data;
    } catch (error) {
        console.error("Error in API request:", error);
        throw error; // Rethrow the error for handling in the calling code
    }
}
