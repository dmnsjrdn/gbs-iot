import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { deleteDustBin as deleteDustBinApi } from "../../services/apiDustBins";

export function useDeleteDustBin() {
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deleteDustBin } = useMutation({
    mutationFn: deleteDustBinApi,
    onSuccess: () => {
      toast.success("Dust bin successfully deleted");

      queryClient.invalidateQueries({
        queryKey: ["dust_bin"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deleteDustBin };
}
