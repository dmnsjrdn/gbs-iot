import Heading from "../ui/Heading";
import Row from "../ui/Row";
import BinLogTable from "../features/bin-logs/BinLogTable";
import BinLogTableOperations from "../features/bin-logs/BinLogTableOperations";
import { downloadBinLogsAsPDF } from "../services/apiBinLogs"
import Button from "../ui/Button";

function BinLogs() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Bin Logs</Heading>
        <BinLogTableOperations />
      </Row>

      <Row type="horizontal">
        <Button onClick={downloadBinLogsAsPDF}>Download PDF</Button>
      </Row>

      <BinLogTable />
    </>
  );
}

export default BinLogs;
