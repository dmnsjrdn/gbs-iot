import Heading from "../ui/Heading";
import Row from "../ui/Row";
import BinLogTable from "../features/bin-logs/BinLogTable";
import BinLogTableOperations from "../features/bin-logs/BinLogTableOperations";
import BinLogFilter from "../features/bin-logs/BinLogFilter";
import Button from "../ui/Button";

function BinLogs() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Bin Logs</Heading>
        <BinLogTableOperations />
      </Row>

      <Row type="horizontal">
        <Button>Download PDF</Button>
        <BinLogFilter />
      </Row>

      <BinLogTable />
    </>
  );
}

export default BinLogs;
