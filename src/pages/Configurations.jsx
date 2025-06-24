import Heading from "../ui/Heading";
import Row from "../ui/Row";
import AppConfigTable from "../features/configurations/AppConfigTable";
import UserTableOperations from "../features/users/UserTableOperations";

function Users() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">App Configurations</Heading>
      </Row>

      <AppConfigTable />
    </>
  );
}

export default Users;
