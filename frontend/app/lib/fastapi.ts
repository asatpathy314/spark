import {User} from "next-auth";

export async function fastApiRequest(path: string, req_type: string, payload: any): Promise<Response> {
    const url = "http://127.0.0.1:8000/" + path;
    console.log(url);
    if (req_type === 'GET' ) {
        try {
            let options = {
            method: 'GET',
            headers: {
                'Content-Type' : 'application/json'
            }
        };
            const response = await fetch(url, options);
            return response;
        } catch (error) {
            console.error("Error in API request:", error);
            throw error; // Rethrow the error for handling in the calling code
        }
        }
    else {
        try {
            let options = {
            method: req_type,
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(payload)
        };
            const response = await fetch(url, options);
            const data = await response.json()
            return response;

        } catch (error) {
            console.error("Error in API request:", error);
            throw error; // Rethrow the error for handling in the calling code
        }
        }
    }
