import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBinLogs } from "../../services/apiBinLogs";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";

export function useBinLogs({ queryDate }) {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  console.log('useBinLogs - queryDate', queryDate)

  // SORT
  const sortByRaw = searchParams.get("sortBy") || "created_at-desc";
  const [field, direction] = sortByRaw.split("-");
  const sortBy = { field, direction };

  // PAGINATION
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  // QUERY
  const {
    isLoading,
    data: { data: bin_logs, count } = {},
    error,
  } = useQuery({
    queryKey: ["bin_log", sortBy, page],
    queryFn: () => getBinLogs({ sortBy, page, queryDate }),
  });

  // PRE-FETCHING
  const pageCount = Math.ceil(count / PAGE_SIZE);

  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ["bin_log", sortBy, page + 1],
      queryFn: () => getBinLogs({ sortBy, page: page + 1, queryDate }),
    });

  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ["bin_log", sortBy, page - 1],
      queryFn: () => getBinLogs({ sortBy, page: page - 1, queryDate }),
    });

  return { isLoading, error, bin_logs, count };
}
