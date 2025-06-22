import Heading from "../ui/Heading";
import Row from "../ui/Row";
import DustBinTable from "../features/dust-bins/DustBinTable";
import DustBinTableOperations from "../features/dust-bins/DustBinTableOperations";

function DustBins() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Dust Bins</Heading>
        <DustBinTableOperations />
      </Row>
      <DustBinTable />
    </>
  );
}

export default DustBins;
