import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";
import { getDustBins } from "../../services/apiDustBins";

export function useDustBins() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  // SORT
  const sortByRaw = searchParams.get("sortBy") || "created_at-desc";
  const [field, direction] = sortByRaw.split("-");
  const sortBy = { field, direction };

  // PAGINATION
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  // QUERY
  const {
    isLoading,
    data: { data: dust_bin, count } = {},
    error,
  } = useQuery({
    queryKey: ["dust_bin", sortBy, page],
    queryFn: () => getDustBins({ sortBy, page }),
  });

  // PRE-FETCHING
  const pageCount = Math.ceil(count / PAGE_SIZE);

  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ["dust_bin", sortBy, page + 1],
      queryFn: () => getDustBins({ sortBy, page: page + 1 }),
    });

  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ["dust_bin", sortBy, page - 1],
      queryFn: () => getDustBins({ sortBy, page: page - 1 }),
    });

  return { isLoading, error, dust_bin, count };
}
