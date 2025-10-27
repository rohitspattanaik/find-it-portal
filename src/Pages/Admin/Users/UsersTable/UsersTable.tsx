import WrappedTable from "../../../../components/WrappedTable/WrappedTable";
import { useSearchAndFilter } from "../../../../components/SearchAndFilterRequestor/SearchAndFilterRequestor";
import { useMemo } from "react";
import { Loader } from "@mantine/core";


const UsersTable = () => {

    const { data, loading } = useSearchAndFilter();

    const headers = ["First Name", "Last Name", "Email"];
    const rows = useMemo(() => data?.map((user) => {
        return {
            index: user.id,
            data: [user.firstName, user.lastName, user.email]
        };
    }) || [], [data]);
    
    return (
        <>
            {loading ? <Loader /> : <WrappedTable headers={headers} rows={rows} />}
        </>
    )
}

export default UsersTable;
