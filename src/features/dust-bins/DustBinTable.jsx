import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Empty from "../../ui/Empty";
import Spinner from "../../ui/Spinner";
import Pagination from "../../ui/Pagination";
import { useDustBins } from "./useDustBins";
import DustBinRow from "./DustBinRow";

function DustBinTable() {
  const { isLoading, error, dust_bin, count } = useDustBins();

  if (isLoading) return <Spinner />;
  if (!dust_bin.length) return <Empty resourceName="dust_bin" />;

  return (
    <Menus>
      <Table columns="2.4fr 0.6fr 2fr 3.2rem">
        <Table.Header>
          <div>Bin</div>
          <div>Acive</div>
          <div>Created At</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={dust_bin}
          render={(bin) => (
            <DustBinRow key={bin.id} row={bin} />
          )}
        />

        <Table.Footer>
          <Pagination count={count} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default DustBinTable;
