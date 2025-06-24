import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { createEditBin } from "../../services/apiBins";

export function useCreateBin() {
    const queryClient = useQueryClient();

    const { mutate: createBin, isLoading: isCreating } = useMutation({
        mutationFn: createEditBin,
        onSuccess: () => {
            toast.success("New bin successfully created");
            queryClient.invalidateQueries({ queryKey: ["bin"] });
        },
        onError: (err) => toast.error(err.message),
    });

    return { isCreating, createBin };
}
