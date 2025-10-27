import Admin from "../Admin";
import { SearchAndFilterRequestor, type QueryParams } from "../../../components/SearchAndFilterRequestor/SearchAndFilterRequestor";
import UsersTable from "./UsersTable/UsersTable";
import { listUsers } from "../../../api/UsersApis/UsersApis";

const mockUsers = [
    {
        id: '0199c23b-2b18-7126-8b87-5eba7e131b66',
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
        role: "user",
    },
    {
        id: '0199c23b-2b18-7126-8b87-5eba7e131b64',
        firstName: "Jane",
        lastName: "Doe",
        email: "jane.doe@example.com",
        role: "user",
    },
    {
        id: '0199c23b-2b18-7126-8b87-5eba7e131b62',
        firstName: "test",
        lastName: "test",
        email: "test@example.com",
        role: "user",
    },
    {
        id: '0199c23b-2b18-7126-8b87-5eba7e131b60',
        firstName: "another",
        lastName: "test",
        email: "another@example.com",
        role: "user",
    }
];

const Users = () => {

    const getUsers = async (queryParams?: QueryParams) => {
        const response = await listUsers(queryParams);
        return {
            data: response.users,
            pagination: response.pagination
        }
    }

    return (
        <Admin>
            <SearchAndFilterRequestor dataRequestor={getUsers}>
                <UsersTable />
            </SearchAndFilterRequestor>
        </Admin>
    );
};

export default Users;