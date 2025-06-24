import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";
import { getConfigurations } from "../../services/apiConfigurations";

export function useConfigurations() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  // SORT
  const sortByRaw = searchParams.get("sortBy") || "modified_at-desc";
  const [field, direction] = sortByRaw.split("-");
  const sortBy = { field, direction };

  // PAGINATION
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  // QUERY
  const {
    isLoading,
    data: { data: appConfig, count } = {},
    error,
  } = useQuery({
    queryKey: ["app_configuration", sortBy, page],
    queryFn: () => getConfigurations({ sortBy, page }),
  });

  // PRE-FETCHING
  const pageCount = Math.ceil(count / PAGE_SIZE);

  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ["app_configuration", sortBy, page + 1],
      queryFn: () => getConfigurations({ sortBy, page: page + 1 }),
    });

  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ["app_configuration", sortBy, page - 1],
      queryFn: () => getConfigurations({ sortBy, page: page - 1 }),
    });

  return { isLoading, error, appConfig, count };
}
