import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { deleteBin as deleteBinApi } from "../../services/apiBins";

export function useDeleteBin() {
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deleteBin } = useMutation({
    mutationFn: deleteBinApi,
    onSuccess: () => {
      toast.success("Bin successfully deleted");

      queryClient.invalidateQueries({
        queryKey: ["bin"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deleteBin };
}
