import { useQuery } from "@tanstack/react-query";
import { getBinLogsAfterDate } from "../../services/apiBinLogs";

export function useRecentBinLogs({ queryDate, numDays }) {
  const { isLoading, data: bin_log } = useQuery({
    queryFn: () => getBinLogsAfterDate(queryDate),
    queryKey: ["bin_log", `last-${numDays}`],
  });

  return { isLoading, bin_log };
}
