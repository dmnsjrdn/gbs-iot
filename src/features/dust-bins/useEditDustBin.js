import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditDustBin } from "../../services/apiDustBins";
import { toast } from "react-hot-toast";

export function useEditDustBin() {
    const queryClient = useQueryClient();

    const { mutate: editDistBin, isLoading: isEditing } = useMutation({
        mutationFn: ({ newDustBinData, id }) => createEditDustBin(newDustBinData, id),
        onSuccess: () => {
            toast.success("Dust bin successfully edited");
            queryClient.invalidateQueries({ queryKey: ["dust_bin"] });
        },
        onError: (err) => toast.error(err.message),
    });

    return { isEditing, editDistBin };
}
