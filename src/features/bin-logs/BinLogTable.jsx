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
      <Table columns="2.4fr 0.6fr 1.4fr 3.2rem">
        <Table.Header>
          <div>Dust Bin</div>
          <div>Value</div>
          <div>Timestamp</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={bin_logs}
          render={(log) => (
            <BinLogRow key={log.id} booking={log} />
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
