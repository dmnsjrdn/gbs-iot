import Heading from "../ui/Heading";
import Row from "../ui/Row";
import UserTable from "../features/users/UserTable";
import UserTableOperations from "../features/users/UserTableOperations";
import AddUser from "../features/users/AddUser";

function Users() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">User Management</Heading>
        <UserTableOperations />
      </Row>

      <Row>
        <UserTable />
        <AddUser />
      </Row>
    </>
  );
}

export default Users;
