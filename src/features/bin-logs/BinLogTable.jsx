import BinLogRow from "./BinLogRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Empty from "../../ui/Empty";
import BinLogFilter from "../../features/bin-logs/BinLogFilter";
import Button from "../../ui/Button";
import Row from "../../ui/Row";
import { useBinLogs } from "./useBinLogs";
import Spinner from "../../ui/Spinner";
import Pagination from "../../ui/Pagination";
import { useSearchParams } from "react-router-dom";
import { downloadFilteredBinLogsAsPDF } from "../../services/apiBinLogs";
import { useEffect, useState } from "react";
import SpinnerMini from "../../ui/SpinnerMini";

function BinLogTable({ queryDate }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    if (!searchParams.get("last")) {
      searchParams.set("last", "1");
      setSearchParams(searchParams);
    }
  }, [searchParams, setSearchParams]);

  const last = searchParams.get("last");

  async function handleDownloadPDF() {
    try {
      setIsDownloading(true);
      await downloadFilteredBinLogsAsPDF(last);
    } catch (error) {
      console.error("PDF download failed:", error);
    } finally {
      setIsDownloading(false);
    }
  }
  const { bin_logs, isLoading, count } = useBinLogs({ queryDate });

  if (isLoading) return <Spinner />;
  if (!bin_logs.length) return <Empty resourceName="bin_logs" />;

  return (
    <>
      <Row type="horizontal">
        <Button onClick={handleDownloadPDF} disabled={isDownloading}>
          {isDownloading ? <SpinnerMini /> : "Download PDF"}
        </Button>
        <BinLogFilter />
      </Row>

      <Menus>
        <Table columns="2.4fr 0.6fr 1.4fr">
          <Table.Header>
            <div>Bin</div>
            <div>Value</div>
            <div>Timestamp</div>
          </Table.Header>

          <Table.Body
            data={bin_logs}
            render={(log) => <BinLogRow key={log.id} row={log} />}
          />

          <Table.Footer>
            <Pagination count={count} />
          </Table.Footer>
        </Table>
      </Menus>
    </>
  );
}

export default BinLogTable;
