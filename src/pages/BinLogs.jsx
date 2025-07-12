import Heading from "../ui/Heading";
import Row from "../ui/Row";
import BinLogTable from "../features/bin-logs/BinLogTable";
import BinLogTableOperations from "../features/bin-logs/BinLogTableOperations";

function BinLogs() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Bin Logs</Heading>
        <BinLogTableOperations />
      </Row>
      <BinLogTable />
    </>
  );
}

export default BinLogs;
