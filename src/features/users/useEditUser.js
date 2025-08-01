import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditUser } from "../../services/apiUsers";
import { toast } from "react-hot-toast";

export function useEditUser() {
    const queryClient = useQueryClient();

    const { mutate: editUser, isLoading: isEditing } = useMutation({
        mutationFn: ({ newUserData, id }) => createEditUser(newUserData, id),
        onSuccess: () => {
            toast.success("User successfully edited");
            queryClient.invalidateQueries({ queryKey: ["user_extension"] });
        },
        onError: (err) => toast.error(err.message),
    });

    return { isEditing, editUser };
}
