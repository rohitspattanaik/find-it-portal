
export interface PaginationInfo {
    currentPageToken: number;
    nextPageToken: number;
    totalSize: number;
    pageSize: number; 
}

export interface PaginatedDTO<T> {
    data: T[];
    pagination: PaginationInfo;
}