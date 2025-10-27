import { API_BASE_URL } from "../constants";
import type { ListUserResponse } from "./UsersApis.dto";
import type { QueryParams } from "../../components/SearchAndFilterRequestor/SearchAndFilterRequestor";

const USERS_URL = `${API_BASE_URL}/v1/users`;

export const listUsers = async (queryParams?: QueryParams): Promise<ListUserResponse> => {
    const response = await fetch(USERS_URL + (queryParams ? `?${new URLSearchParams(queryParams)}` : ''), {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    });
    if (!response.ok) {
        throw new Error('Failed to fetch users');
    }
    return response.json();
}
