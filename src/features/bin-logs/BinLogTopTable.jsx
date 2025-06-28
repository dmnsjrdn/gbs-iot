import BinLogTopRow from "./BinLogTopRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Empty from "../../ui/Empty";

import { useBinLogsTop } from "./useBinLogsTop";
import Spinner from "../../ui/Spinner";
import Pagination from "../../ui/Pagination";

function BinLogTopTable({ queryDate }) {
  const { bin_logs, isLoading, count } = useBinLogsTop({ queryDate });

  if (isLoading) return <Spinner />;
  if (!bin_logs.length) return <Empty resourceName="bin_logs" />;

  return (
    <Menus>
      <Table columns="2.4fr 0.6fr 1.4fr 3.2rem">
        <Table.Header>
          <div>Bin</div>
          <div>Value</div>
          <div>Timestamp</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={bin_logs}
          render={(log) => (
            <BinLogTopRow key={log.id} row={log} />
          )}
        />

        <Table.Footer>
          <Pagination count={count} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default BinLogTopTable;
