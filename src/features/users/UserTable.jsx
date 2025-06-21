import UserRow from "./UserRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Empty from "../../ui/Empty";

import { useUsers } from "./useUsers";
import Spinner from "../../ui/Spinner";
import Pagination from "../../ui/Pagination";

function UserTable() {
  const { users, isLoading, count } = useUsers();
  if (isLoading) return <Spinner />;
  if (!users.length) return <Empty resourceName="users" />;

  return (
    <Menus>
      <Table columns="2.4fr 2fr 0.6fr 1.4fr 1fr 3.2rem">
        <Table.Header>
          <div>User</div>
          <div>Email</div>
          <div>Is Active</div>
          <div>Created At</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={users}
          render={(user) => (
            <UserRow key={user.id} booking={user} />
          )}
        />

        <Table.Footer>
          <Pagination count={count} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default UserTable;
