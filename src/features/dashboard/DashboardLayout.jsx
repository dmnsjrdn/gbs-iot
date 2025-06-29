import styled from "styled-components";
import { useRecentBinLogs } from "./useRecentBinLogs";
import Spinner from "../../ui/Spinner";
import BinChart from "./BinChart";
import BinLogTopTable from "../bin-logs/BinLogTopTable";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import TrashBinLayout from "../trash-bin/TrashBinLayout";
import DashboardFilter from "./DashboardFilter";
import Heading from "../../ui/Heading";
import Row from "../../ui/Row";

const StyledDashboardLayout = styled.div`
  display: grid;
  gap: 2.4rem;
`;

const DashboardLayout = () => {
  const [searchParams] = useSearchParams();

  const numDays = !searchParams.get("last")
    ? 7
    : Number(searchParams.get("last"));
  const queryDate = subDays(new Date(), numDays).toISOString();

  const { isLoading: isLoading, bin_log } = useRecentBinLogs({ queryDate, numDays });

  if (isLoading) return <Spinner />;
  return (
    <StyledDashboardLayout>
      <Row type="horizontal">
        <Heading as="h1">Monitoring</Heading>
      </Row>
      <TrashBinLayout />
      <Row type="horizontal">
        <Heading as="h1">Reports</Heading>
        <DashboardFilter />
      </Row>
      <BinChart bin_log={bin_log} numDays={numDays} />
      <Row type="horizontal">
        <Heading as="h1">Latest 5 logs</Heading>
      </Row>
      <BinLogTopTable />
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
