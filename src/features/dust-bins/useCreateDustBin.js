import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { createEditDustBin } from "../../services/apiDustBins";

export function useCreateDustBin() {
    const queryClient = useQueryClient();

    const { mutate: createDustBin, isLoading: isCreating } = useMutation({
        mutationFn: createEditDustBin,
        onSuccess: () => {
            toast.success("New dust bin successfully created");
            queryClient.invalidateQueries({ queryKey: ["dust_bin"] });
        },
        onError: (err) => toast.error(err.message),
    });

    return { isCreating, createDustBin };
}
