import BinLogTopRow from "./BinLogTopRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Empty from "../../ui/Empty";
import { useBinLogsTop } from "./useBinLogsTop";
import Spinner from "../../ui/Spinner";

function BinLogTopTable({ queryDate }) {
  const { bin_logs, isLoading } = useBinLogsTop({ queryDate });

  if (isLoading) return <Spinner />;
  if (!bin_logs.length) return <Empty resourceName="bin_logs" />;

  return (
    <>
      <Menus>
        <Table columns="2.4fr 0.6fr 1.4fr">
          <Table.Header>
            <div>Bin</div>
            <div>Value</div>
            <div>Timestamp</div>
          </Table.Header>

          <Table.Body
            data={bin_logs}
            render={(log) => <BinLogTopRow key={log.id} row={log} />}
          />
        </Table>
      </Menus>
    </>
  );
}

export default BinLogTopTable;
