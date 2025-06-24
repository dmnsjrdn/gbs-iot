import Heading from "../ui/Heading";
import Row from "../ui/Row";
import BinTable from "../features/bins/BinTable";
import BinTableOperations from "../features/bins/BinTableOperations";
import AddBin from "../features/bins/AddBin";

function Bins() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Bins</Heading>
        <BinTableOperations />
      </Row>

      <Row>
        <BinTable />
        <AddBin />
      </Row>
    </>
  );
}

export default Bins;
