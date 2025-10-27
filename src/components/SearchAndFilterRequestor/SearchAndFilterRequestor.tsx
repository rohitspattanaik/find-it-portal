import { Group, Pagination, Text } from "@mantine/core";
import type { PaginatedDTO, PaginationInfo } from "../../api/common/common";
import { useContext, createContext, useEffect, useState } from "react";

export type QueryParams = {
    [key: string]: string;
}

interface SearchAndFilterRequestorProps<T> {
    dataRequestor: (queryParams?: QueryParams) => Promise<PaginatedDTO<T>>;
    children: React.ReactNode;
}

interface SearchAndFilterRequestorType<T> {
    data: T[];
    loading: boolean;
    error: string | null;
}

const SearchAndFilterRequestorContext = createContext<SearchAndFilterRequestorType<any> | null>(null);

export const SearchAndFilterRequestor = <T,>({ dataRequestor, children }: SearchAndFilterRequestorProps<T>) => {
    const [data, setData] = useState<T[]>([]);
    const [pagination, setPagination] = useState<PaginationInfo| null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    const fetchData = async (queryParams?: QueryParams) => {
        try {
            setLoading(true);
            const response = await dataRequestor(queryParams);
            setData(response.data);
            setPagination(response.pagination);
            setLoading(false);
        } catch (error) {
            setError(error as string);
            setLoading(false);
        }
    }
    
    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if (pagination) {
            setCurrentPage(Math.floor((pagination.totalSize + pagination.currentPageToken) / pagination.pageSize));
            setTotalPages(Math.ceil(pagination.totalSize / pagination.pageSize));
        }
    }, [pagination]);

    const pageMessage = pagination ? `Showing ${pagination.currentPageToken + 1} - ${pagination.currentPageToken + pagination.pageSize} of ${pagination.totalSize}` : '';

    return (
        <SearchAndFilterRequestorContext.Provider value={{ data, loading, error }}>
            {children}
            <Group justify="flex-end">
                <Text size="sm">{pageMessage}</Text>
                <Pagination total={totalPages} value={currentPage} withPages={false}/>
            </Group>
        </SearchAndFilterRequestorContext.Provider>
    )
}

export const useSearchAndFilter  = () => {
    const context = useContext(SearchAndFilterRequestorContext);
    if (!context) {
        throw new Error('useSearchAndFilter must be used within a SearchAndFilterRequestor');
    }
    return context;
}