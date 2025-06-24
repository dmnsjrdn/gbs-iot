import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditBin } from "../../services/apiBins";
import { toast } from "react-hot-toast";

export function useEditBin() {
    const queryClient = useQueryClient();

    const { mutate: editBin, isLoading: isEditing } = useMutation({
        mutationFn: ({ newBinData, id }) => createEditBin(newBinData, id),
        onSuccess: () => {
            toast.success("Bin successfully edited");
            queryClient.invalidateQueries({ queryKey: ["bin"] });
        },
        onError: (err) => toast.error(err.message),
    });

    return { isEditing, editBin };
}
