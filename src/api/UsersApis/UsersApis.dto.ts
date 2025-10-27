import type { PaginationInfo } from "../common/common";

export interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
}

export interface ListUserResponse {
    users: User[];
    pagination: PaginationInfo;
}