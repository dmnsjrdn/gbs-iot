import { useQuery } from "@tanstack/react-query";
import { getBinMonitoring } from "../../services/apiBinLogs";

export function useBinMonitoring() {
  const { isLoading, data } = useQuery({
    queryKey: ["get_latest_bin_logs"],
    queryFn: () => getBinMonitoring()
  });

  return { isLoading, data };
}
