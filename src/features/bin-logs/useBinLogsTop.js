import { useQuery } from "@tanstack/react-query";
import { getBinLogsTop } from "../../services/apiBinLogs";

export function useBinLogsTop() {

  // QUERY
  const {
    isLoading,
    data: { data: bin_logs } = {},
    error,
  } = useQuery({
    queryKey: ["bin_log"],
    queryFn: () => getBinLogsTop(),
  });

  return { isLoading, error, bin_logs };
}
