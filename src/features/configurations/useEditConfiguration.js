import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateConfiguration } from "../../services/apiConfigurations";
import { toast } from "react-hot-toast";

export function useEditConfiguration() {
    const queryClient = useQueryClient();

    const { mutate: editConfig, isLoading: isEditing } = useMutation({
        mutationFn: ({ appConfigData, id }) => updateConfiguration(appConfigData, id),
        onSuccess: () => {
            toast.success("Configuration successfully updated");
            queryClient.invalidateQueries({ queryKey: ["app_configuration"] });
        },
        onError: (err) => toast.error(err.message),
    });

    return { isEditing, editConfig };
}
