import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { deleteUser } from "../../services/apiUsers";

export function useDeleteUser() {
  const queryClient = useQueryClient();

  const { mutate: deleteUserMutate, isLoading: isDeleting } = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      toast.success("User successfully deleted");
      queryClient.invalidateQueries({ queryKey: ["user_extension"] });
    },
    onError: (err) => {
      console.error("Delete error:", err);
      toast.error("Failed to delete user");
    },
  });

  return { deleteUser: deleteUserMutate, isDeleting };
}
