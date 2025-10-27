import { API_BASE_URL } from "../constants";
import type { AuthenticationRequest, Session } from "./AuthenticationApis.dto";

const AUTHN_URL = `${API_BASE_URL}/v1/authn`;

export const authenticate = async (authenticationRequest: AuthenticationRequest): Promise<Session> => {
    
    const response = await fetch(AUTHN_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(authenticationRequest),
        credentials: 'include',
    });

    if (!response.ok) {
        throw new Error('Authentication failed');
    }
    return response.json();
}

export const getSession = async (): Promise<Session> => {

    const response = await fetch(AUTHN_URL, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    });
    if (!response.ok) {
        throw new Error('Session not found');
    }
    return response.json();
}

export const logout = async (): Promise<void> => {
    const response = await fetch(AUTHN_URL, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    });
    if (!response.ok) {
        throw new Error('Logout failed');
    }
}
