import { useQuery } from "@tanstack/react-query";
import { getBinLogsAfterDate } from "../../services/apiBinLogs";

export function useRecentBinLogs({ queryDate, numDays }) {
  console.log('useRecentBinLogs - queryDate', queryDate)
  
  const { isLoading, data: bin_log } = useQuery({
    queryFn: () => getBinLogsAfterDate(queryDate),
    queryKey: ["bin_log", `last-${numDays}`],
  });

  return { isLoading, bin_log };
}
