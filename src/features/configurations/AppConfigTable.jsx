import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Empty from "../../ui/Empty";
import Spinner from "../../ui/Spinner";
import Pagination from "../../ui/Pagination";
import { useConfigurations } from "./useConfigurations";
import AppConfigRow from "./AppConfigRow";

function AppConfigTable() {
  const { isLoading, error, appConfig, count } = useConfigurations();

  if (isLoading) return <Spinner />;
  if (!appConfig.length) return <Empty resourceName="app_configuration" />;

  return (
    <Menus>
      <Table columns="3.8fr 1fr 2fr 3.2rem">
        <Table.Header>
          <div>Email Recipients</div>
          <div>Email Notif Enabled</div>
          <div>Modified At</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={appConfig}
          render={(b) => (
            <AppConfigRow key={b.id} row={b} />
          )}
        />

        <Table.Footer>
          <Pagination count={count} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default AppConfigTable;
