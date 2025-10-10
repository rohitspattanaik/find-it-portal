import Table from "../../../components/Table/Table";
import Admin from "../Admin";
import styles from "./Users.module.css";

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

const headers = [
    "First Name",
    "Last Name",
    "Email"
];

const Users = () => {

    const rows = mockUsers.map((user) => {
        return {
            index: user.id,
            data: [user.firstName, user.lastName, user.email]
        };
    });

    return (
        <Admin>
            <div>
                <Table headers={{ headers }} rows={rows} />
            </div>
        </Admin>
    );
};

export default Users;