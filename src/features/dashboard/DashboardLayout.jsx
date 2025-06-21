import styled from "styled-components";
import { useRecentBinLogs } from "./useRecentBinLogs";
import Spinner from "../../ui/Spinner";
import BinChart from "./BinChart";
import BinLogTable from "../bin-logs/BinLogTable";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";

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
      <BinChart bin_log={bin_log} numDays={numDays} />
      <BinLogTable date={queryDate} />
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
