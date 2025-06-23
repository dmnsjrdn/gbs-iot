import Heading from "../ui/Heading";
import Row from "../ui/Row";
import DustBinTable from "../features/dust-bins/DustBinTable";
import DustBinTableOperations from "../features/dust-bins/DustBinTableOperations";
import AddDustBin from "../features/dust-bins/AddDustBin";

function DustBins() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Dust Bins</Heading>
        <DustBinTableOperations />
      </Row>

      <Row>
        <DustBinTable />
        <AddDustBin />
      </Row>
    </>
  );
}

export default DustBins;
