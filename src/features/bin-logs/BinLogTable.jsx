import BinLogRow from "./BinLogRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Empty from "../../ui/Empty";

import { useBinLogs } from "./useBinLogs";
import Spinner from "../../ui/Spinner";
import Pagination from "../../ui/Pagination";

function BinLogTable({ queryDate }) {
  const { bin_logs, isLoading, count } = useBinLogs({ queryDate });

  if (isLoading) return <Spinner />;
  if (!bin_logs.length) return <Empty resourceName="bin_logs" />;

  return (
    <Menus>
      <Table columns="2.4fr 0.6fr 1.4fr">
        <Table.Header>
          <div>Bin</div>
          <div>Value</div>
          <div>Timestamp</div>
        </Table.Header>

        <Table.Body
          data={bin_logs}
          render={(log) => (
            <BinLogRow key={log.id} row={log} />
          )}
        />

        <Table.Footer>
          <Pagination count={count} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default BinLogTable;
