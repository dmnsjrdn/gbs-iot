import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Empty from "../../ui/Empty";
import Spinner from "../../ui/Spinner";
import Pagination from "../../ui/Pagination";
import { useBins } from "./useBins";
import BinRow from "./BinRow";

function BinTable() {
  const { isLoading, error, bin, count } = useBins();

  if (isLoading) return <Spinner />;
  if (!bin.length) return <Empty resourceName="bin" />;

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
          data={bin}
          render={(b) => (
            <BinRow key={b.bin} row={b} />
          )}
        />

        <Table.Footer>
          <Pagination count={count} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default BinTable;
